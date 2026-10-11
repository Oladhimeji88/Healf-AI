import { biomarkers } from "../../data/platform"
import { RangeBar } from "../Bloods"

export default function BiomarkersView() {
  return (
    <div className="rounded-[24px] bg-white p-5 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <h2 className="eyebrow">Biomarker overview</h2>
        <span className="rounded-full bg-canvas px-3 py-1 text-xs">
          Illustrative
        </span>
      </div>
      <ul className="mt-3 divide-y divide-black/10">
        {biomarkers.map((b) => (
          <RangeBar key={b.name} b={b} />
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-black/50">
        Example values for demonstration only. Not medical advice. Discuss any
        results with a qualified clinician.
      </p>
    </div>
  )
}
