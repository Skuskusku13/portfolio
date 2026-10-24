import Container from './ui/Container';
import { GITHUB_URL, LINKEDIN_URL } from '../config';

const linkClass = 'inline-block py-1 text-[13px] text-ink-2 transition-colors duration-200 hover:text-ink';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-ink-2">© {year} Dan Levy · Développeur Back-end &amp; DevOps</p>
        <nav aria-label="Liens de pied de page" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            LinkedIn
          </a>
          <a href="#about" className={linkClass}>
            Haut de page
          </a>
        </nav>
      </Container>
    </footer>
  );
}
