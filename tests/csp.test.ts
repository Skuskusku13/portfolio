import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Les scripts inline exécutables d'index.html doivent être autorisés par leur hash
 * sha256 dans la CSP d'Apache. Ce test transforme un piège documenté (hash à recalculer
 * à la main) en garde-fou : il casse dès que le script change sans la CSP.
 */
const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8');
const apacheConf = readFileSync(resolve(process.cwd(), '.docker/000-default.conf'), 'utf8');

function inlineScripts(source: string): string[] {
  const scripts: string[] = [];
  const pattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
  for (const match of source.matchAll(pattern)) {
    const [, attributes, body] = match;
    const isExternal = /\bsrc=/.test(attributes);
    const isDataBlock = /type\s*=\s*["']application\/ld\+json["']/.test(attributes);
    if (!isExternal && !isDataBlock) scripts.push(body);
  }
  return scripts;
}

const sha256 = (text: string) => `'sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}'`;

describe('CSP et scripts inline', () => {
  const scripts = inlineScripts(html);
  const csp = apacheConf.match(/Content-Security-Policy\s+"([^"]+)"/)?.[1] ?? '';
  const scriptSrc = csp.split(';').map((d) => d.trim()).find((d) => d.startsWith('script-src')) ?? '';

  it("index.html contient exactement un script inline exécutable (l'initialisation du thème)", () => {
    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toContain('prefers-color-scheme');
  });

  it('la directive script-src autorise chaque script inline par son hash sha256', () => {
    for (const script of scripts) expect(scriptSrc).toContain(sha256(script));
  });

  it("n'autorise aucun script inline par 'unsafe-inline'", () => {
    expect(scriptSrc).not.toContain('unsafe-inline');
  });
});
