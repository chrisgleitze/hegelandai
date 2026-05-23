import Link from 'next/link'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { useScrollProgress } from '@/lib/useScrollProgress'

export function Header() {
  const portraitProgress = useScrollProgress()

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/90 py-3.5 backdrop-blur">
      <Container>
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center text-sm font-semibold text-zinc-100 transition hover:text-teal-400"
          >
            <span
              aria-hidden="true"
              className="block h-9 shrink-0 overflow-hidden"
              style={{ width: `${portraitProgress * 48}px` }}
            >
              <span
                className="relative block h-9 w-9 overflow-hidden rounded-full shadow-md shadow-black/30 ring-1 ring-white/10"
                style={{
                  opacity: portraitProgress,
                  transform: `scale(${0.72 + portraitProgress * 0.28})`,
                  transformOrigin: 'left center',
                }}
              >
                <Image
                  src="/images/hegel-profile.jpg"
                  alt=""
                  fill
                  sizes="36px"
                  unoptimized
                  className="object-cover"
                />
              </span>
            </span>
            Hegel and AI
          </Link>
        </div>
      </Container>
    </header>
  )
}
