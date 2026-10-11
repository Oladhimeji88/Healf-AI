import { useEffect, useRef } from "react"
import { formatPrice, type Product } from "../data/content"
import ProductRow from "./ProductRow"

type Props = {
  open: boolean
  onClose: () => void
  plan: Product[]
  onRemove: (product: Product) => void
}

export default function PlanDrawer({ open, onClose, plan, onRemove }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const total = plan.reduce((sum, p) => sum + p.price, 0)

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your plan"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-light">Your plan</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close plan"
            className="grid size-9 place-items-center rounded-full border border-black/20 text-lg"
          >
            ×
          </button>
        </div>
        {plan.length === 0 ? (
          <p className="mt-10 text-black/60">
            Nothing here yet. Choose a goal and add what your data supports.
          </p>
        ) : (
          <ul className="mt-6 flex-1 divide-y divide-black/10 overflow-y-auto">
            {plan.map((p) => (
              <li key={p.id} className="py-4">
                <ProductRow
                  product={p}
                  action={
                    <button
                      type="button"
                      onClick={() => onRemove(p)}
                      aria-label={`Remove ${p.name}`}
                      className="text-sm underline"
                    >
                      Remove
                    </button>
                  }
                />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto border-t border-black/10 pt-5">
          <div className="flex justify-between text-lg">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatPrice(total)}</span>
          </div>
          <button
            type="button"
            disabled={plan.length === 0}
            className="btn btn-dark mt-4 w-full disabled:opacity-40"
          >
            Continue
          </button>
          <p className="mt-3 text-xs text-black/50">
            Prototype: checkout isn't connected.
          </p>
        </div>
      </aside>
    </div>
  )
}
