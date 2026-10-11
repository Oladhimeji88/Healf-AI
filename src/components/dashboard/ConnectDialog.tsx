import { useEffect, useRef, useState } from "react"
import DeviceArt from "./DeviceArt"
import { scopes, type Device, type ScopeId } from "../../data/devices"

type Props = {
  device: Device
  onCancel: () => void
  onAllow: (granted: ScopeId[]) => void
}

export default function ConnectDialog({ device, onCancel, onAllow }: Props) {
  const [granted, setGranted] = useState<ScopeId[]>(scopes.map((s) => s.id))
  const allowRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    allowRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onCancel()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onCancel])

  const toggle = (id: ScopeId) =>
    setGranted((g) => (g.includes(id) ? g.filter((x) => x !== id) : [...g, id]))

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-end bg-black/40 sm:place-items-center"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="connect-h"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[28px] bg-white p-6 sm:rounded-[28px] sm:p-8"
      >
        <div className="mb-5 grid h-28 place-items-center rounded-2xl bg-canvas">
          <DeviceArt
            kind={device.art}
            strap={device.strap}
            accent={device.accent}
            knurled={device.knurled}
            className="h-24"
          />
        </div>
        <p className="eyebrow">Connect {device.name}</p>
        <h2
          id="connect-h"
          className="mt-2 text-2xl font-light tracking-tight sm:text-3xl"
        >
          Choose what Healf can read.
        </h2>
        <p className="mt-3 leading-7 text-black/65">
          We use this only to personalise your plan. You can change it or
          disconnect at any time.
        </p>

        <ul className="mt-5 divide-y divide-black/10 border-y border-black/10">
          {scopes.map((s) => (
            <li key={s.id}>
              <label className="flex cursor-pointer items-start gap-4 py-4">
                <input
                  type="checkbox"
                  checked={granted.includes(s.id)}
                  onChange={() => toggle(s.id)}
                  className="mt-1 size-4 shrink-0 accent-black"
                />
                <span>
                  <span className="block">{s.label}</span>
                  <span className="block text-sm text-black/55">
                    {s.detail}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>

        {device.note && (
          <p className="mt-4 text-sm text-black/60">{device.note}.</p>
        )}
        <p className="mt-4 text-xs leading-5 text-black/50">
          Prototype: this is a simulated connection. No data is read from any
          device.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            ref={allowRef}
            type="button"
            disabled={granted.length === 0}
            onClick={() => onAllow(granted)}
            className="btn btn-dark disabled:opacity-40"
          >
            Allow and connect
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="text-sm underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
