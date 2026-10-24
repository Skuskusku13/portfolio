import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';

describe('BrandIcons', () => {
  it.each([
    ['GitHubIcon', GitHubIcon],
    ['LinkedInIcon', LinkedInIcon],
  ])('%s rend un svg masqué aux lecteurs d’écran', (_name, Icon) => {
    const { container } = render(<Icon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('transmet les props, comme className, au svg', () => {
    const { container } = render(<GitHubIcon className="size-4" />);
    expect(container.querySelector('svg')).toHaveClass('size-4');
  });
});
