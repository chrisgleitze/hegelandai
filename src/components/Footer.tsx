import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Container } from "@/components/Container";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <footer id="page-bottom" className="mt-32 scroll-mt-28">
      <Container.Outer>
        <Container.Inner>
          <div className="mb-8 flex justify-center">
            <a
              href="#page-top"
              aria-label="Jump to top of page"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700/40 bg-zinc-800/60 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-teal-400/40 hover:text-teal-300"
            >
              <span>Top of Page</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </Container.Inner>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((open) => !open)}
                  aria-label="Menü umschalten"
                  className="flex items-center text-zinc-800 dark:text-zinc-200"
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>

              <div
                className={`${
                  isMenuOpen ? "flex" : "hidden"
                } flex-col items-center gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200 sm:flex sm:flex-row`}
              >
                <NavLink href="/">Hegel and AI</NavLink>
                <NavLink href="/datenschutz">Datenschutzerklärung</NavLink>
                <NavLink href="/impressum">Impressum</NavLink>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} Christian Gleitze
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
