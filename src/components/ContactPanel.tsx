'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import {
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Clock,
  LoaderCircle,
  Mail,
  Phone,
  Send,
} from 'lucide-react';

import { WhatsAppIcon } from './icons';
import { Button, buttonVariants } from './ui/button';
import { Input, fieldClassName } from './ui/input';
import { Textarea } from './ui/textarea';
import { mailtoUrl, siteConfig, telUrl, whatsappUrl } from '@/config/site';
import {
  BUDGET_OPTIONS,
  EMPTY_CONTACT,
  INTEREST_OPTIONS,
  LIMITS,
  buildWhatsAppMessage,
  isInterest,
  validateContact,
  type ContactField,
  type ContactInput,
  type FieldErrors,
} from '@/lib/contact';
import { INTEREST_EVENT } from '@/lib/interest-events';
import { cn } from '@/lib/utils';

type Status =
  | { type: 'idle' }
  | { type: 'sending' }
  | { type: 'success'; name: string }
  | { type: 'error'; message: string };

const FIELD_ORDER: ContactField[] = ['name', 'email', 'phone', 'interest', 'budget', 'message'];

const FIELD_LABELS: Record<ContactField, string> = {
  name: 'Nome',
  email: 'E-mail',
  phone: 'Telefone ou WhatsApp',
  interest: 'Interesse',
  budget: 'Orçamento estimado',
  message: 'O que você precisa resolver',
};

const GENERIC_ERROR =
  'Não foi possível enviar agora. Seus dados continuam no formulário: tente novamente em instantes ou fale com a equipe pelo WhatsApp.';

const fieldId = (field: ContactField) => `contato-${field}`;
const hintId = (field: ContactField) => `contato-${field}-dica`;
const errorId = (field: ContactField) => `contato-${field}-erro`;

