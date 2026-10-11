import { useState } from "react"
import { ASSETS, type Product } from "../../data/content"
import BiomarkersView from "./BiomarkersView"
import Overview from "./Overview"
import PlanView from "./PlanView"

type View = "overview" | "plan" | "biomarkers"

const views: Array<{ id: View label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "plan", label: "My plan" },
  { id: "biomarkers", label: "Biomarkers" },
]

export default function Dashboard({
  plan,
  onRemove,
}: {
  plan: Product[]
  onRemove: (p: Product) => void
}) {
  const [view, setView] = useState<View>("overview")

  return (
    <div className="min-h-dvh bg-canvas text-black">
      <header className="border-b border-black/10 bg-white px-4">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between">
          <a
            href="#/"
            aria-label="Healf home"
            className="w-[105px] sm:w-[130px]"
          >
            <img src={`${ASSETS}/6ade8.svg`} alt="Healf" />
          </a>
          <a href="#/" className="text-sm hover:underline">
            ← Back to site
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 py-8 lg:grid lg:grid-cols-[220px_1fr] lg:gap-10 lg:py-12">
        <nav
          aria-label="Dashboard"
          className="mb-6 flex gap-2 overflow-x-auto lg:mb-0 lg:flex-col lg:gap-1"
        >
          {views.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-current={view === v.id ? "page" : undefined}
              onClick={() => setView(v.id)}
              className={`flex shrink-0 items-center justify-between rounded-full px-5 py-2.5 text-left text-sm transition lg:rounded-xl ${
                view === v.id ? "bg-black text-white" : "hover:bg-black/5"
              }`}
            >
              {v.label}
              {v.id === "plan" && plan.length > 0 && (
                <span
                  className={`ml-3 grid size-5 place-items-center rounded-full text-[11px] ${
                    view === v.id
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {plan.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <main id="main" className="min-w-0">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Dashboard</p>
              <h1 className="mt-2 text-4xl font-light tracking-tight sm:text-5xl">
                {views.find((v) => v.id === view)!.label}
              </h1>
            </div>
            <button type="button" className="btn btn-light">
              Book a re-test
            </button>
          </div>

          {view === "overview" && <Overview plan={plan} onNavigate={setView} />}
          {view === "plan" && <PlanView plan={plan} onRemove={onRemove} />}
          {view === "biomarkers" && <BiomarkersView />}
          <p className="mt-6 text-xs text-black/50">
            Sample data for demonstration. Healf is not a substitute for
            professional medical advice.
          </p>
        </main>
      </div>
    </div>
  )
}
