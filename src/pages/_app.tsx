import { useEffect, useRef } from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import '@/styles/tailwind.css'
import 'focus-visible'

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }: AppProps) {
  const previousPathname = usePrevious(router.pathname)

  return (
    <>
      <Head>
        <title>Hegel and AI</title>
        <meta property="og:title" content="Hegel and AI" />
        <meta
          property="og:description"
          content="A literature overview on Hegel, artificial intelligence, recognition, dialectic, and AI ethics."
        />
      </Head>

      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-zinc-900 ring-1 ring-zinc-700/60" />
        </div>
      </div>

      <div className="relative">
        <Header />
        <main id="page-top" className="scroll-mt-20">
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  )
}
