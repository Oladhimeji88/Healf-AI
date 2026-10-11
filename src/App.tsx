import { useCallback, useState } from "react"
import Bloods from "./components/Bloods"
import FinalCta from "./components/FinalCta"
import Footer from "./components/Footer"
import Framework from "./components/Framework"
import Header from "./components/Header"
import HealfPromise from "./components/HealfPromise"
import Hero from "./components/Hero"
import Journal from "./components/Journal"
import Loop from "./components/Loop"
import Manifesto from "./components/Manifesto"
import Personalise from "./components/Personalise"
import PlanDrawer from "./components/PlanDrawer"
import ProductRail from "./components/ProductRail"
import Standard from "./components/Standard"
import { certified, type Product } from "./data/content"

export default function App() {
  const [plan, setPlan] = useState<Product[]>([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [announcement, setAnnouncement] = useState("")

  const toggle = (product: Product) => {
    const has = plan.some((p) => p.id === product.id)
    setPlan(has ? plan.filter((p) => p.id !== product.id) : [...plan, product])
    setAnnouncement(`${product.name} ${has ? "removed from" : "added to"} plan`)
  }
  const add = (product: Product) => {
    if (!plan.some((p) => p.id === product.id)) toggle(product)
  }
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  return (
    <div className="min-h-dvh bg-white text-black">
      <a
        href="#main"
        className="sr-only z-[80] rounded-full bg-black px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header planCount={plan.length} onOpenPlan={() => setDrawerOpen(true)} />
      <p role="status" className="sr-only">{announcement}</p>

      <main id="main">
        <Hero />
        <Manifesto />
        <Framework />
        <Loop />
        <Personalise plan={plan} onToggle={toggle} />
        <Bloods />
        <Standard />
        <div id="marketplace">
          <ProductRail
            title="Certified by Healf"
            subtitle="The Marketplace: every product has passed The Healf Standard."
            products={certified}
            onAdd={add}
          />
        </div>
        <div id="journal">
          <Journal />
        </div>
        <HealfPromise />
        <FinalCta />
      </main>

      <Footer />
      <PlanDrawer open={drawerOpen} onClose={closeDrawer} plan={plan} onRemove={toggle} />
    </div>
  )
}
