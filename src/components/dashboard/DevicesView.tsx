import { useEffect, useState } from "react"
import { ASSETS } from "../../data/content"
import {
  devices,
  scopes,
  timeAgo,
  type Device,
  type ScopeId,
} from "../../data/devices"
import type { Persona } from "../../hooks/usePersona"
import ConnectDialog from "./ConnectDialog"

type Connecting = {
  device: Device
  granted: ScopeId[]
  step: number
}

const stepsFor = (d: Device) => [
  `Opening ${d.via}…`,
  "Waiting for your permission…",
  "Syncing the last 30 days…",
]

export default function DevicesView({ me }: { me: Persona }) {
  const [pending, setPending] = useState<Device | null>(null)
  const [connecting, setConnecting] = useState<Connecting | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const connectedCount = Object.keys(me.devices).length

  useEffect(() => {
    if (!connecting) return
    const steps = stepsFor(connecting.device)
    if (connecting.step >= steps.length) {
      me.update({
        devices: {
          ...me.devices,
          [connecting.device.id]: {
            scopes: connecting.granted,
            syncedAt: Date.now(),
          },
        },
      })
      setConnecting(null)
      return
    }
    const t = setTimeout(
      () => setConnecting((c) => (c ? { ...c, step: c.step + 1 } : c)),
      750,
    )
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connecting])

  const disconnect = (id: string) => {
    const rest = { ...me.devices }
    delete rest[id]
    me.update({ devices: rest })
    setConfirmId(null)
  }

  const sync = (id: string) =>
    me.update({
      devices: {
        ...me.devices,
        [id]: { ...me.devices[id], syncedAt: Date.now() },
      },
    })

  return (
    <div>
      <p className="max-w-2xl text-lg leading-8 text-black/65">
        Connect a watch or ring and your sleep, heart rate and activity will
        sharpen your Healf Score and your daily step.{" "}
        {connectedCount === 0
          ? "Nothing is connected yet."
          : `${connectedCount} connected.`}
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {devices.map((d) => {
          const state = me.devices[d.id]
          const isConnecting = connecting?.device.id === d.id
          return (
            <li
              key={d.id}
              className="flex flex-col rounded-[24px] bg-white p-6"
            >
              <div
                className={`aspect-[5/3] overflow-hidden rounded-2xl ${
                  d.contain ? "bg-[#f5f5f5]" : "bg-canvas"
                }`}
              >
                <img
                  src={`${ASSETS}/${d.image}`}
                  alt={`${d.name}`}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: d.position }}
                  className={`size-full ${
                    d.contain ? "scale-[1.35] object-contain" : "object-cover"
                  }`}
                />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-light">{d.name}</h3>
                  <p className="text-sm text-black/55">via {d.via}</p>
                </div>
                {state && (
                  <span className="flex items-center gap-2 text-xs">
                    <span
                      className="size-2 rounded-full bg-[#4f8a5b]"
                      aria-hidden="true"
                    />
                    Connected
                  </span>
                )}
              </div>

              {isConnecting && connecting && (
                <div className="mt-5" role="status" aria-live="polite">
                  <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
                    <div
                      className="h-full rounded-full bg-black transition-[width] duration-700"
                      style={{
                        width: `${((connecting.step + 1) / (stepsFor(d).length + 1)) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-black/65">
                    {
                      stepsFor(d)[
                        Math.min(connecting.step, stepsFor(d).length - 1)
                      ]
                    }
                  </p>
                </div>
              )}

              {state && !isConnecting && (
                <div className="mt-5">
                  <p className="text-sm text-black/60" aria-live="polite">
                    Last synced {timeAgo(state.syncedAt)}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {state.scopes.map((id) => (
                      <li
                        key={id}
                        className="rounded-full bg-canvas px-3 py-1 text-xs"
                      >
                        {scopes.find((s) => s.id === id)?.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                {!state && !isConnecting && (
                  <button
                    type="button"
                    onClick={() => setPending(d)}
                    disabled={Boolean(connecting)}
                    className="btn btn-dark disabled:opacity-40"
                  >
                    Connect
                  </button>
                )}
                {state && (
                  <>
                    <button
                      type="button"
                      onClick={() => sync(d.id)}
                      className="btn btn-light"
                    >
                      Sync now
                    </button>
                    {confirmId === d.id ? (
                      <span
                        className="flex items-center gap-3 text-sm"
                        role="alert"
                      >
                        Disconnect {d.name}?
                        <button
                          type="button"
                          onClick={() => disconnect(d.id)}
                          className="underline"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmId(null)}
                          className="underline"
                        >
                          Keep
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmId(d.id)}
                        className="text-sm underline"
                      >
                        Disconnect
                      </button>
                    )}
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      <p className="mt-6 max-w-3xl text-xs leading-5 text-black/50">
        Photos:{" "}
        {devices.map((d, i) => (
          <span key={d.id}>
            {i > 0 && " · "}
            {d.name}{" "}
            {d.credit.url ? (
              <a
                href={d.credit.url}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {d.credit.text}
              </a>
            ) : (
              d.credit.text
            )}
          </span>
        ))}
        . Photos show example models and are not official Healf imagery.
      </p>
      <p className="mt-6 max-w-2xl text-xs leading-5 text-black/50">
        Prototype: connections are simulated and no data is read from any
        device. A real version would link through Apple Health, Health Connect
        or a provider such as Terra, with explicit consent and the right to
        delete your data.
      </p>

      {pending && (
        <ConnectDialog
          device={pending}
          onCancel={() => setPending(null)}
          onAllow={(granted) => {
            setConnecting({ device: pending, granted, step: 0 })
            setPending(null)
          }}
        />
      )}
    </div>
  )
}
