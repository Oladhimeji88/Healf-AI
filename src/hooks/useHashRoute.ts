import { useEffect, useState } from "react"

export type Route = "home" | "dashboard" | "start"

const read = (): Route =>
  window.location.hash.startsWith("#/dashboard") ? "dashboard" : "home"

export default function useHashRoute() {
  const [route, setRoute] = useState<Route>(read)

  useEffect(() => {
    const onChange = () => {
      const next = read()
      setRoute(next)
      // Let the new view mount, then honour in-page anchors (#plan) or reset to the top.
      requestAnimationFrame(() => {
        const id = window.location.hash.slice(1)
        const target =
          next === "home" && id && !id.startsWith("/")
            ? document.getElementById(id)
            : null
        if (target) target.scrollIntoView()
        else window.scrollTo(0, 0)
      })
    }
    window.addEventListener("hashchange", onChange)
    return () => window.removeEventListener("hashchange", onChange)
  }, [])

  return route
}
