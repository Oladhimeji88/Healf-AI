import type { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { dark?: boolean }

export default function PillButton({ dark = false, className = "", ...props }: Props) {
  return (
    <button
      type="button"
      className={`rounded-full px-4 py-2.5 text-sm transition hover:scale-[1.02] ${
        dark ? "bg-black text-white" : "bg-white text-black"
      } ${className}`}
      {...props}
    />
  )
}
