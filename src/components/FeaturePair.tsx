import { ASSETS } from "../data/content"
import PillButton from "./PillButton"

export type Feature = {
  image: string
  title: string
  text?: string
  button: string
}

function ImageFeature({ image, title, text, button }: Feature) {
  return (
    <article className="group relative min-h-[620px] overflow-hidden rounded-2xl lg:min-h-[870px]">
      <img
        src={`${ASSETS}/${image}`}
        alt=""
        loading="lazy"
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

export default function FeaturePair({ features }: { features: [Feature, Feature] }) {
  return (
    <section className="page-section grid gap-4 lg:grid-cols-2">
      {features.map((feature) => (
        <ImageFeature key={feature.title} {...feature} />
      ))}
    </section>
  )
}
