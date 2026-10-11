export type PillarId = "eat" | "move" | "mind" | "sleep"

export const PILLAR_ORDER: PillarId[] = ["eat", "move", "mind", "sleep"]

export const PILLAR_COLORS: Record<PillarId, string> = {
  eat: "var(--color-eat)",
  move: "var(--color-move)",
  mind: "var(--color-mind)",
  sleep: "var(--color-sleep)",
}

export type Pillar = {
  id: PillarId
  label: string
  image: string
  definition: string
  signals: string[]
  levers: string[]
}

export const pillars: Pillar[] = [
  {
    id: "eat",
    label: "EAT",
    image: "9c99b.png",
    definition:
      "Nutritional status, not just nutrition. How well your body is actually fuelled, absorbing and repairing.",
    signals: ["Vitamin D", "Ferritin", "Omega-3 Index", "HbA1c", "Gut markers"],
    levers: [
      "Protein & fibre targets",
      "Targeted supplementation",
      "Hydration & electrolytes",
    ],
  },
  {
    id: "move",
    label: "MOVE",
    image: "f1416.png",
    definition:
      "The capacity of your body to do work and recover from it, across strength, aerobic base and mobility.",
    signals: ["Resting heart rate", "HRV", "Daily activity", "Recovery load"],
    levers: [
      "Zone 2 base building",
      "Progressive strength",
      "Recovery protocols",
    ],
  },
  {
    id: "mind",
    label: "MIND",
    image: "1de3b.png",
    definition:
      "Stress resilience, focus and mood: how steadily your nervous system holds under real life.",
    signals: [
      "Stress load",
      "Focus windows",
      "Mood check-ins",
      "Cortisol rhythm",
    ],
    levers: [
      "Breath & nervous system work",
      "Deep-work scheduling",
      "Evidence-led adaptogens",
    ],
  },
  {
    id: "sleep",
    label: "SLEEP",
    image: "88616.png",
    definition:
      "The foundation the other three depend on. Duration, regularity and the quality of deep and REM sleep.",
    signals: ["Sleep duration", "Regularity", "Deep & REM", "Overnight HRV"],
    levers: [
      "Light & timing",
      "Temperature & environment",
      "Magnesium & wind-down rituals",
    ],
  },
]

export type Scores = Record<PillarId, number>

export type Goal = {
  id: string
  label: string
  insight: string
  scores: Scores
  protocol: Record<PillarId, string>
  tests: string[]
  productIds: string[]
}

