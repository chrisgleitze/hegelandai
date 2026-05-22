import { useEffect, useState } from 'react'

import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { LiteratureOverview } from '@/components/LiteratureOverview'
import type { LiteratureData } from '@/lib/literature'

type HomeProps = {
  data: LiteratureData
}

function Hero() {
  return (
    <Container className="mt-16 sm:mt-24">
      <div className="flex max-w-3xl items-center justify-between gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Hegel and AI
        </h1>
        <Image
          src="/images/hegel-profile.jpg"
          alt="Porträt von Georg Wilhelm Friedrich Hegel"
          width={128}
          height={128}
          priority
          className="h-20 w-20 shrink-0 rounded-full object-cover shadow-lg shadow-zinc-800/10 ring-1 ring-zinc-900/10 dark:ring-white/10 sm:h-28 sm:w-28"
        />
      </div>
    </Container>
  )
}

export default function Home({
  data: initialData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    let isMounted = true

    async function refreshLiterature() {
      try {
        const response = await fetch('/api/literature', { cache: 'no-store' })
        if (!response.ok) return

        const payload = (await response.json()) as { data: LiteratureData }
        if (isMounted) {
          setData(payload.data)
        }
      } catch {
        // Keep the previous data while the dev server recompiles.
      }
    }

    const interval = window.setInterval(refreshLiterature, 1200)
    return () => {
      isMounted = false
      window.clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Hegel and AI</title>
        <meta
          name="description"
          content="A literature overview on Hegel, artificial intelligence, recognition, dialectic, and AI ethics."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Hero />
      <LiteratureOverview data={data} />
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { getLiteratureData } = await import('@/lib/literature')
  const data = getLiteratureData()

  return {
    props: {
      data,
    },
  }
}
