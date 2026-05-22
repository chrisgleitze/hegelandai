import { Card } from "@/components/Card";
import type { LiteratureData } from "@/lib/literature";

type Stat = {
  value: string;
  label: string;
};

function StatCard({ value, label }: Stat) {
  return (
    <Card
      as="li"
      className="rounded-2xl border border-zinc-100 bg-white/80 p-6 shadow-sm shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md dark:border-zinc-700/40 dark:bg-zinc-900/40 dark:ring-white/10"
    >
      <p className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
        {value}
      </p>
      <p className="mt-2 text-sm font-semibold text-teal-600 dark:text-teal-400">
        {label}
      </p>
    </Card>
  );
}

export function LiteratureStats({ data }: { data: LiteratureData }) {
  const booksCount =
    data.sections.find((section) => section.id === "books")?.entries.length ??
    0;
  const articleCount =
    data.sections.find((section) => section.id === "articles")?.entries
      .length ?? 0;

  const stats: Stat[] = [
    {
      value: String(data.totalEntries),
      label: "Entries",
    },
    {
      value: String(booksCount),
      label: "Books",
    },
    {
      value: String(articleCount),
      label: "Articles",
    },
  ];

  return (
    <ul
      role="list"
      className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3"
      aria-label="Literature statistics"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </ul>
  );
}