export const goals: Goal[] = [
  {
    id: "energy",
    label: "More energy",
    insight:
      "Afternoon fatigue usually has a measurable cause. Low iron stores, unstable blood sugar and poor sleep regularity are the usual three.",
    scores: { eat: 58, move: 66, mind: 61, sleep: 52 },
    protocol: {
      eat: "Front-load protein and electrolytes before 10am.",
      move: "Two 30-minute zone 2 sessions a week to build aerobic base.",
      mind: "A 5-minute breathing reset at the 3pm dip.",
      sleep: "Fix your wake time first. Regularity beats duration.",
    },
    tests: ["Ferritin", "Vitamin B12", "HbA1c", "TSH"],
    productIds: ["artah-core", "lmnt-variety"],
  },
  {
    id: "sleep",
    label: "Deeper sleep",
    insight:
      "Most sleep problems are timing and environment problems. We start with your rhythm before reaching for anything else.",
    scores: { eat: 70, move: 64, mind: 55, sleep: 41 },
    protocol: {
      eat: "Finish eating 3 hours before bed; keep caffeine before noon.",
      move: "Morning light and movement to anchor your body clock.",
      mind: "A 10-minute wind-down: no screens, low light, slow breathing.",
      sleep: "Cool room (16–18°C) and a consistent lights-out window.",
    },
    tests: ["Magnesium", "Cortisol rhythm", "Vitamin D", "Ferritin"],
    productIds: ["pulse-ring", "artah-core"],
  },
  {
    id: "focus",
    label: "Sharper focus",
    insight:
      "Focus is a function of sleep, glucose stability and stress load. Supplements only matter once those are in range.",
    scores: { eat: 63, move: 59, mind: 48, sleep: 66 },
    protocol: {
      eat: "Stable blood sugar: protein-led breakfast, no fasted caffeine.",
      move: "A 10-minute walk between deep-work blocks.",
      mind: "Two 90-minute focus windows, notifications off.",
      sleep: "Protect the last 90 minutes of sleep. REM drives clarity.",
    },
    tests: ["Omega-3 Index", "Vitamin B12", "HbA1c", "Homocysteine"],
    productIds: ["lmnt-variety", "artah-core"],
  },
  {
    id: "ageing",
    label: "Healthy ageing",
    insight:
      "Healthspan is built early and quietly. Inflammation, metabolic health and muscle mass are the markers that compound.",
    scores: { eat: 72, move: 61, mind: 68, sleep: 63 },
    protocol: {
      eat: "Hit protein targets and keep Omega-3 Index above 8%.",
      move: "Progressive strength training twice a week, plus VO₂ max work.",
      mind: "Social connection and purpose are measurable longevity factors.",
      sleep: "Seven to eight hours with a regular schedule.",
    },
    tests: ["hs-CRP", "Omega-3 Index", "ApoB", "HbA1c"],
    productIds: ["wild-collagen", "gloss-oil", "pulse-ring"],
  },
  {
    id: "recovery",
    label: "Stronger recovery",
    insight:
      "Adaptation happens between sessions. We balance training load against what your sleep, HRV and nutrition can support.",
    scores: { eat: 66, move: 78, mind: 60, sleep: 57 },
    protocol: {
      eat: "1.6–2.2g protein per kg of bodyweight, spread across the day.",
      move: "Deload weeks and active recovery driven by HRV trends.",
      mind: "Parasympathetic work after hard sessions.",
      sleep: "Treat sleep as the primary recovery tool.",
    },
    tests: ["Ferritin", "Vitamin D", "hs-CRP", "Magnesium"],
    productIds: ["hyperice-hyperboot", "lmnt-variety", "wild-collagen"],
  },
]

export const baselineScores: Scores = { eat: 78, move: 71, mind: 64, sleep: 82 }

export type Biomarker = {
  name: string
  value: number
  unit: string
  min: number
  max: number
  optimal: [number, number]
}

export const biomarkers: Biomarker[] = [
  {
    name: "Vitamin D",
    value: 38,
    unit: "nmol/L",
    min: 0,
    max: 150,
    optimal: [75, 125],
  },
  {
    name: "Ferritin",
    value: 62,
    unit: "µg/L",
    min: 0,
    max: 200,
    optimal: [50, 150],
  },
  {
    name: "Omega-3 Index",
    value: 5.1,
    unit: "%",
    min: 0,
    max: 14,
    optimal: [8, 12],
  },
  { name: "hs-CRP", value: 2.4, unit: "mg/L", min: 0, max: 5, optimal: [0, 1] },
  {
    name: "HbA1c",
    value: 34,
    unit: "mmol/mol",
    min: 15,
    max: 60,
    optimal: [20, 38],
  },
  {
    name: "TSH",
    value: 1.8,
    unit: "mIU/L",
    min: 0,
    max: 6,
    optimal: [0.5, 2.5],
  },
]

export const loopSteps = [
  {
    title: "Measure",
    text: "Bloods, wearables and short check-ins give you a baseline across all four Pillars.",
  },
  {
    title: "Understand",
    text: "Healf Intelligence, reviewed by clinicians, turns raw numbers into what they mean for you.",
  },
  {
    title: "Act",
    text: "A plan of habits, protocols and only the products your data supports.",
  },
  {
    title: "Adapt",
    text: "Re-test and re-score. Your plan updates as you do, so it never goes stale.",
  },
]

export const standardSteps = [
  {
    image: "5b27f.png",
    number: "01",
    title: "Discovery",
    text: "We source from labs, clinicians and founders worldwide.",
  },
  {
    image: "a01c3.png",
    number: "02",
    title: "Expert validation",
    text: "Ingredients, dosing and claims are assessed against the evidence.",
  },
  {
    image: "baa59.png",
    number: "03",
    title: "Community testing",
    text: "Real people use it for weeks and report back before it earns a place.",
  },
]
