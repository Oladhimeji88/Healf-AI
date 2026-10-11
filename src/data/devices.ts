export type ScopeId = "sleep" | "heart" | "activity" | "workouts"

export type Scope = {
  id: ScopeId
  label: string
  detail: string
}

import type { ArtKind } from "../components/dashboard/DeviceArt"

export type Device = {
  id: string
  name: string
  via: string
  note?: string
  art: ArtKind
  strap: string
  accent?: string
  knurled?: boolean
}

export const scopes: Scope[] = [
  {
    id: "sleep",
    label: "Sleep",
    detail: "Duration, regularity, deep and REM stages",
  },
  {
    id: "heart",
    label: "Heart rate and HRV",
    detail: "Resting heart rate and overnight variability",
  },
  { id: "activity", label: "Daily activity", detail: "Steps and active days" },
  { id: "workouts", label: "Workouts", detail: "Type, duration and intensity" },
]

export const devices: Device[] = [
  {
    id: "apple",
    name: "Apple Watch",
    via: "Apple Health",
    note: "Needs the Healf iPhone app",
    art: "square",
    strap: "#3a3a3f",
  },
  {
    id: "garmin",
    name: "Garmin",
    via: "Garmin Connect",
    art: "round",
    strap: "#4d6b4a",
    accent: "#6f9d6a",
  },
  { id: "oura", name: "Oura Ring", via: "Oura", art: "ring", strap: "#000" },
  {
    id: "whoop",
    name: "Whoop",
    via: "Whoop",
    art: "band",
    strap: "#26262b",
    accent: "#d9825b",
  },
  {
    id: "fitbit",
    name: "Fitbit",
    via: "Fitbit",
    art: "tracker",
    strap: "#4a6a9c",
    accent: "#8c85c7",
  },
  {
    id: "samsung",
    name: "Galaxy Watch",
    via: "Health Connect",
    note: "Needs the Healf Android app",
    art: "round",
    strap: "#8c85c7",
    accent: "#d9825b",
    knurled: true,
  },
]

export type DeviceState = {
  scopes: ScopeId[]
  syncedAt: number
}

export function timeAgo(ms: number) {
  const mins = Math.floor((Date.now() - ms) / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  return `${hrs} hr ago`
}
