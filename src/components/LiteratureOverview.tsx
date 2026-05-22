import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { LiteratureStats } from "@/components/LiteratureStats";
import { inlineMarkdownToHtml } from "@/lib/markdown";
import type {
  LiteratureData,
  LiteratureEntry,
  LiteratureLink,
  LiteratureSection,
} from "@/lib/literature";

function MarkdownSpan({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: inlineMarkdownToHtml(text) }}
    />
  );
}

function MarkdownParagraph({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <p
      className={className}
      dangerouslySetInnerHTML={{ __html: inlineMarkdownToHtml(text) }}
    />
  );
}

function SourceButton({ link }: { link: LiteratureLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="relative z-10 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-700 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-100 hover:text-teal-900 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-300 dark:hover:border-teal-300/50 dark:hover:bg-teal-400/20 dark:hover:text-teal-200"
    >
      <span>{link.label}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function SectionHeader({ section }: { section: LiteratureSection }) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-zinc-100 pb-6 dark:border-zinc-700/40 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-500 dark:text-teal-400">
          Section {section.eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          {section.title}
        </h2>
      </div>
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {section.entries.length} entries
      </p>
    </div>
  );
}

function LiteratureCard({ entry }: { entry: LiteratureEntry }) {
  const sourceHeading = entry.sourcesLabel.includes("Full text")
    ? "Full text"
    : entry.sourcesLabel;

  return (
    <Card
      as="article"
      id={entry.id}
      className="scroll-mt-28 rounded-2xl border border-zinc-100 bg-white/80 p-6 shadow-sm shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md dark:border-zinc-700/40 dark:bg-zinc-900/40 dark:ring-white/10"
    >
      <div className="relative z-10 flex w-full flex-col gap-4 sm:flex-row sm:items-start">
        <a
          href={`#${entry.id}`}
          aria-label={`Permalink to entry ${entry.number}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-700 transition hover:bg-teal-50 hover:text-teal-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-teal-400/10 dark:hover:text-teal-300"
        >
          {entry.number}
        </a>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-8 tracking-tight text-zinc-800 dark:text-zinc-100">
            <MarkdownSpan text={entry.title} />
          </h3>
        </div>
      </div>

      {entry.summary && (
        <MarkdownParagraph
          text={entry.summary}
          className="relative z-10 mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-400"
        />
      )}

      {entry.sources.length > 0 && (
        <div className="relative z-10 mt-6 border-t border-zinc-100 pt-5 dark:border-zinc-700/40">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
            {sourceHeading}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {entry.sources.map((link) => (
              <SourceButton key={`${entry.id}-${link.href}`} link={link} />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

function LiteratureSectionView({ section }: { section: LiteratureSection }) {
  return (
    <section id={section.id} className="scroll-mt-28">
      <SectionHeader section={section} />
      <div className="grid gap-6">
        {section.entries.map((entry) => (
          <LiteratureCard key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}

export function LiteratureOverview({
  data,
}: {
  data: LiteratureData;
}) {
  const sections = data.sections;

  return (
    <Container className="mt-16 sm:mt-24">
      <div id="literatur" className="scroll-mt-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
            Literature
          </h2>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
          <span>jump to</span>
          <ul className="flex flex-wrap gap-3">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700/40 bg-zinc-800/60 px-3 py-1.5 text-zinc-300 transition hover:border-teal-400/40 hover:text-teal-300"
                >
                  <span className="font-semibold text-zinc-100">
                    Section {section.eyebrow}:
                  </span>
                  <span>{section.title.replace(/\s*\(.+\)$/, "")}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <LiteratureStats data={data} />

        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
          {sections.map((section) => (
            <LiteratureSectionView key={section.id} section={section} />
          ))}
        </div>
      </div>
    </Container>
  );
}
