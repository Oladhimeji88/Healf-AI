import { ASSETS } from "../data/content"
import PillButton from "./PillButton"

export default function Hero() {
  return (
    <section className="relative grid min-h-[70vh] grid-cols-2 bg-black lg:min-h-[835px]">
      <img src={`${ASSETS}/418d0.png`} alt="" className="h-full w-full object-cover" />
      <img src={`${ASSETS}/903ee.png`} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-5 text-white sm:p-12">
        <h1 className="text-5xl leading-none sm:text-6xl">Bestsellers</h1>
        <div className="mt-4">
          <PillButton>Shop now</PillButton>
        </div>
      </div>
    </section>
  )
}
