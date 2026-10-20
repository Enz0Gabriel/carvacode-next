// Regras do formulário de contato, compartilhadas entre o navegador e a rota /api/contact.
// Este módulo não tem dependências para poder ser testado diretamente com `node --test`.

export const INTEREST_OPTIONS = [
  { value: 'sites', label: 'Site ou presença digital' },
  { value: 'sistemas', label: 'Sistema ou portal para a empresa' },
  { value: 'aplicativos', label: 'Aplicativo' },
  { value: 'integracoes', label: 'Integração, automação ou evolução de software' },
  { value: 'outro', label: 'Outro / ainda não sei' },
] as const;

// Faixas mantidas do formulário anterior, com a opção de orçamento não definido.
export const BUDGET_OPTIONS = [
  { value: 'nao-definido', label: 'Ainda não definido' },
  { value: '5k-15k', label: 'R$ 5.000 a R$ 15.000' },
  { value: '15k-30k', label: 'R$ 15.000 a R$ 30.000' },
  { value: '30k-50k', label: 'R$ 30.000 a R$ 50.000' },
  { value: '50k+', label: 'Acima de R$ 50.000' },
] as const;

export type Interest = (typeof INTEREST_OPTIONS)[number]['value'];
export type Budget = (typeof BUDGET_OPTIONS)[number]['value'];

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 30, minDigits: 8, maxDigits: 15 },
  message: { min: 10, max: 4000 },
} as const;

export type ContactField = 'name' | 'email' | 'phone' | 'interest' | 'budget' | 'message';

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  interest: Interest | '';
  budget: Budget | '';
  message: string;
}

export type FieldErrors = Partial<Record<ContactField, string>>;

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; errors: FieldErrors };

export const EMPTY_CONTACT: ContactInput = {
  name: '',
  email: '',
  phone: '',
  interest: '',
  budget: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+().\-\s]+$/;
// Caracteres de controle não fazem sentido em nenhum campo de uma linha.
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;
// Na mensagem, quebras de linha e tabulação são permitidas.
const MESSAGE_CONTROL_CHARS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

export function isInterest(value: unknown): value is Interest {
  return INTEREST_OPTIONS.some((option) => option.value === value);
}

export function isBudget(value: unknown): value is Budget {
  return BUDGET_OPTIONS.some((option) => option.value === value);
}

export function interestLabel(value: string): string | undefined {
  return INTEREST_OPTIONS.find((option) => option.value === value)?.label;
}

export function budgetLabel(value: string): string | undefined {
  return BUDGET_OPTIONS.find((option) => option.value === value)?.label;
}

function readString(source: Record<string, unknown>, key: string): string | null {
  const value = source[key];
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string') return null;
  return value.trim();
}

export function validateContact(raw: unknown): ValidationResult {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return { ok: false, errors: { message: 'Envie os dados do formulário.' } };
  }

  const source = raw as Record<string, unknown>;
  const errors: FieldErrors = {};

  const name = readString(source, 'name');
  if (name === null || name.length === 0) {
    errors.name = 'Informe seu nome.';
  } else if (name.length < LIMITS.name.min) {
    errors.name = 'Informe pelo menos 2 caracteres.';
  } else if (name.length > LIMITS.name.max) {
    errors.name = `Use no máximo ${LIMITS.name.max} caracteres.`;
  } else if (CONTROL_CHARS.test(name)) {
    errors.name = 'Remova caracteres especiais do nome.';
  }

  const email = readString(source, 'email');
  if (email === null || email.length === 0) {
    errors.email = 'Informe seu e-mail.';
  } else if (
    email.length > LIMITS.email.max ||
    CONTROL_CHARS.test(email) ||
    !EMAIL_PATTERN.test(email)
  ) {
    errors.email = 'Informe um e-mail válido, como nome@empresa.com.br.';
  }

  const phone = readString(source, 'phone');
  if (phone === null) {
    errors.phone = 'Telefone inválido.';
  } else if (phone.length > 0) {
    const digits = phone.replace(/\D/g, '').length;
    if (
      phone.length > LIMITS.phone.max ||
      !PHONE_PATTERN.test(phone) ||
      digits < LIMITS.phone.minDigits ||
      digits > LIMITS.phone.maxDigits
    ) {
      errors.phone = 'Informe um telefone com DDD, como (11) 90000-0000, ou deixe em branco.';
    }
  }

  const interest = readString(source, 'interest');
  if (interest === null || (interest !== '' && !isInterest(interest))) {
    errors.interest = 'Escolha uma das opções da lista.';
  }

  const budget = readString(source, 'budget');
  if (budget === null || (budget !== '' && !isBudget(budget))) {
    errors.budget = 'Escolha uma das opções da lista.';
  }

  const message = readString(source, 'message');
  if (message === null || message.length === 0) {
    errors.message = 'Conte brevemente o que você precisa.';
  } else if (message.length < LIMITS.message.min) {
    errors.message = `Escreva pelo menos ${LIMITS.message.min} caracteres.`;
  } else if (message.length > LIMITS.message.max) {
    errors.message = `Use no máximo ${LIMITS.message.max} caracteres.`;
  } else if (MESSAGE_CONTROL_CHARS.test(message)) {
    errors.message = 'Remova caracteres especiais da mensagem.';
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name: name as string,
      email: email as string,
      phone: phone as string,
      interest: interest as Interest | '',
      budget: budget as Budget | '',
      message: message as string,
    },
  };
}

const WHATSAPP_MESSAGE_PREVIEW = 600;

/**
 * Monta a mensagem do WhatsApp apenas com o que a pessoa preencheu.
 * Nunca inclui marcadores como "[Seu Nome]" nem os valores internos das opções.
 */
export function buildWhatsAppMessage(input: Partial<ContactInput> = {}): string {
  const name = input.name?.trim();
  const interest = input.interest ? interestLabel(input.interest) : undefined;
  const budget = input.budget ? budgetLabel(input.budget) : undefined;
  let message = input.message?.trim();

  if (!name && !interest && !budget && !message) {
    return 'Olá! Vim pelo site da CarvaCode e gostaria de conversar sobre um projeto.';
  }

  if (message && message.length > WHATSAPP_MESSAGE_PREVIEW) {
    message = `${message.slice(0, WHATSAPP_MESSAGE_PREVIEW).trimEnd()}…`;
  }

  const lines = ['Olá! Vim pelo site da CarvaCode.'];
  if (name) lines.push(`Meu nome é ${name}.`);
  if (interest) lines.push(`Tenho interesse em: ${interest}.`);
  if (budget) lines.push(`Orçamento estimado: ${budget}.`);
  if (message) lines.push('', `Sobre o projeto: ${message}`);
  return lines.join('\n');
}
