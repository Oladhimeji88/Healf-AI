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
import { certified } from "./data/content"
import Dashboard from "./components/dashboard/Dashboard"
import useHashRoute from "./hooks/useHashRoute"
import usePlan from "./hooks/usePlan"

export default function App() {
  const { plan, has, add, toggle, announcement } = usePlan()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const route = useHashRoute()
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  if (route === "dashboard") return <Dashboard plan={plan} onRemove={toggle} />

  return (
    <div className="min-h-dvh bg-white text-black">
      <a
        href="#main"
        className="sr-only z-[80] rounded-full bg-black px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header planCount={plan.length} onOpenPlan={() => setDrawerOpen(true)} />
      <p role="status" className="sr-only">
        {announcement}
      </p>

      <main id="main">
        <Hero />
        <Manifesto />
        <Framework />
        <Loop />
        <Personalise has={has} onToggle={toggle} />
        <Bloods />
        <Standard />
        <ProductRail
          id="marketplace"
          title="Certified by Healf"
          subtitle="The Marketplace: every product has passed The Healf Standard."
          products={certified}
          onAdd={add}
        />
        <Journal />
        <HealfPromise />
        <FinalCta />
      </main>

      <Footer />
      <PlanDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        plan={plan}
        onRemove={toggle}
      />
    </div>
  )
}
