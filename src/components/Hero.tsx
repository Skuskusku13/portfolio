import { Mail } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons';
import DeploymentChain from './DeploymentChain';
import HeroStatic from './HeroStatic';
import { GITHUB_URL, LINKEDIN_URL } from '../config';

export default function Hero() {
  return (
    <section id="about" className="pt-24 pb-8 sm:pt-32 sm:pb-10 lg:pt-36 lg:pb-12">
      <Container>
        {/* Ordre DOM = ordre mobile : texte et actions, puis la preuve (chaîne). Sur desktop la chaîne occupe la colonne droite. */}
        <div className="grid items-start gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {/* Rôle, nom, énoncé et paragraphe : peints avant le JavaScript (copie statique dans index.html), jamais animés (LCP). */}
            <HeroStatic />
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

          <Reveal delay={180} className="lg:col-span-5 lg:col-start-8">
            <DeploymentChain />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
