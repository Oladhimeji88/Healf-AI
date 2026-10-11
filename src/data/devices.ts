export type ScopeId = "sleep" | "heart" | "activity" | "workouts"

export type Scope = {
  id: ScopeId
  label: string
  detail: string
}

export type Credit = {
  text: string
  url?: string
}

export type Device = {
  id: string
  name: string
  via: string
  note?: string
  image: string
  position?: string
  contain?: boolean
  credit: Credit
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
    image: "devices/apple.jpg",
    credit: {
      text: "fancycrave1, CC0",
      url: "https://commons.wikimedia.org/wiki/File:Apple_Watch-.jpg",
    },
  },
  {
    id: "garmin",
    name: "Garmin",
    via: "Garmin Connect",
    image: "devices/garmin.jpg",
    position: "50% 45%",
    credit: {
      text: "Melyanac, CC0",
      url: "https://commons.wikimedia.org/wiki/File:Garmin_Forerunner_55.jpg",
    },
  },
  {
    id: "oura",
    name: "Oura Ring",
    via: "Oura",
    image: "devices/oura.jpg",
    contain: true,
    credit: { text: "healf.com" },
  },
  {
    id: "whoop",
    name: "Whoop",
    via: "Whoop",
    image: "devices/whoop.jpg",
    credit: { text: "healf.com" },
  },
  {
    id: "fitbit",
    name: "Fitbit",
    via: "Fitbit",
    image: "devices/fitbit.jpg",
    credit: {
      text: "Kārlis Dambrāns, CC BY 2.0",
      url: "https://commons.wikimedia.org/wiki/File:Fitbit_Versa_(44383301630).jpg",
    },
  },
  {
    id: "samsung",
    name: "Galaxy Watch",
    via: "Health Connect",
    note: "Needs the Healf Android app",
    image: "devices/samsung.jpg",
    credit: {
      text: "Dinkun Chen, CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:SAMSUNG_Galaxy_Watch_(3).jpg",
    },
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
