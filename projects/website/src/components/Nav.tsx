import * as React from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const LINKS = [
  { href: '#collections', label: 'Collections' },
  { href: '#why', label: 'Why Candela' },
  { href: '#wholesale', label: 'Wholesale' },
]

export function Nav() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile sheet on Escape, and lock scroll while it is open.
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-sand bg-parchment/90 backdrop-blur-md'
          : 'border-b border-transparent'
      )}
    >
      <nav
        className="container-x flex h-16 items-center justify-between px-6"
        aria-label="Primary"
      >
        <a href="#main" className="wordmark text-lg text-espresso">
          cand<span className="macron-e">e</span>la
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-espresso-soft transition-colors hover:text-espresso"
            >
              {l.label}
            </a>
          ))}
          <a href="#inquiry" className={cn(buttonVariants({ variant: 'accent', size: 'sm' }))}>
            Request a line sheet
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 p-2 text-espresso md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-sand bg-parchment px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-espresso"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#inquiry"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: 'accent' }), 'mt-2 w-full')}
            >
              Request a line sheet
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
