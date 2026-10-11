import { useState } from "react"

const A = "/assets"

type Product = {
  image: string
  brand: string
  name: string
  price: string
  oldPrice?: string
  badges?: string[]
}

const bestSellers: Product[] = [
  {
    image: "df5db.png",
    brand: "MONDAY MUSE",
    name: "The Gloss - Scalp & Hair Density Oil",
    price: "£45.00",
    badges: ["Sale", "Free delivery"],
  },
  {
    image: "e5221.png",
    brand: "RITUAL",
    name: "Prenatal Multivitamin",
    price: "£30.99",
    oldPrice: "£39.00",
    badges: ["Free delivery"],
  },
  {
    image: "f2305.png",
    brand: "LMNT",
    name: "Recharge Electrolytes - Variety Pack",
    price: "£18.99",
  },
  {
    image: "124fd.png",
    brand: "WILD NUTRITION",
    name: "Collagen 500 Plus",
    price: "£34.49",
    oldPrice: "£36.50",
    badges: ["Sale"],
  },
]

const certified: Product[] = [
  {
    image: "df5db.png",
    brand: "ARTAH",
    name: "Core Metabollic+",
    price: "£32.00",
    badges: ["Free delivery", "Free gifts"],
  },
  {
    image: "e5221.png",
    brand: "PULSE",
    name: "Pulse Ring - Silver",
    price: "£229.00",
    badges: ["Free delivery"],
  },
  {
    image: "f2305.png",
    brand: "RITUAL",
    name: "Prenatal Multivitamin",
    price: "£30.99",
    oldPrice: "£39.00",
    badges: ["Sale"],
  },
  {
    image: "124fd.png",
    brand: "HYPERICE",
    name: "Nike x Hyperice Hyperboot",
    price: "£699.99",
  },
]

