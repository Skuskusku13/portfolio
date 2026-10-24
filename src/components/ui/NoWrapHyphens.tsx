import { Fragment } from 'react';

/**
 * Empêche la coupure d'un mot composé à son trait d'union (« Back-end », « Full-stack »)
 * sans toucher au contenu : chaque mot contenant un tiret est rendu insécable, le reste
 * se replie normalement entre les mots.
 */
export default function NoWrapHyphens({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 && ' '}
          {word.includes('-') && word.length > 1 ? <span className="whitespace-nowrap">{word}</span> : word}
        </Fragment>
      ))}
    </>
  );
}