function Field({
  field,
  optional,
  hint,
  error,
  children,
}: {
  field: ContactField;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={fieldId(field)} className="block text-[0.9375rem] font-semibold text-fg">
        {FIELD_LABELS[field]}
        {optional && <span className="font-normal text-fg-muted"> (opcional)</span>}
      </label>
      {hint && (
        <p id={hintId(field)} className="mt-1 text-sm text-fg-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      {error && (
        <p id={errorId(field)} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default function ContactPanel() {
  const [values, setValues] = useState<ContactInput>(EMPTY_CONTACT);
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ type: 'idle' });
  const submittingRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  const isSending = status.type === 'sending';
  const whatsappHref = whatsappUrl(buildWhatsAppMessage(values));

  // Interesse vindo dos cards de soluções ou de links como /?interesse=sistemas#contact.
  useEffect(() => {
    const applyInterest = (interest: unknown) => {
      if (!isInterest(interest)) return;
      setValues((current) => ({ ...current, interest }));
      setErrors((current) => {
        const next = { ...current };
        delete next.interest;
        return next;
      });
    };

    applyInterest(new URLSearchParams(window.location.search).get('interesse'));

    const onSelect = (event: Event) => applyInterest((event as CustomEvent).detail);
    window.addEventListener(INTEREST_EVENT, onSelect);
    return () => window.removeEventListener(INTEREST_EVENT, onSelect);
  }, []);

  useEffect(() => {
    if (status.type === 'success') successRef.current?.focus();
  }, [status.type]);

  const describedBy = (field: ContactField, hasHint = false) =>
    [hasHint ? hintId(field) : null, errors[field] ? errorId(field) : null].filter(Boolean).join(' ') ||
    undefined;

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const first = FIELD_ORDER.find((field) => fieldErrors[field]);
    if (first) document.getElementById(fieldId(first))?.focus();
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const field = event.target.name as ContactField;
    const next = { ...values, [field]: event.target.value };
    setValues(next);

    // Depois de um erro, revalida o campo enquanto a pessoa corrige.
    if (errors[field]) {
      const result = validateContact(next);
      setErrors((current) => {
        const updated = { ...current };
        const message = result.ok ? undefined : result.errors[field];
        if (message) updated[field] = message;
        else delete updated[field];
        return updated;
      });
    }

    if (status.type === 'success' || status.type === 'error') setStatus({ type: 'idle' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;

    const result = validateContact(values);
    if (!result.ok) {
      setErrors(result.errors);
      const fields = FIELD_ORDER.filter((field) => result.errors[field]).map((field) => FIELD_LABELS[field]);
      setStatus({ type: 'error', message: `Revise ${fields.length > 1 ? 'os campos' : 'o campo'}: ${fields.join(', ')}.` });
      focusFirstError(result.errors);
      return;
    }

    submittingRef.current = true;
    setErrors({});
    setStatus({ type: 'sending' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...result.data, website }),
        signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(20_000) : undefined,
      });

      if (response.ok) {
        setValues(EMPTY_CONTACT);
        setStatus({ type: 'success', name: result.data.name.split(' ')[0] });
        return;
      }

      const body = (await response.json().catch(() => null)) as {
        error?: string;
        fieldErrors?: FieldErrors;
      } | null;

      if (response.status === 422 && body?.fieldErrors) {
        setErrors(body.fieldErrors);
        setStatus({ type: 'error', message: 'Revise os campos indicados.' });
        focusFirstError(body.fieldErrors);
      } else if (response.status === 429 && body?.error) {
        setStatus({ type: 'error', message: body.error });
      } else {
        setStatus({ type: 'error', message: GENERIC_ERROR });
      }
    } catch {
      setStatus({ type: 'error', message: GENERIC_ERROR });
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
      {/* No celular, o WhatsApp aparece antes do formulário. */}
      <div className="space-y-8">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-xl font-semibold text-white">Prefere conversar agora?</h3>
          <p className="mt-2 leading-relaxed text-on-dark-muted">
            Chame no WhatsApp. Se você já preencheu parte do formulário, essas informações seguem
            na mensagem.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: 'lg' }), 'mt-5 w-full sm:w-auto')}
          >
            <WhatsAppIcon />
            Conversar pelo WhatsApp
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>

        <div>
          <h3 className="text-base font-semibold text-white">Outras formas de contato</h3>
          <ul className="mt-4 space-y-4">
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-blue" />
              <div className="min-w-0">
                <span className="block text-sm text-on-dark-muted">E-mail</span>
                <a href={mailtoUrl} className="break-words font-medium text-white underline-offset-4 hover:underline">
                  {siteConfig.contact.email}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-blue" />
              <div>
                <span className="block text-sm text-on-dark-muted">Telefone e WhatsApp</span>
                <a href={telUrl} className="font-medium text-white underline-offset-4 hover:underline">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-blue" />
              <div>
                <span className="block text-sm text-on-dark-muted">Atendimento</span>
                <span className="font-medium text-white">{siteConfig.contact.businessHours}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="surface-light rounded-2xl bg-white p-5 text-fg shadow-xl shadow-black/20 sm:p-8">
        <h3 id="formulario-titulo" className="text-xl font-semibold">
          Envie uma mensagem
        </h3>
        <p className="mt-1 text-[0.9375rem] text-fg-muted">
          Nome, e-mail e mensagem são obrigatórios. Os demais campos ajudam, mas são opcionais.
        </p>

        <form
          noValidate
          aria-labelledby="formulario-titulo"
          onSubmit={handleSubmit}
          className="relative mt-6 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field field="name" error={errors.name}>
              <Input
                id={fieldId('name')}
                name="name"
                autoComplete="name"
                required
                maxLength={LIMITS.name.max}
                value={values.name}
                onChange={handleChange}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={describedBy('name')}
              />
            </Field>
            <Field field="email" error={errors.email}>
              <Input
                id={fieldId('email')}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                required
                maxLength={LIMITS.email.max}
                value={values.email}
                onChange={handleChange}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy('email')}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field field="phone" optional error={errors.phone}>
              <Input
                id={fieldId('phone')}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(11) 90000-0000"
                maxLength={LIMITS.phone.max}
                value={values.phone}
                onChange={handleChange}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={describedBy('phone')}
              />
            </Field>
            <Field field="interest" optional error={errors.interest}>
              <div className="relative">
                <select
                  id={fieldId('interest')}
                  name="interest"
                  value={values.interest}
                  onChange={handleChange}
                  aria-invalid={errors.interest ? true : undefined}
                  aria-describedby={describedBy('interest')}
                  className={cn(fieldClassName, 'appearance-none pr-10')}
                >
                  <option value="">Selecione, se quiser</option>
                  {INTEREST_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-fg-muted"
                />
              </div>
            </Field>
          </div>

          <Field field="budget" optional error={errors.budget}>
            <div className="relative sm:max-w-[calc(50%-0.625rem)]">
              <select
                id={fieldId('budget')}
                name="budget"
                value={values.budget}
                onChange={handleChange}
                aria-invalid={errors.budget ? true : undefined}
                aria-describedby={describedBy('budget')}
                className={cn(fieldClassName, 'appearance-none pr-10')}
              >
                <option value="">Selecione, se quiser</option>
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-fg-muted"
              />
            </div>
          </Field>

          <Field
            field="message"
            hint="Conte o problema, quem vai usar e, se houver, prazos ou ferramentas atuais."
            error={errors.message}
          >
            <Textarea
              id={fieldId('message')}
              name="message"
              rows={5}
              required
              maxLength={LIMITS.message.max}
              value={values.message}
              onChange={handleChange}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy('message', true)}
            />
          </Field>

          {/* Campo isca para robôs: invisível e fora da ordem de tabulação. */}
          <div aria-hidden="true" className="absolute -left-[10000px] top-auto size-px overflow-hidden">
            <label htmlFor="contato-website">Não preencha este campo</label>
            <input
              id="contato-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>

          <div role="alert" className="empty:hidden">
            {status.type === 'error' && (
              <div className="flex gap-3 rounded-xl border border-danger/30 bg-danger/5 p-4 text-[0.9375rem] text-fg">
                <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-danger" />
                <div>
                  <p>{status.message}</p>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block font-semibold text-brand-blue-ink underline underline-offset-4"
                  >
                    Enviar pelo WhatsApp
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          <div role="status" className="empty:hidden">
            {status.type === 'sending' && <span className="sr-only">Enviando sua mensagem…</span>}
            {status.type === 'success' && (
              <div
                ref={successRef}
                tabIndex={-1}
                className="flex gap-3 rounded-xl border border-success/30 bg-success/5 p-4 text-[0.9375rem] text-fg"
              >
                <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" />
                <p>
                  <strong className="font-semibold">Mensagem enviada. Obrigado, {status.name}!</strong>{' '}
                  Vamos responder pelo e-mail informado, em horário comercial.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="submit"
              size="lg"
              aria-disabled={isSending || undefined}
              className="w-full aria-disabled:cursor-progress aria-disabled:opacity-80 sm:w-auto"
            >
              {isSending ? (
                <>
                  <LoaderCircle aria-hidden="true" className="animate-spin" />
                  Enviando…
                </>
              ) : (
                <>
                  <Send aria-hidden="true" />
                  Enviar mensagem
                </>
              )}
            </Button>
          </div>

          <p className="text-sm text-fg-muted">
            Usamos esses dados apenas para responder ao seu contato.{' '}
            <a href="/privacidade" className="font-medium text-brand-blue-ink underline underline-offset-4">
              Política de privacidade
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
