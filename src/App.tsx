import { useState } from "react"
import Collections from "./components/Collections"
import Curation from "./components/Curation"
import FeaturePair from "./components/FeaturePair"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Journal from "./components/Journal"
import Pillars from "./components/Pillars"
import ProductRail from "./components/ProductRail"
import HealfPromise from "./components/HealfPromise"
import { bestSellers, certified, type Product } from "./data/content"

export default function App() {
  const [bag, setBag] = useState<Product[]>([])
  const [announcement, setAnnouncement] = useState("")

  const addToBag = (product: Product) => {
    setBag((items) => [...items, product])
    setAnnouncement(`${product.name} added to bag`)
  }

  return (
    <div className="min-h-dvh bg-white text-black">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-black px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header bagCount={bag.length} />
      <p role="status" className="sr-only">
        {announcement}
      </p>

      <main id="main">
        <Hero />
        <Pillars />
        <Collections />
        <ProductRail title="Best Sellers" products={bestSellers} onAdd={addToBag} />
        <FeaturePair
          features={[
            { image: "d27b6.png", title: "Healf Exclusive", button: "Shop Healf Exclusive" },
            {
              image: "9bd6e.png",
              title: "Healf Bloods",
              text: "Translate your body's data into a personalised wellbeing plan.",
              button: "Start testing",
            },
          ]}
        />
        <ProductRail
          title="Just Certified"
          subtitle={
            <>
              Discover <u>20+ latest products</u> added recently
            </>
          }
          products={certified}
          onAdd={addToBag}
        />
        <FeaturePair
          features={[
            { image: "7808e.png", title: "Tech", button: "Shop collection" },
            { image: "7c3a8.png", title: "Gut Health", button: "Shop collection" },
          ]}
        />
        <Journal />
        <Curation />
        <HealfPromise />
      </main>

      <Footer />
    </div>
  )
}
