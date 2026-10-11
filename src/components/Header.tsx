import { useEffect, useState } from "react"
import { ASSETS, NAV_ITEMS } from "../data/content"

export default function Header({ bagCount }: { bagCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 px-4 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close shop menu" : "Open shop menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="mr-4 grid size-8 place-items-center md:hidden"
          >
            <img src={`${ASSETS}/53c84.svg`} alt="" className="size-6" />
          </button>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm md:flex"
          >
            {NAV_ITEMS.map((item) => (
              <a href="#" className="hover:underline" key={item}>
                {item}
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
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="hidden h-10 w-[300px] items-center rounded-full border border-black px-4 lg:flex"
          >
            <input
              type="search"
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search all products"
              aria-label="Search all products"
            />
            <button type="submit" aria-label="Search">
              <img src={`${ASSETS}/33858.svg`} alt="" className="size-5" />
            </button>
          </form>
          <button
            type="button"
            aria-label="Account"
            className="hidden size-6 place-items-center rounded-full border border-black sm:grid"
          >
            <img src={`${ASSETS}/55879.svg`} alt="" className="size-4" />
          </button>
          <button
            type="button"
            aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? "item" : "items"}`}
            className="relative"
          >
            <img src={`${ASSETS}/c4c1c.svg`} alt="" className="size-5" />
            {bagCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-black text-[10px] text-white"
              >
                {bagCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="grid gap-3 border-t border-black/10 py-5 text-xl md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <a href="#" onClick={() => setMenuOpen(false)} key={item}>
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
