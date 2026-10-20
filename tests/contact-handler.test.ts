import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  createContactHandler,
  type OutgoingEmail,
  type SendEmail,
} from '../src/lib/contact-handler.ts';
import { createRateLimiter } from '../src/lib/rate-limit.ts';

const URL_BASE = 'http://localhost:3000/api/contact';

const validBody = {
  name: 'Maria Souza',
  email: 'maria@empresa.com.br',
  phone: '(11) 90000-0000',
  interest: 'sistemas',
  budget: 'nao-definido',
  message: 'Precisamos organizar os pedidos dos clientes em um portal.',
  website: '',
};

function post(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request(URL_BASE, {
    method: 'POST',
    headers: { 'content-type': 'application/json', host: 'localhost:3000', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function setup(send: SendEmail | null = async () => ({ error: null })) {
  const sent: OutgoingEmail[] = [];
  const logs: Array<{ event: string; details?: Record<string, unknown> }> = [];
  const handler = createContactHandler({
    send: send
      ? async (email, signal) => {
          sent.push(email);
          return send(email, signal);
        }
      : null,
    to: 'destino@example.com',
    from: 'Site <site@example.com>',
    rateLimiter: createRateLimiter({ limit: 100, windowMs: 60_000 }),
    timeoutMs: 50,
    log: (event, details) => logs.push({ event, details }),
  });
  return { handler, sent, logs };
}

describe('POST /api/contact', () => {
  it('envia o e-mail com reply-to de quem preencheu e textos legíveis', async () => {
    const { handler, sent } = setup();
    const response = await handler(post(validBody));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(sent.length, 1);
    assert.equal(sent[0].to, 'destino@example.com');
    assert.equal(sent[0].replyTo, 'maria@empresa.com.br');
    assert.match(sent[0].text, /Interesse: Sistema ou portal para a empresa/);
    assert.match(sent[0].text, /Orçamento: Ainda não definido/);
    assert.doesNotMatch(sent[0].text, /nao-definido|sistemas\b/);
  });

  it('responde 400 para JSON inválido', async () => {
    const { handler, sent } = setup();
    const response = await handler(post('{"name": '));
    assert.equal(response.status, 400);
    assert.equal(sent.length, 0);
  });

  it('responde 415 quando o corpo não é JSON', async () => {
    const { handler } = setup();
    const response = await handler(post('name=x', { 'content-type': 'application/x-www-form-urlencoded' }));
    assert.equal(response.status, 415);
  });

  it('responde 413 para corpo acima do limite, mesmo sem content-length', async () => {
    const { handler, sent } = setup();
    const big = JSON.stringify({ ...validBody, message: 'x'.repeat(20_000) });
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(big));
        controller.close();
      },
    });
    const request = new Request(URL_BASE, {
      method: 'POST',
      headers: { 'content-type': 'application/json', host: 'localhost:3000' },
      body: stream,
      // @ts-expect-error duplex é exigido pelo Node para corpo em stream
      duplex: 'half',
    });
    const response = await handler(request);
    assert.equal(response.status, 413);
    assert.equal(sent.length, 0);
  });

  it('responde 422 com erros por campo', async () => {
    const { handler, sent } = setup();
    const response = await handler(post({ ...validBody, email: 'invalido', interest: 'x' }));
    assert.equal(response.status, 422);
    const body = await response.json();
    assert.ok(body.fieldErrors.email);
    assert.ok(body.fieldErrors.interest);
    assert.equal(sent.length, 0);
  });

  it('descarta silenciosamente envios com o campo isca preenchido', async () => {
    const { handler, sent, logs } = setup();
    const response = await handler(post({ ...validBody, website: 'https://spam.example' }));
    assert.equal(response.status, 200);
    assert.equal(sent.length, 0);
    assert.equal(logs[0].event, 'honeypot_filled');
  });

  it('bloqueia requisições de outra origem', async () => {
    const { handler, sent } = setup();
    const response = await handler(post(validBody, { origin: 'https://outro-site.example' }));
    assert.equal(response.status, 403);
    assert.equal(sent.length, 0);
  });

  it('aceita a própria origem', async () => {
    const { handler } = setup();
    const response = await handler(post(validBody, { origin: 'http://localhost:3000' }));
    assert.equal(response.status, 200);
  });

  it('limita tentativas repetidas da mesma origem', async () => {
    const handler = createContactHandler({
      send: async () => ({ error: null }),
      to: 'destino@example.com',
      from: 'site@example.com',
      rateLimiter: createRateLimiter({ limit: 2, windowMs: 60_000 }),
      log: () => {},
    });
    const headers = { 'x-forwarded-for': '203.0.113.7' };
    assert.equal((await handler(post(validBody, headers))).status, 200);
    assert.equal((await handler(post(validBody, headers))).status, 200);
    const blocked = await handler(post(validBody, headers));
    assert.equal(blocked.status, 429);
    assert.ok(Number(blocked.headers.get('retry-after')) > 0);
    const otherIp = await handler(post(validBody, { 'x-forwarded-for': '198.51.100.1' }));
    assert.equal(otherIp.status, 200);
  });

  it('responde 503 quando o provedor não está configurado', async () => {
    const { handler, logs } = setup(null);
    const response = await handler(post(validBody));
    assert.equal(response.status, 503);
    assert.equal(logs[0].event, 'provider_not_configured');
  });

  it('responde 502 quando o provedor recusa, sem registrar dados pessoais', async () => {
    const { handler, logs } = setup(async () => ({
      error: { name: 'validation_error', statusCode: 422 },
    }));
    const response = await handler(post(validBody));
    assert.equal(response.status, 502);
    const logged = JSON.stringify(logs);
    assert.doesNotMatch(logged, /Maria|maria@|90000|portal/);
  });

  it('responde 504 quando o provedor excede o tempo limite', async () => {
    const { handler, logs } = setup(
      (_email, signal) =>
        new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => reject(new Error('aborted')));
        }),
    );
    const response = await handler(post(validBody));
    assert.equal(response.status, 504);
    assert.equal(logs[0].event, 'provider_timeout');
  });

  it('responde 500 para exceções inesperadas do provedor', async () => {
    const { handler } = setup(async () => {
      throw new TypeError('network');
    });
    const response = await handler(post(validBody));
    assert.equal(response.status, 500);
  });

  it('não permite cache das respostas', async () => {
    const { handler } = setup();
    const response = await handler(post(validBody));
    assert.equal(response.headers.get('cache-control'), 'no-store');
  });
});
