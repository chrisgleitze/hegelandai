import { useEffect, useState } from "react";

const STATS_URL = "https://visitor-counter.christian-gleitze.workers.dev";

type SiteKey = "kantandai" | "hegelandai";

type VisitorStats = {
  pageViews: number;
  uniqueVisitors: number;
  startDate: string;
};

export function useVisitorStats(site: SiteKey) {
  const [stats, setStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    let isCancelled = false;

    fetch(`${STATS_URL}?site=${encodeURIComponent(site)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const pageViews = Number(data?.totalViews);
        const uniqueVisitors = Number(data?.uniqueVisitors);
        const startDate = String(data?.startDate || "");

        if (!isCancelled) {
          setStats(
            Number.isFinite(pageViews) && Number.isFinite(uniqueVisitors) && startDate
              ? { pageViews, uniqueVisitors, startDate }
              : null,
          );
        }
      })
      .catch(() => {});

    return () => {
      isCancelled = true;
    };
  }, [site]);

  return stats;
}
