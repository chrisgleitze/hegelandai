import clsx from "clsx";

import { Card } from "@/components/Card";
import type { LiteratureData } from "@/lib/literature";

type StatLabel = "Entries" | "Books" | "Articles";

type Stat = {
  value: string;
  label: StatLabel;
  href: string;
};

function StatCard({ value, label, href, size }: Stat & { size: "sm" | "lg" }) {
  return (
    <Card
      as="li"
      className={clsx(
        "overflow-hidden rounded-2xl border border-zinc-100 bg-white/80 shadow-sm shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition duration-200 ease-out hover:-translate-y-px hover:shadow-none dark:border-zinc-700/40 dark:bg-zinc-900/40 dark:ring-white/10 dark:hover:shadow-none",
        size === "sm" ? "px-4 py-1.5" : "px-5 py-4",
      )}
    >
      <Card.Link
        href={href}
        className={clsx(
          "block text-center",
          size === "sm" ? "min-w-20" : "min-w-28 sm:min-w-32",
        )}
      >
        <span
          className={clsx(
            "block font-bold tracking-tight text-zinc-800 dark:text-zinc-100",
            size === "sm" ? "text-base text-center" : "text-3xl",
          )}
        >
          {value}
        </span>
        <span
          className={clsx(
            "block font-semibold text-teal-600 dark:text-teal-400",
            size === "sm" ? "text-[0.6rem] mt-0.5 text-center" : "text-sm mt-2",
          )}
        >
          {label}
        </span>
      </Card.Link>
    </Card>
  );
}

export function LiteratureStats({
  data,
  show,
  size = "lg",
  className,
}: {
  data: LiteratureData;
  show?: StatLabel[];
  size?: "sm" | "lg";
  className?: string;
}) {
  const booksCount =
    data.sections.find((section) => section.id === "books")?.entries.length ?? 0;
  const articleCount =
    data.sections.find((section) => section.id === "articles")?.entries.length ?? 0;

  const allStats: Stat[] = [
    { value: String(data.totalEntries), label: "Entries", href: "#books" },
    { value: String(booksCount), label: "Books", href: "#books" },
    { value: String(articleCount), label: "Articles", href: "#articles" },
  ];

  const stats = show ? allStats.filter((s) => show.includes(s.label)) : allStats;

  return (
    <ul
      role="list"
      className={clsx(
        "grid grid-cols-1",
        stats.length === 1 && "mx-auto w-fit",
        stats.length === 2 ? "gap-7 sm:grid-cols-2 sm:gap-10" : "gap-4",
        stats.length >= 3 && "sm:grid-cols-3",
        className,
      )}
      aria-label="Literature statistics"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} size={size} />
      ))}
    </ul>
  );
}
