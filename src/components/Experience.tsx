import { experiences } from '../data';
import Section from './ui/Section';
import Card from './ui/Card';
import Tag from './ui/Tag';
import ChipList from './ui/ChipList';
import NoWrapHyphens from './ui/NoWrapHyphens';
import { periodDuration } from '../lib/dates';

export default function Experience() {
  return (
    <Section id="experiences" title="Expériences">
      {/* Sur desktop, un rail relie les cartes (écho de la chaîne du hero) ; repère plein pour le poste actuel. */}
      <ol role="list" className="timeline grid gap-5">
        {experiences.map((exp, idx) => {
          const isCurrent = idx === 0;
          return (
            <Card
              as="li"
              key={`${exp.company}-${exp.period}`}
              delay={idx * 60}
              className={`timeline-item sm:p-7 ${isCurrent ? 'timeline-item--current' : ''}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                <div className="min-w-0 flex-1 basis-[22rem]">
                  <h3
                    className={`font-semibold leading-[1.15] text-ink ${
                      isCurrent ? 'text-[22px] sm:text-[24px]' : 'text-[19px] sm:text-[20px]'
                    }`}
                  >
                    <NoWrapHyphens text={exp.role} />
                  </h3>
                  <p className="mt-1 text-[15px] leading-[1.5] text-ink">{exp.company}</p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                  <p className="font-mono text-[13px] leading-[1.6] text-ink-2 tnum">
                    {exp.period}
                    {/* Durée dérivée des mois du contenu ; une expérience en cours se recalcule chaque mois. */}
                    <span className="text-ink-3"> · {periodDuration(exp.start, exp.end)}</span>
                  </p>
                  {/* Le contrat d'origine reste affiché ; la promotion s'ajoute à côté. */}
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Tag>{exp.type}</Tag>
                    {exp.promotion && (
                      <Tag tone="ok" dot>
                        {exp.promotion}
                      </Tag>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-4 max-w-[64ch] text-[16px] leading-[1.55] text-ink-2">{exp.summary}</p>

              <ChipList items={exp.skills} className="mt-5" label={`Compétences chez ${exp.company}`} />
            </Card>
          );
        })}
      </ol>
    </Section>
  );
}