const articles = [
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

const reviews = [
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

function PillButton({
  children,
  dark = false,
}: {
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <button
      className={`rounded-full px-4 py-2.5 text-sm transition hover:scale-[1.02] ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {children}
    </button>
  )
}

function ProductRail({
  title,
  subtitle,
  products,
}: {
  title: string
  subtitle?: React.ReactNode
  products: Product[]
}) {
  return (
    <section className="page-section">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="mt-2 text-base">{subtitle}</p>}
        </div>
        <div className="hidden gap-2 sm:flex" aria-hidden="true">
          <button className="rail-arrow opacity-30">‹</button>
          <button className="rail-arrow">›</button>
        </div>
      </div>
      <div className="product-rail">
        {products.map((product) => (
          <article
            className="min-w-[78vw] sm:min-w-[310px] lg:min-w-0"
            key={product.name}
          >
            <div className="group relative aspect-[340/436] overflow-hidden rounded-lg bg-[#f5f5f5]">
              <img
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                src={`${A}/${product.image}`}
                alt={product.name}
              />
              <button
                className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-full bg-white text-xl"
                aria-label={`Add ${product.name} to bag`}
              >
                +
              </button>
            </div>
            <p className="mt-3 text-xs font-bold tracking-wide opacity-60">
              {product.brand}
            </p>
            <h3 className="mt-2 text-base leading-6">{product.name}</h3>
            <p className="mt-2">
              {product.price}
              {product.oldPrice && (
                <span className="ml-2 text-neutral-500 line-through">
                  {product.oldPrice}
                </span>
              )}
            </p>
            {product.badges && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <span
                    className="rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[11px]"
                    key={badge}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

function ImageFeature({
  image,
  title,
  text,
  button,
}: {
  image: string
  title: string
  text?: string
  button: string
}) {
  return (
    <article className="group relative min-h-[620px] overflow-hidden rounded-2xl lg:min-h-[870px]">
      <img
        src={`${A}/${image}`}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 max-w-sm text-white">
        <h3 className="text-4xl leading-10">{title}</h3>
        {text && <p className="mt-3 text-xl leading-7">{text}</p>}
        <div className="mt-3">
          <PillButton>{button}</PillButton>
        </div>
      </div>
    </article>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-white text-black">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 px-4 backdrop-blur">
        <div className="relative mx-auto flex h-16 max-w-[1440px] items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open shop menu"
              className="mr-4 grid size-8 place-items-center"
            >
              <img src={`${A}/53c84.svg`} alt="" className="size-6" />
            </button>
            <nav className="hidden items-center gap-8 text-sm md:flex">
              {["EAT", "MOVE", "MIND", "SLEEP", "Healf Bloods"].map((item) => (
                <a href="#" className="hover:underline" key={item}>
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <a
            href="#"
            aria-label="Healf home"
            className="absolute left-1/2 w-[105px] -translate-x-1/2 sm:w-[130px]"
          >
            <img src={`${A}/6ade8.svg`} alt="Healf" />
          </a>
          <div className="flex items-center gap-4">
            <label className="hidden h-10 w-[300px] items-center rounded-full border border-black px-4 lg:flex">
              <input
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Search all products"
                aria-label="Search all products"
              />
              <img src={`${A}/33858.svg`} alt="" className="size-5" />
            </label>
            <button
              aria-label="Account"
              className="hidden size-6 rounded-full border border-black sm:grid sm:place-items-center"
            >
              <img src={`${A}/55879.svg`} alt="" className="size-4" />
            </button>
            <button aria-label="Shopping bag">
              <img src={`${A}/c4c1c.svg`} alt="" className="size-5" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="grid gap-3 border-t border-black/10 py-5 text-xl md:hidden">
            {["EAT", "MOVE", "MIND", "SLEEP", "Healf Bloods"].map((item) => (
              <a href="#" onClick={() => setMenuOpen(false)} key={item}>
                {item}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="relative grid min-h-[70vh] grid-cols-2 bg-black lg:min-h-[835px]">
          <img
            src={`${A}/418d0.png`}
            alt=""
            className="h-full w-full object-cover"
          />
          <img
            src={`${A}/903ee.png`}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-5 text-white sm:p-12">
            <h1 className="text-5xl leading-none sm:text-6xl">Bestsellers</h1>
            <div className="mt-4">
              <PillButton>Shop now</PillButton>
            </div>
          </div>
        </section>

        <section className="page-section py-16 lg:py-20">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {[
              ["9c99b.png", "EAT"],
              ["f1416.png", "MOVE"],
              ["1de3b.png", "MIND"],
              ["88616.png", "SLEEP"],
            ].map(([image, label]) => (
              <a
                href="#"
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
                key={label}
              >
                <img
                  src={`${A}/${image}`}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 text-2xl text-white sm:text-4xl">
                  {label}
                </span>
              </a>
            ))}
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <h2 className="section-title">The Four Pillars™</h2>
            <p className="text-xl leading-8 sm:text-2xl sm:leading-9">
              Our mission is grounded in The Four Pillars™ — EAT, MOVE, MIND,
              SLEEP. With these as our foundation, we offer tools and rituals
              across each Pillar to empower your wellbeing.
            </p>
          </div>
        </section>

        <section className="page-section py-14">
          <a href="#" className="text-sm font-semibold">
            Shop popular collections →
          </a>
          <div className="mt-5 flex flex-wrap gap-x-3 text-3xl leading-[1.35] sm:text-4xl">
            {[
              "Electrolytes",
              "Vitamins and Supplements",
              "Gut Health",
              "Magnesium",
              "Collagen",
              "Skincare",
              "Creatine",
              "Omega-3",
              "Protein",
              "Red Light",
            ].map((item, index) => (
              <a
                href="#"
                className={index === 0 ? "underline" : "hover:underline"}
                key={item}
              >
                {item}
                {index < 9 && ","}
              </a>
            ))}
          </div>
        </section>

        <ProductRail title="Best Sellers" products={bestSellers} />

        <section className="page-section grid gap-4 lg:grid-cols-2">
          <ImageFeature
            image="d27b6.png"
            title="Healf Exclusive"
            button="Shop Healf Exclusive"
          />
          <ImageFeature
            image="9bd6e.png"
            title="Healf Bloods"
            text="Translate your body's data into a personalised wellbeing plan."
            button="Start testing"
          />
        </section>

        <ProductRail
          title="Just Certified"
          subtitle={
            <>
              Discover <u>20+ latest products</u> added recently
            </>
          }
          products={certified}
        />

        <section className="page-section grid gap-4 lg:grid-cols-2">
          <ImageFeature
            image="7808e.png"
            title="Tech"
            button="Shop collection"
          />
          <ImageFeature
            image="7c3a8.png"
            title="Gut Health"
            button="Shop collection"
          />
        </section>

        <section className="page-section py-16 lg:py-20">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="text-4xl sm:text-5xl">The Healf Source</h2>
            <p className="max-w-xl text-lg leading-7 md:text-right">
              Journals are supplements for your MIND. Explore our range of
              expert-written articles to support your wellbeing journey.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((article) => (
              <article key={article.title}>
                <div className="aspect-[2/3] overflow-hidden rounded-2xl bg-neutral-100">
                  <img
                    src={`${A}/${article.image}`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl leading-7">{article.title}</h3>
                <a
                  href="#"
                  className="mt-3 inline-block border-b border-black text-sm"
                >
                  Read More
                </a>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <PillButton dark>Read The Source</PillButton>
          </div>
        </section>

        <section className="page-section py-14">
          <a href="#" className="text-sm font-semibold">
            More from The Healf Source →
          </a>
          <div className="mt-6">
            {[
              "Micro-Grounding: How To Ground With Objects When You Can't Get Outdoors",
              "Immunity Hacks Experts Actually Swear By",
              "How To Find The Best Shilajit In The UK",
              "Sleeping Apart, Together: How Couples Can Bridge The Sleep Divide",
            ].map((title) => (
              <a
                href="#"
                className="block border-b border-neutral-200 py-4 text-3xl leading-tight hover:pl-2 sm:text-5xl sm:leading-tight"
                key={title}
              >
                {title}
              </a>
            ))}
          </div>
        </section>

        <section className="page-section py-16">
          <div className="mb-8 grid gap-5 lg:grid-cols-2">
            <h2 className="section-title">Healf Curation Process™</h2>
            <p className="text-xl leading-8 lg:text-right sm:text-2xl">
              With our Healf Curation Process™, we do the work for you. Shop
              with confidence knowing every item has been tried, tested, and
              curated for you.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["5b27f.png", "01", "The Discovery"],
              ["a01c3.png", "02", "Expert Validation"],
              ["baa59.png", "03", "Community Testing"],
            ].map(([image, number, title]) => (
              <article
                className="relative min-h-[560px] overflow-hidden rounded-lg sm:min-h-[672px]"
                key={title}
              >
                <img
                  src={`${A}/${image}`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 text-2xl text-white">
                  {number}
                </span>
                <h3 className="absolute bottom-3 left-3 text-3xl text-white sm:text-4xl">
                  {title}
                </h3>
              </article>
            ))}
          </div>
          <div className="mt-5">
            <PillButton dark>Learn more</PillButton>
          </div>
        </section>

        <section className="page-section py-12">
          <div className="grid gap-6 lg:grid-cols-2">
            <h2 className="section-title">The Healf Promise</h2>
            <div>
              <p className="text-xl leading-8 sm:text-2xl sm:leading-9">
                Our experts assess every single product for purity, quality, and
                efficacy — if it isn’t the highest standard, we won’t stock it.
              </p>
              <ul className="mt-6 flex flex-col gap-4 text-base sm:flex-row sm:justify-between">
                {[
                  "365 Day Free Returns",
                  "Free Delivery Over £50",
                  "Next Day UK Delivery Available",
                ].map((promise) => (
                  <li key={promise}>✓ {promise}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative mt-8 overflow-hidden rounded-2xl bg-neutral-900 px-4 py-16 text-white sm:px-10">
            <img
              src={`${A}/feaf8.png`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70 blur-md"
            />
            <div className="relative text-center">
              <div className="text-3xl font-bold">★ Trustpilot</div>
              <p className="mt-3 text-xl">
                Rated <b>4.8 (Excellent)</b> based on <b>15,200+ reviews</b> on
                Trustpilot
              </p>
            </div>
            <div className="relative mt-10 grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <article
                  className="rounded-2xl bg-white/90 p-4 text-black"
                  key={review.title}
                >
                  <div className="text-[#00b67a]">★★★★★</div>
                  <h3 className="mt-2 text-lg font-semibold">{review.title}</h3>
                  <p className="mt-2 leading-6">{review.text}</p>
                  <p className="mt-3 text-sm">— {review.author}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black px-4 pb-6 pt-16 text-white">
        <div className="mx-auto max-w-[1408px]">
          <div className="grid gap-12 border-b border-white/20 pb-14 lg:grid-cols-[2fr_1fr_1fr_1fr]">
            <div>
              <h2 className="text-2xl font-medium">Learn</h2>
              <p className="mt-3 text-sm">
                Nourish your MIND with weekly wellbeing tips, news, and product
                offers.
              </p>
              <form className="mt-6 flex max-w-xl border-b border-white/60 pb-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/50"
                />
                <button className="text-sm font-semibold">Subscribe</button>
              </form>
            </div>
            {[
              ["Shop", "Eat", "Move", "Mind", "Sleep", "Shop All"],
              [
                "Explore",
                "The Healf Source",
                "Our Story",
                "Curation Process",
                "Careers",
                "Refer a Friend",
              ],
              [
                "Support",
                "Contact Us",
                "Track Order",
                "Start a Return",
                "FAQs",
                "Privacy Policy",
              ],
            ].map(([heading, ...links]) => (
              <div key={heading}>
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
              </div>
            ))}
          </div>
          <img
            src={`${A}/6ade8.svg`}
            alt="Healf"
            className="my-12 w-full invert"
          />
          <div className="flex flex-col justify-between gap-3 text-sm sm:flex-row">
            <p>Copyright © 2026, Healf. All rights reserved.</p>
            <p>EN · GBP</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
