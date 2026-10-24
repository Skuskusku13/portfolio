/**
 * Complément de nom accessible pour les liens ouverts dans un nouvel onglet :
 * l'icône de flèche est décorative, ce texte masqué annonce le changement de contexte.
 * L'espace est un nœud texte séparé : les conteneurs flex l'ignorent visuellement et
 * les calculateurs de nom accessible le conservent.
 */
export default function NewWindowHint() {
  return (
    <>
      {' '}
      <span className="sr-only">(nouvelle fenêtre)</span>
    </>
  );
}
