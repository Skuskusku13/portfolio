import { Mail } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons';
import DeploymentChain from './DeploymentChain';
import { GITHUB_URL, LINKEDIN_URL } from '../config';

const facts = [
  'En CDI chez Meilleurtaux Placement depuis septembre 2026',
  "Bac+5 Architecte des Systèmes d'Information (CFA INSTA)",
  'En poste depuis octobre 2021',
];

export default function Hero() {
  return (
    <section id="about" className="pt-24 pb-8 sm:pt-32 sm:pb-10 lg:pt-36 lg:pb-12">
      <Container>
        {/* Ordre DOM = ordre mobile : texte et actions, puis la preuve (chaîne), puis les faits.
            Sur desktop la chaîne occupe la colonne droite sur deux rangées. */}
        <div className="grid items-start gap-x-12 gap-y-8 lg:grid-cols-12 lg:gap-y-10">
          <div className="lg:col-span-7">
            {/* Le nom et l'énoncé sont peints immédiatement : c'est le LCP, il ne s'anime pas. */}
            <h1 className="text-[52px] font-semibold leading-[0.98] sm:text-[64px] lg:text-[72px]">Dan Levy</h1>
            <p className="mt-6 max-w-[26ch] text-[22px] leading-[1.3] text-ink sm:text-[26px]">
              Développeur Back-end &amp; DevOps. Je construis des back-ends Symfony et l'infrastructure qui les fait tourner.
            </p>
            <Reveal as="p" delay={60} className="mt-6 max-w-[56ch] text-[17px] leading-[1.55] text-ink-2 sm:text-[18px]">
              Conteneurs, CI/CD, supervision, sécurité : je conçois et j'exploite des systèmes qui tournent en production, du code
              au déploiement. Ce site en est un exemple, de son dépôt à votre écran.
            </Reveal>
            <Reveal delay={120} className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Button href="#contact" className="col-span-2 sm:col-auto">
                <Mail className="size-4" strokeWidth={1.5} aria-hidden="true" />
                Me contacter
              </Button>
              <Button href={LINKEDIN_URL} variant="secondary" target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="size-4" />
                LinkedIn
              </Button>
              <Button href={GITHUB_URL} variant="secondary" target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="size-4" />
                GitHub
              </Button>
            </Reveal>
          </div>

          <Reveal delay={180} className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
            <DeploymentChain />
          </Reveal>

          <Reveal
            as="ul"
            delay={240}
            className="max-w-[46ch] divide-y divide-line border-y border-line text-[14px] text-ink-2 lg:col-span-7 lg:col-start-1 lg:row-start-2"
          >
            {facts.map((fact) => (
              <li key={fact} className="py-2.5">
                {fact}
              </li>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
