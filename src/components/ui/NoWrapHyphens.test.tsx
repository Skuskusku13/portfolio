import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import NoWrapHyphens from './NoWrapHyphens';

describe('NoWrapHyphens', () => {
  it('enveloppe les mots avec tiret dans un span insécable', () => {
    const { container } = render(<NoWrapHyphens text="Développeur Back-end & DevOps" />);
    const spans = container.querySelectorAll('span.whitespace-nowrap');
    expect(spans).toHaveLength(1);
    expect(spans[0].textContent).toBe('Back-end');
  });

  it('n’enveloppe pas les mots sans tiret et conserve les espaces', () => {
    const { container } = render(<NoWrapHyphens text="Développeur Web" />);
    expect(container.querySelector('span')).toBeNull();
    expect(container.textContent).toBe('Développeur Web');
  });

  it('conserve le texte intégral avec plusieurs mots composés', () => {
    const { container } = render(<NoWrapHyphens text="Full-stack et Back-end" />);
    expect(container.querySelectorAll('span.whitespace-nowrap')).toHaveLength(2);
    expect(container.textContent).toBe('Full-stack et Back-end');
  });

  it('n’enveloppe pas un tiret isolé', () => {
    const { container } = render(<NoWrapHyphens text="A - B" />);
    expect(container.querySelector('span')).toBeNull();
    expect(container.textContent).toBe('A - B');
  });
});
