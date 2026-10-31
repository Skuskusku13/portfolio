/**
 * Le nom, l'énoncé et le paragraphe de pratique du hero. Le paragraphe est l'élément LCP mesuré
 * par Lighthouse : rien ici ne s'anime (une entrée en opacité retarderait le LCP de toute la
 * durée du JavaScript). Une copie statique de ce rendu vit dans index.html (#root) pour être
 * peinte avant le JavaScript ; HeroStatic.test.tsx garantit que les deux restent identiques.
 */
export default function HeroStatic() {
  return (
    <>
      <h1 className="text-[3.25rem] font-semibold leading-[0.98] sm:text-[4rem] lg:text-[4.5rem]">Dan Levy</h1>
      <p className="mt-5 max-w-[48ch] text-[1.125rem] leading-[1.4] text-ink sm:text-[1.25rem]">
        Architecte des Systèmes d'Information. Conception d'architectures Back-end et DevOps pour des solutions
        robustes, sécurisées et automatisées.
      </p>
      <p className="mt-4 max-w-[56ch] text-[1.0625rem] leading-[1.55] text-ink-2 sm:text-[1.125rem]">
        Conteneurs, CI/CD, supervision, sécurité{'\u00A0'}: je conçois et j'exploite des systèmes qui tournent en production, du code
        au déploiement. Ce site en est un exemple, de son dépôt à votre écran.
      </p>
    </>
  );
}
