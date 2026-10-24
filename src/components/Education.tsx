import { GraduationCap } from 'lucide-react';
import { formations } from '../data';
import Section from './ui/Section';
import Card from './ui/Card';
import Tag from './ui/Tag';

export default function Education() {
  return (
    <Section id="education" title="Formation" deck="Trois diplômes au CFA INSTA, du BTS au Bac+5.">
      <ol role="list" className="grid gap-5 md:grid-cols-3">
        {formations.map((formation, idx) => (
          <Card as="li" key={`${formation.diploma}-${formation.period}`} delay={idx * 60} className="flex flex-col">
            <h3 className="text-[18px] font-semibold leading-[1.3] text-ink">{formation.diploma}</h3>
            <p className="mt-1.5 text-[15px] leading-[1.5] text-ink-2">{formation.specialization}</p>
            <p className="mt-1 flex items-center gap-1.5 text-[14px] leading-[1.5] text-ink-3">
              <GraduationCap className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {formation.school}
            </p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-5">
              <p className="font-mono text-[13px] text-ink-2 tnum">{formation.period}</p>
              <Tag tone="accent">{formation.level}</Tag>
            </div>
          </Card>
        ))}
      </ol>
    </Section>
  );
}
