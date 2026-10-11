import { catalogue } from "./catalogue"

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

const byId = (...ids: string[]) =>
  ids
    .map((id) => catalogue.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))

export const bestSellers: Product[] = byId(
  "monday-muse-the-gloss-scalp-hair-density-oil",
  "ritual-prenatal-multivitamin",
  "lmnt-recharge-electrolytes-variety-pack",
  "wild-nutrition-collagen-500-plus",
)

export const certified: Product[] = byId(
  "core-metabollic",
  "pulse-pulse-ring-silver",
  "nike-x-hyperice-hyperboot",
  "8hours-sleep-recovery",
)

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
    links: ["About Healf", "Curation Process", "The Healf Source", "Brands"],
  },
  {
    heading: "Support",
    links: ["Track My Order", "FAQs", "Contact Us", "Privacy Policy"],
  },
]

export const allProducts: Product[] = catalogue

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
})

export const formatPrice = (value: number) => gbp.format(value)
