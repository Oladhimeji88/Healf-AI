import { formatPrice, type Product } from "../../data/content"
import ProductRow from "../ProductRow"
import type { DashboardView } from "./types"

type Props = {
  plan: Product[]
  onRemove: (p: Product) => void
  onNavigate: (view: DashboardView) => void
}

export default function PlanView({ plan, onRemove, onNavigate }: Props) {
  const total = plan.reduce((sum, p) => sum + p.price, 0)

  if (plan.length === 0) {
    return (
      <div className="rounded-[24px] bg-white p-8 text-center sm:p-12">
        <h2 className="text-2xl font-light">Your plan is empty</h2>
        <p className="mx-auto mt-3 max-w-md text-black/60">
          Choose a goal and add the products your data supports. They'll show up
          here.
        </p>
        <a href="#plan" className="btn btn-dark mt-6">
          Build my plan
        </a>
      </div>
    )
  }

  return (
    <div className="rounded-[24px] bg-white p-5 sm:p-8">
      <ul className="divide-y divide-black/10">
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
      <div className="mt-2 flex items-center justify-between border-t border-black/10 pt-5 text-lg">
        <span>Subtotal</span>
        <span className="tabular-nums">{formatPrice(total)}</span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-canvas p-4 text-sm">
        <span>
          Never run out. Get this plan delivered every 4 to 12 weeks with
          membership.
        </span>
        <button
          type="button"
          onClick={() => onNavigate("membership")}
          className="underline"
        >
          Make it a membership
        </button>
      </div>
      <p className="mt-3 text-xs text-black/50">
        Prototype: checkout isn't connected.
      </p>
    </div>
  )
}
