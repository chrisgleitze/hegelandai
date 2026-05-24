import Link from 'next/link'
import Image from 'next/image'

import { Container } from '@/components/Container'
import { useScrollProgress } from '@/lib/useScrollProgress'

export function Header() {
  const portraitProgress = useScrollProgress(16, 180)
  const eyeStripWidth = portraitProgress * 124

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
              className="mr-0 flex h-9 shrink-0 items-center overflow-hidden transition-[margin] duration-200 ease-out"
              style={{
                marginRight: `${portraitProgress * 12}px`,
                width: `${eyeStripWidth}px`,
              }}
            >
              <span
                className="relative block h-5 w-[124px] overflow-hidden rounded-full shadow-md shadow-black/30 ring-1 ring-white/10"
                style={{
                  opacity: portraitProgress,
                  transform: `translate3d(${
                    (1 - portraitProgress) * -16
                  }px, 0, 0) scale(${0.96 + portraitProgress * 0.04})`,
                  transformOrigin: 'left center',
                }}
              >
                <Image
                  src="/images/hegel-profile.jpg"
                  alt=""
                  fill
                  sizes="124px"
                  unoptimized
                  className="object-cover"
                  style={{
                    objectPosition: `50% ${47 - portraitProgress * 3}%`,
                    transform: `scale(${1.7 + portraitProgress * 0.2})`,
                    transformOrigin: '30% 50%',
                  }}
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
