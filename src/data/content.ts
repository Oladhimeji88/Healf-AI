export const ASSETS = "/assets"

export type Product = {
  id: string
  image: string
  brand: string
  name: string
  price: number
  oldPrice?: number
  badges?: string[]
}

export const NAV_ITEMS = [
  { label: "Platform", href: "#platform" },
  { label: "Pillars", href: "#framework" },
  { label: "Bloods", href: "#bloods" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Journal", href: "#journal" },
]

export const bestSellers: Product[] = [
  {
    id: "gloss-oil",
    image: "df5db.png",
    brand: "MONDAY MUSE",
    name: "The Gloss - Scalp & Hair Density Oil",
    price: 45,
    badges: ["Sale", "Free delivery"],
  },
  {
    id: "ritual-prenatal",
    image: "e5221.png",
    brand: "RITUAL",
    name: "Prenatal Multivitamin",
    price: 30.99,
    oldPrice: 39,
    badges: ["Free delivery"],
  },
  {
    id: "lmnt-variety",
    image: "f2305.png",
    brand: "LMNT",
    name: "Recharge Electrolytes - Variety Pack",
    price: 18.99,
  },
  {
    id: "wild-collagen",
    image: "124fd.png",
    brand: "WILD NUTRITION",
    name: "Collagen 500 Plus",
    price: 34.49,
    oldPrice: 36.5,
    badges: ["Sale"],
  },
]

export const certified: Product[] = [
  {
    id: "artah-core",
    image: "df5db.png",
    brand: "ARTAH",
    name: "Core Metabollic+",
    price: 32,
    badges: ["Free delivery", "Free gifts"],
  },
  {
    id: "pulse-ring",
    image: "e5221.png",
    brand: "PULSE",
    name: "Pulse Ring - Silver",
    price: 229,
    badges: ["Free delivery"],
  },
  {
    id: "ritual-prenatal-sale",
    image: "f2305.png",
    brand: "RITUAL",
    name: "Prenatal Multivitamin",
    price: 30.99,
    oldPrice: 39,
    badges: ["Sale"],
  },
  {
    id: "hyperice-hyperboot",
    image: "124fd.png",
    brand: "HYPERICE",
    name: "Nike x Hyperice Hyperboot",
    price: 699.99,
  },
]

export const articles = [
  {
    image: "a4fe5.png",
    title: "Why The Way You Age Matters More Than How Long You Live",
  },
  {
    image: "d4e33.png",
    title: "Why Hair Thins And What Actually Works To Slow Hair Loss",
  },
  { image: "be05d.png", title: "Is Psyllium Husk The New GLP-1?" },
  { image: "360cd.png", title: "Why Are Neuroscientists Fascinated With God?" },
]

export const moreArticles = [
  "Micro-Grounding: How To Ground With Objects When You Can't Get Outdoors",
  "Immunity Hacks Experts Actually Swear By",
  "How To Find The Best Shilajit In The UK",
  "Sleeping Apart, Together: How Couples Can Bridge The Sleep Divide",
]

export const curationSteps = [
  { image: "5b27f.png", number: "01", title: "The Discovery" },
  { image: "a01c3.png", number: "02", title: "Expert Validation" },
  { image: "baa59.png", number: "03", title: "Community Testing" },
]

export const promises = [
  "365 Day Free Returns",
  "Free Delivery Over £50",
  "Next Day UK Delivery Available",
]

export const reviews = [
  {
    title: "A comprehensive approach to wellbeing",
    text: "Healf has impressed me with its comprehensive approach to wellbeing. Their commitment to natural ingredients and cutting-edge technology is evident.",
    author: "Dillon Jagatia",
  },
  {
    title: "Top-tier products",
    text: "If you're serious about wellbeing, you need Healf. Their products are top-tier and the customer service team has been super attentive!",
    author: "Jesse Hansen-Bartel",
  },
  {
    title: "One of the best wellbeing websites I've come across",
    text: "It's nice to know they thoroughly check the products they sell, so you know you're getting good quality. Highly recommend.",
    author: "Mayah",
  },
]

export const footerColumns = [
  {
    heading: "Platform",
    links: ["Healf Score", "Healf Bloods", "Your Plan", "Marketplace"],
  },
  { heading: "Pillars", links: ["Eat", "Move", "Mind", "Sleep"] },
  {
    heading: "Company",
    links: ["Our Definition", "The Healf Standard", "Journal", "Careers"],
  },
  {
    heading: "Support",
    links: ["Contact Us", "Track Order", "Start a Return", "Privacy Policy"],
  },
]

export const allProducts: Product[] = [...bestSellers, ...certified].filter(
  (p, i, all) => all.findIndex((q) => q.id === p.id) === i,
)

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
})

export const formatPrice = (value: number) => gbp.format(value)
