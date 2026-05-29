import { useEffect, useState } from "react";

import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";

import { Container } from "@/components/Container";
import { LiteratureOverview } from "@/components/LiteratureOverview";
import type { LiteratureData } from "@/lib/literature";
import { useScrollProgress } from "@/lib/useScrollProgress";

type HomeProps = {
  data: LiteratureData;
};

const SITE = {
  name: "Hegel and AI",
  url: "https://hegelandai.com/",
  description:
    "A platform for all things Hegel and AI - literature and more at the intersection of GWF Hegel's philosophy and Artificial Intelligence.",
  image: "https://hegelandai.com/images/hegel-profile.jpg",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://hegelandai.com/#website",
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: {
        "@id": "https://www.christiangleitze.com/#person",
      },
    },
    {
      "@type": "CollectionPage",
      "@id": "https://hegelandai.com/#webpage",
      url: SITE.url,
      name: "Hegel and AI Literature",
      description: SITE.description,
      inLanguage: "en",
      isPartOf: {
        "@id": "https://hegelandai.com/#website",
      },
      about: [
        {
          "@type": "Thing",
          name: "Georg Wilhelm Friedrich Hegel",
          sameAs: "https://www.wikidata.org/wiki/Q9317",
        },
        {
          "@type": "Thing",
          name: "Artificial intelligence",
          sameAs: "https://www.wikidata.org/wiki/Q11660",
        },
        {
          "@type": "Thing",
          name: "Hegelian philosophy",
        },
      ],
      author: {
        "@id": "https://www.christiangleitze.com/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://www.christiangleitze.com/#person",
      name: "Christian Gleitze",
      url: "https://www.christiangleitze.com",
    },
  ],
};

function Hero() {
  const portraitProgress = useScrollProgress();

  return (
    <Container className="mt-16 sm:mt-24">
      <div className="flex max-w-3xl items-center justify-between gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Hegel and AI
        </h1>
        <Image
          src="/images/hegel-profile.jpg"
          alt="Porträt von Georg Wilhelm Friedrich Hegel"
          width={192}
          height={192}
          priority
          unoptimized
          style={{
            opacity: 1 - portraitProgress * 0.45,
            transform: `translate3d(0, ${portraitProgress * -28}px, 0) scale(${
              1 - portraitProgress * 0.34
            })`,
            transformOrigin: "top right",
          }}
          className="h-32 w-32 shrink-0 rounded-full object-cover shadow-lg shadow-zinc-800/10 ring-1 ring-white/10 transition-[box-shadow,opacity,transform] duration-200 ease-out hover:-translate-y-px hover:ring-teal-400/30 sm:h-48 sm:w-48"
        />
      </div>
      <p className="mt-16 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
        Hegel and AI is a curated research guide to scholarship connecting
        Hegelian philosophy with artificial intelligence. It maps both direct
        Hegel-and-AI publications and adjacent work in philosophy of technology,
        political economy, and digital subjectivity.
      </p>
    </Container>
  );
}

export default function Home({
  data: initialData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let isMounted = true;

    async function refreshLiterature() {
      try {
        const response = await fetch("/api/literature", { cache: "no-store" });
        if (!response.ok) return;

        const payload = (await response.json()) as { data: LiteratureData };
        if (isMounted) {
          setData(payload.data);
        }
      } catch {
        // Keep the previous data while the dev server recompiles.
      }
    }

    const interval = window.setInterval(refreshLiterature, 1200);
    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Hegel and AI</title>
        <meta name="description" content={SITE.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE.url} key="canonical" />
        <meta property="og:url" content={SITE.url} key="og:url" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content={SITE.name} key="og:title" />
        <meta
          property="og:description"
          content={SITE.description}
          key="og:description"
        />
        <meta property="og:image" content={SITE.image} key="og:image" />
        <meta property="og:site_name" content={SITE.name} key="og:site_name" />
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        />
        <meta name="twitter:title" content={SITE.name} key="twitter:title" />
        <meta
          name="twitter:description"
          content={SITE.description}
          key="twitter:description"
        />
        <meta name="twitter:image" content={SITE.image} key="twitter:image" />
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Hero />
      <LiteratureOverview data={data} />
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { getLiteratureData } = await import("@/lib/literature");
  const data = getLiteratureData();

  return {
    props: {
      data,
    },
  };
};
