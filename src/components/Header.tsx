import { useEffect, useState } from "react"
import { ASSETS, NAV_ITEMS } from "../data/content"

export default function Header({
  planCount,
  onOpenPlan,
}: {
  planCount: number
  onOpenPlan: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white px-4">
      <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close shop menu" : "Open shop menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="mr-4 grid size-8 place-items-center lg:hidden"
          >
            <img src={`${ASSETS}/53c84.svg`} alt="" className="size-6" />
          </button>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm lg:flex"
          >
            {NAV_ITEMS.map((item) => (
              <a href={item.href} className="hover:underline" key={item.label}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <a
          href="#"
          aria-label="Healf home"
          className="absolute left-1/2 w-[105px] -translate-x-1/2 sm:w-[130px]"
        >
          <img src={`${ASSETS}/6ade8.svg`} alt="Healf" />
        </a>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden text-sm hover:underline sm:inline">
            Sign in
          </a>
          <button
            type="button"
            onClick={onOpenPlan}
            aria-label={`Your plan, ${planCount} ${
              planCount === 1 ? "item" : "items"
            }`}
            className="flex h-10 items-center gap-2 rounded-full border border-black/20 px-4 text-sm transition hover:border-black"
          >
            Plan
            {planCount > 0 && (
              <span
                aria-hidden="true"
                className="grid size-5 place-items-center rounded-full bg-black text-[11px] text-white"
              >
                {planCount}
              </span>
            )}
          </button>
          <a
            href="#/dashboard"
            className="btn btn-dark hidden !py-2.5 sm:inline-flex"
          >
            Get started
          </a>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="grid gap-3 border-t border-black/10 py-5 text-xl lg:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <a
              href={item.href}
              onClick={() => setMenuOpen(false)}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
          <a href="#/dashboard" className="btn btn-dark mt-2 w-fit">
            Get started
          </a>
        </nav>
      )}
    </header>
  )
}
