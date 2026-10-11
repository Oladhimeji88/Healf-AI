export type ScopeId = "sleep" | "heart" | "activity" | "workouts"

export type Scope = {
  id: ScopeId
  label: string
  detail: string
}

export type Device = {
  id: string
  name: string
  via: string
  note?: string
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
  },
  { id: "garmin", name: "Garmin", via: "Garmin Connect" },
  { id: "oura", name: "Oura Ring", via: "Oura" },
  { id: "whoop", name: "Whoop", via: "Whoop" },
  { id: "fitbit", name: "Fitbit", via: "Fitbit" },
  {
    id: "samsung",
    name: "Galaxy Watch",
    via: "Health Connect",
    note: "Needs the Healf Android app",
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
