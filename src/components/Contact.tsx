import { EMAIL, MAILER_URL } from '../config';
import Section from './ui/Section';
import Reveal from './ui/Reveal';
import ContactChannels from './ContactChannels';
import ContactForm from './ContactForm';

/** Sans API de contact configurée, on ne rend pas un formulaire qui ne peut pas envoyer. */
function ContactUnavailable() {
  return (
    <p className="rule pt-6 text-[15px] leading-[1.55] text-ink-2">
      Le formulaire est indisponible pour le moment. Écrivez-moi directement à{' '}
      <a href={`mailto:${EMAIL}`} className="font-medium text-ink underline">
        {EMAIL}
      </a>
      .
    </p>
  );
}

export default function Contact() {
  return (
    <Section id="contact" title="Contact" deck="Ouvert aux opportunités professionnelles et aux échanges techniques.">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <ContactChannels />
        </Reveal>

        <Reveal delay={60} className="lg:col-span-6 lg:col-start-7">
          {MAILER_URL ? <ContactForm mailerUrl={MAILER_URL} /> : <ContactUnavailable />}
        </Reveal>
      </div>
    </Section>
  );
}
