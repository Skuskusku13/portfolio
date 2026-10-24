import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { EMAIL } from '../config';
import {
  ContactError,
  LIMITS,
  describeError,
  sendContact,
  validateContact,
  validateField,
  type ContactErrorKind,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from '../lib/contact';
import Button from './ui/Button';

type SendState =
  | { kind: 'idle' }
  | { kind: 'invalid'; count: number }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'failed'; reason: ContactErrorKind };

const FIELDS: readonly ContactField[] = ['email', 'subject', 'message'];
const EMPTY: ContactValues = { email: '', subject: '', message: '' };

const fieldClass =
  // 16 px sous 640 px : en dessous, iOS Safari zoome sur le champ au focus (DESIGN.md : 15 px, gardé dès sm).
  'w-full rounded-md border border-line-input bg-surface px-3.5 text-[16px] text-ink placeholder:text-ink-3 sm:text-[15px] ' +
  'transition-[border-color,box-shadow] duration-200 ease-out-quint ' +
  'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 ' +
  'forced-colors:focus:outline-2 forced-colors:focus:outline-offset-2';

const labelClass = 'mb-1.5 block text-[14px] font-medium text-ink';

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[14px] leading-[1.5] text-danger">
      Erreur : {message}
    </p>
  );
}

/**
 * Formulaire de contact : validation en direct (au départ du champ, puis à chaque frappe),
 * envoi borné dans le temps, erreurs distinctes (délai, réseau, refus, limite, indisponible)
 * avec repli vers l'adresse email, et champ piège pour les robots.
 */
export default function ContactForm({ mailerUrl }: { mailerUrl: string }) {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [state, setState] = useState<SendState>({ kind: 'idle' });
  const [trap, setTrap] = useState('');
  const inFlight = useRef(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (field: ContactField) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    if (state.kind !== 'idle' && state.kind !== 'sending') setState({ kind: 'idle' });
  };

  // Au départ du champ : on signale un format incorrect, pas un champ laissé vide en passant
  // (l'absence n'est reprochée qu'à l'envoi). Le champ devient ensuite validé à chaque frappe.
  const handleBlur = (field: ContactField) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (values[field].trim() !== '') setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inFlight.current) return;

    const nextErrors = validateContact(values);
    const invalid = FIELDS.filter((field) => nextErrors[field]);
    if (invalid.length > 0) {
      setErrors(nextErrors);
      setTouched({ email: true, subject: true, message: true });
      setState({ kind: 'invalid', count: invalid.length });
      const focusTargets = { email: emailRef, subject: subjectRef, message: messageRef };
      const first = invalid[0];
      if (first) focusTargets[first].current?.focus();
      return;
    }

    // Champ piège rempli : un robot. On feint le succès sans rien envoyer.
    if (trap !== '') {
      setValues(EMPTY);
      setState({ kind: 'sent' });
      return;
    }

    inFlight.current = true;
    setState({ kind: 'sending' });
    try {
      await sendContact(mailerUrl, values);
      setValues(EMPTY);
      setTouched({});
      setErrors({});
      setState({ kind: 'sent' });
    } catch (error) {
      setState({ kind: 'failed', reason: error instanceof ContactError ? error.kind : 'network' });
    } finally {
      inFlight.current = false;
    }
  };

  const sending = state.kind === 'sending';
  const describedBy = (field: ContactField) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form aria-label="Formulaire de contact" noValidate onSubmit={handleSubmit} className="space-y-5">
      <p className="text-[14px] text-ink-2">Tous les champs sont obligatoires.</p>

      <div>
        <label htmlFor="email" className={labelClass}>
          Votre email
        </label>
        <input
          ref={emailRef}
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          maxLength={LIMITS.email}
          value={values.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describedBy('email')}
          placeholder="prenom.nom@exemple.fr"
          className={`${fieldClass} h-11`}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="subject" className={labelClass}>
          Sujet
        </label>
        <input
          ref={subjectRef}
          type="text"
          id="subject"
          name="subject"
          required
          maxLength={LIMITS.subject}
          value={values.subject}
          onChange={handleChange('subject')}
          onBlur={handleBlur('subject')}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy('subject')}
          placeholder="Proposition, question technique, échange"
          className={`${fieldClass} h-11`}
        />
        <FieldError id="subject-error" message={errors.subject} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          required
          rows={5}
          maxLength={LIMITS.message}
          value={values.message}
          onChange={handleChange('message')}
          onBlur={handleBlur('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          placeholder="Quelques lignes suffisent."
          className={`${fieldClass} resize-y py-2.5 leading-[1.5]`}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Champ piège : invisible et hors tabulation pour les humains, rempli par les robots. Jamais envoyé. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Site web</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <div>
        <Button type="submit" aria-disabled={sending || undefined} className="w-full sm:w-auto">
          {sending ? (
            <>
              <Loader2 className="size-4 motion-safe:animate-spin" strokeWidth={1.5} aria-hidden="true" />
              Envoi en cours
            </>
          ) : (
            'Envoyer'
          )}
        </Button>
        <p role="status" aria-live="polite" className="mt-3 min-h-5 text-[14px] leading-[1.5]">
          {state.kind === 'sending' && <span className="sr-only">Envoi en cours</span>}
          {state.kind === 'invalid' && (
            <span className="text-danger">
              {state.count} champ{state.count > 1 ? 's' : ''} à corriger.
            </span>
          )}
          {state.kind === 'sent' && <span className="text-ink">Message envoyé. Merci, je vous réponds par email.</span>}
          {state.kind === 'failed' && (
            <span className="text-danger">
              {describeError(state.reason)}{' '}
              <a href={`mailto:${EMAIL}`} className="font-medium underline">
                {EMAIL}
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
