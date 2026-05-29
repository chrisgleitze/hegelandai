import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full antialiased dark" lang="en">
      <Head />
      <body className="flex h-full flex-col bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
