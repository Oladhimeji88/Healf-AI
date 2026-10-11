import { useState } from "react"
import type { Product } from "../data/content"

export default function usePlan() {
  const [plan, setPlan] = useState<Product[]>([])
  const [announcement, setAnnouncement] = useState("")

  const has = (id: string) => plan.some((p) => p.id === id)

  const toggle = (product: Product) => {
    const removing = has(product.id)
    setPlan(
      removing ? plan.filter((p) => p.id !== product.id) : [...plan, product],
    )
    setAnnouncement(
      `${product.name} ${removing ? "removed from" : "added to"} plan`,
    )
  }

  const add = (product: Product) => {
    if (!has(product.id)) toggle(product)
  }

  return { plan, has, add, toggle, announcement }
}
