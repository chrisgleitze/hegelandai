import Head from "next/head";
import type { AppProps } from "next/app";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import "@/styles/tailwind.css";
import "focus-visible";

const siteDescription =
  "A platform for all things Hegel and AI - literature and more at the intersection of GWF Hegel's philosophy and Artificial Intelligence.";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hegel and AI</title>
        <link rel="icon" type="image/jpeg" href="/images/hegel-profile.jpg" />
        <meta property="og:title" content="Hegel and AI" key="og:title" />
        <meta
          property="og:description"
          content={siteDescription}
          key="og:description"
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
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
