import { Resend } from 'resend';

import { createContactHandler, type SendEmail } from '@/lib/contact-handler';

// Destinatário das mensagens do formulário.
// Decisão atual: continuar entregando na caixa Gmail já usada pela equipe, porque é a
// caixa com recebimento comprovado. O endereço público do site é contato@carvacodeweb.com.
// Para passar a receber direto no endereço institucional, defina CONTACT_TO_EMAIL na
// hospedagem depois de confirmar que essa caixa recebe e-mails (registros MX).
const DEFAULT_TO = 'carvacodebr@gmail.com';
// O remetente precisa estar em um domínio verificado no Resend.
const DEFAULT_FROM = 'CarvaCode Site <contato@carvacodeweb.com>';

export const runtime = 'nodejs';

function createSender(): SendEmail | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  const resend = new Resend(apiKey);
  return async (email, signal) => {
    const { error } = await resend.emails.send(email, { signal });
    return { error: error ? { name: error.name, statusCode: error.statusCode } : null };
  };
}

const handleContact = createContactHandler({
  send: createSender(),
  to: process.env.CONTACT_TO_EMAIL || DEFAULT_TO,
  from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
});

export async function POST(request: Request) {
  return handleContact(request);
}
