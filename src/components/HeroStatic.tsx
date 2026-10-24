/**
 * Le nom, l'énoncé et le paragraphe de pratique du hero. Le paragraphe est l'élément LCP mesuré
 * par Lighthouse : rien ici ne s'anime (une entrée en opacité retarderait le LCP de toute la
 * durée du JavaScript). Une copie statique de ce rendu vit dans index.html (#root) pour être
 * peinte avant le JavaScript ; HeroStatic.test.tsx garantit que les deux restent identiques.
 */
export default function HeroStatic() {
  return (
    <>
      <h1 className="text-[52px] font-semibold leading-[0.98] sm:text-[64px] lg:text-[72px]">Dan Levy</h1>
      <p className="mt-6 max-w-[26ch] text-[22px] leading-[1.3] text-ink sm:text-[26px]">
        Développeur Back-end &amp; DevOps. Je construis des back-ends Symfony et l'infrastructure qui les fait tourner.
      </p>
      <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.55] text-ink-2 sm:text-[18px]">
        Conteneurs, CI/CD, supervision, sécurité : je conçois et j'exploite des systèmes qui tournent en production, du code
        au déploiement. Ce site en est un exemple, de son dépôt à votre écran.
      </p>
    </>
  );
}
