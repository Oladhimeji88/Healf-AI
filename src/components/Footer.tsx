import { useState, type FormEvent } from "react"
import { ASSETS, footerColumns } from "../data/content"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail("")
  }

  return (
    <footer className="bg-black px-4 pb-6 pt-16 text-white">
      <div className="mx-auto max-w-[1408px]">
        <div className="grid gap-12 border-b border-white/20 pb-14 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <h2 className="text-2xl font-medium">Learn</h2>
            <p className="mt-3 text-sm">
              Weekly research, new findings and product news from the Healf
              team.
            </p>
            <form
              onSubmit={onSubmit}
              className="mt-6 flex max-w-xl border-b border-white/60 pb-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Your email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-white/50"
              />
              <button type="submit" className="text-sm font-semibold">
                Subscribe
              </button>
            </form>
            <p role="status" className="mt-3 min-h-5 text-sm text-white/70">
              {subscribed && "Thanks for subscribing."}
            </p>
          </div>
          {footerColumns.map(({ heading, links }) => (
            <nav key={heading} aria-label={heading}>
              <h3 className="text-xl">{heading}</h3>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <img
          src={`${ASSETS}/6ade8.svg`}
          alt="Healf"
          loading="lazy"
          className="my-12 w-full invert"
        />
        <div className="flex flex-col justify-between gap-3 text-sm sm:flex-row">
          <p>Copyright © 2026, Healf. All rights reserved.</p>
          <p>EN · GBP</p>
        </div>
        <p className="mt-6 max-w-3xl text-xs leading-5 text-white/50">
          Healf provides wellbeing information and products and is not a
          substitute for professional medical advice, diagnosis or treatment.
          Always speak to a qualified clinician about your health.
        </p>
      </div>
    </footer>
  )
}
