/**
 * Le rôle, le nom, l'énoncé et le paragraphe de pratique du hero. Le paragraphe est l'élément LCP mesuré
 * par Lighthouse : rien ici ne s'anime (une entrée en opacité retarderait le LCP de toute la
 * durée du JavaScript). Une copie statique de ce rendu vit dans index.html (#root) pour être
 * peinte avant le JavaScript ; HeroStatic.test.tsx garantit que les deux restent identiques.
 */
export default function HeroStatic() {
  return (
    <>
      <p className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink-2">Développeur Back-end &amp; DevOps</p>
      <h1 className="mt-3 text-[52px] font-semibold leading-[0.98] sm:text-[64px] lg:text-[72px]">Dan Levy</h1>
      <p className="mt-6 max-w-[40ch] text-[20px] leading-[1.35] text-ink sm:text-[26px] sm:leading-[1.3]">
        Architecte des Systèmes d'Information. Conception d'architectures Back-end et DevOps pour des solutions
        robustes, sécurisées et automatisées.
      </p>
      <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.55] text-ink-2 sm:text-[18px]">
        Conteneurs, CI/CD, supervision, sécurité : je conçois et j'exploite des systèmes qui tournent en production, du code
        au déploiement. Ce site en est un exemple, de son dépôt à votre écran.
      </p>
    </>
  );
}
