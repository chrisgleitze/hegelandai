import Link from 'next/link'

import { Container } from '@/components/Container'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-950/85 py-4 backdrop-blur">
      <Container>
        <div className="flex items-center">
          <Link
            href="/"
            className="text-sm font-semibold text-zinc-100 transition hover:text-teal-400"
          >
            Hegel and AI
          </Link>
        </div>
      </Container>
    </header>
  )
}
