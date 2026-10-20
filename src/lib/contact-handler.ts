// Lógica da rota /api/contact, separada do provedor de e-mail para poder ser testada
// com um envio simulado. A rota real (src/app/api/contact/route.ts) injeta o Resend.

import { budgetLabel, interestLabel, validateContact, type ContactInput } from './contact.ts';
import { createRateLimiter, type RateLimiter } from './rate-limit.ts';

export interface OutgoingEmail {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}

export interface SendResult {
  error?: { name?: string; statusCode?: number | null } | null;
}

export type SendEmail = (email: OutgoingEmail, signal: AbortSignal) => Promise<SendResult>;

export type Logger = (event: string, details?: Record<string, unknown>) => void;

export interface ContactHandlerOptions {
  /** `null` quando o provedor não está configurado (ex.: falta a chave de API). */
  send: SendEmail | null;
  to: string;
  from: string;
  rateLimiter?: RateLimiter;
  maxBodyBytes?: number;
  timeoutMs?: number;
  log?: Logger;
}

const DEFAULT_MAX_BODY_BYTES = 16 * 1024;
const DEFAULT_TIMEOUT_MS = 10_000;

// Os logs registram apenas o tipo do evento e códigos técnicos, nunca nome, e-mail,
// telefone ou mensagem de quem preencheu o formulário.
const defaultLog: Logger = (event, details) => {
  console.error(`[contact] ${event}`, details ?? {});
};

function json(body: unknown, status: number, headers: Record<string, string> = {}): Response {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

function isCrossOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (!host) return false;
  try {
    return new URL(origin).host !== host.split(',')[0].trim();
  } catch {
    return true;
  }
}

async function readBody(request: Request, maxBytes: number): Promise<string | null> {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export function buildEmail(data: ContactInput, from: string, to: string): OutgoingEmail {
  const subjectName = data.name.length > 60 ? `${data.name.slice(0, 60)}…` : data.name;
  return {
    from,
    to,
    replyTo: data.email,
    subject: `Contato pelo site: ${subjectName}`,
    text: [
      'Nova mensagem enviada pelo formulário do site.',
      '',
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      `Telefone/WhatsApp: ${data.phone || 'não informado'}`,
      `Interesse: ${interestLabel(data.interest) ?? 'não informado'}`,
      `Orçamento: ${budgetLabel(data.budget) ?? 'não informado'}`,
      '',
      'Mensagem:',
      data.message,
      '',
      '---',
      'Responda este e-mail para falar diretamente com a pessoa.',
    ].join('\n'),
  };
}

export function createContactHandler(options: ContactHandlerOptions) {
  const {
    send,
    to,
    from,
    rateLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 }),
    maxBodyBytes = DEFAULT_MAX_BODY_BYTES,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    log = defaultLog,
  } = options;

  return async function handleContact(request: Request): Promise<Response> {
    if (isCrossOrigin(request)) {
      return json({ error: 'Origem não permitida.' }, 403);
    }

    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return json({ error: 'Formato de envio não suportado.' }, 415);
    }

    const declaredLength = Number(request.headers.get('content-length'));
    if (Number.isFinite(declaredLength) && declaredLength > maxBodyBytes) {
      return json({ error: 'Mensagem muito grande.' }, 413);
    }

    const limit = rateLimiter(clientKey(request));
    if (!limit.allowed) {
      log('rate_limited');
      return json(
        { error: 'Muitas tentativas em pouco tempo. Aguarde alguns minutos ou fale pelo WhatsApp.' },
        429,
        { 'Retry-After': String(limit.retryAfterSeconds) },
      );
    }

    const rawBody = await readBody(request, maxBodyBytes);
    if (rawBody === null) {
      return json({ error: 'Mensagem muito grande.' }, 413);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return json({ error: 'Não foi possível ler os dados enviados.' }, 400);
    }

    // Campo invisível para pessoas: se vier preenchido, é envio automatizado.
    // Responde como sucesso para não ensinar o robô, mas não envia nada.
    if (
      typeof payload === 'object' &&
      payload !== null &&
      'website' in payload &&
      typeof (payload as { website: unknown }).website === 'string' &&
      (payload as { website: string }).website.trim() !== ''
    ) {
      log('honeypot_filled');
      return json({ ok: true }, 200);
    }

    const result = validateContact(payload);
    if (!result.ok) {
      return json({ error: 'Revise os campos indicados.', fieldErrors: result.errors }, 422);
    }

    if (!send) {
      log('provider_not_configured');
      return json({ error: 'O envio pelo formulário está indisponível no momento.' }, 503);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const { error } = await send(buildEmail(result.data, from, to), controller.signal);
      if (error) {
        log('provider_error', { name: error.name, statusCode: error.statusCode ?? null });
        return json({ error: 'Não foi possível enviar sua mensagem agora.' }, 502);
      }
      return json({ ok: true }, 200);
    } catch (err) {
      if (controller.signal.aborted) {
        log('provider_timeout', { timeoutMs });
        return json({ error: 'O envio demorou mais que o esperado. Tente novamente.' }, 504);
      }
      log('provider_exception', { name: err instanceof Error ? err.name : typeof err });
      return json({ error: 'Não foi possível enviar sua mensagem agora.' }, 500);
    } finally {
      clearTimeout(timer);
    }
  };
}
