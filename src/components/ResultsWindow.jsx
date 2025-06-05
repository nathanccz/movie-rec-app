import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function ResultsWindow({ results }) {
  const container = useRef()

  useGSAP(
    () => {
      gsap.from('.result-item > *', {
        opacity: 0,
        y: 20,
        stagger: 0.75, // More delay between each item
        duration: 2.2, // Each item takes longer to animate
        ease: 'power2.out', // Smooth easing
      })
    },
    { dependencies: [results] } // <- triggers animation when 'results' changes
  )

  return (
    <div ref={container} className="mb-3">
      {results.map((r) => (
        <div className="result-item flex m-8 gap-5" key={r.id}>
          <div className="font-bold text-center basis-1/4">
            <h2 className="mb-3 text-lg">
              {`${r.original_title} (${
                r.release_date?.split('-')[0] || 'N/A'
              })`}
            </h2>
            <img
              src={r.poster}
              alt={`poster for ${r.original_title}`}
              className="h-[300px] w-[200px] mx-auto"
            />
          </div>
          <div className="basis-3/4 border p-3 rounded-lg bg-slate-700">
            <h3 className="mb-3 font-bold">Plot Overview:</h3>
            <p>{r.overview}</p>
            <h3 className="mt-5 mb-3 font-bold">Why You Might Like It:</h3>
            <p>{r.overview}</p>
            <h3 className="mt-5 mb-3 font-bold">Where to Stream It:</h3>
            <p>Title unavailable</p>
          </div>
        </div>
      ))}
    </div>
  )
}
