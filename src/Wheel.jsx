import { useRef, useState } from 'react'
import { NODES, PER_ID, PER_RING, RINGEN, labelPlaats, segmentPad, verwant } from './model.js'

const PADEN = new Map(NODES.map((n) => [n.id, segmentPad(n)]))

function ariaLabel(n) {
  if (n.soort === 'handeling') return `Handeling ${n.nummer}: ${n.label}`
  if (n.soort === 'waarde') return `Waarde: ${n.label}, bij ${PER_ID.get(n.ouderId).label}`
  return `Behoefte: ${n.label}`
}

export default function Wheel({ selectedId, onSelect }) {
  const refs = useRef(new Map())
  const [rovingId, setRovingId] = useState(PER_RING[0][0].id)
  const [focusId, setFocusId] = useState(null)
  const relevant = verwant(selectedId)
  const actief = rovingId

  const focusOp = (id) => {
    setRovingId(id)
    refs.current.get(id)?.focus()
  }

  // Pijltjes: links/rechts binnen de ring, omhoog naar de ouder, omlaag naar het eerste kind.
  function onKeyDown(e, n) {
    const ring = PER_RING[n.ring]
    const i = ring.indexOf(n)
    let doel = null
    if (e.key === 'ArrowRight') doel = ring[(i + 1) % ring.length]
    else if (e.key === 'ArrowLeft') doel = ring[(i - 1 + ring.length) % ring.length]
    else if (e.key === 'ArrowUp') doel = PER_ID.get(n.ouderId)
    else if (e.key === 'ArrowDown') doel = PER_ID.get(n.kindIds[0])
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(selectedId === n.id ? null : n.id)
      return
    } else return
    e.preventDefault()
    if (doel) focusOp(doel.id)
  }

  return (
    <svg
      className={`wheel${selectedId ? ' heeft-selectie' : ''}`}
      viewBox="-380 -380 760 760"
      role="group"
      aria-label="Waardenwiel in drie lagen. Binnenste ring: behoeften. Middelste ring: waarden. Buitenste ring: handelingen."
      onClick={() => onSelect(null)}
    >
      {RINGEN.map((r, i) => (
        <g key={r.soort} role="group" aria-label={`${r.naam}en`}>
          {PER_RING[i].map((n) => {
            const { x, y, draai } = labelPlaats(n)
            const klasse = ['seg', `ring-${n.ring}`, relevant.has(n.id) ? 'verwant' : '', selectedId === n.id ? 'gekozen' : '']
            return (
              <g
                key={n.id}
                ref={(el) => (el ? refs.current.set(n.id, el) : refs.current.delete(n.id))}
                className={klasse.join(' ')}
                style={{ '--h': n.tint }}
                role="button"
                tabIndex={n.id === actief ? 0 : -1}
                aria-label={ariaLabel(n)}
                aria-pressed={selectedId === n.id}
                onClick={(e) => { e.stopPropagation(); setRovingId(n.id); onSelect(selectedId === n.id ? null : n.id) }}
                onKeyDown={(e) => onKeyDown(e, n)}
                onFocus={(e) => { setRovingId(n.id); setFocusId(e.currentTarget.matches(':focus-visible') ? n.id : null) }}
                onBlur={() => setFocusId((v) => (v === n.id ? null : v))}
              >
                <title>{n.label}</title>
                <path d={PADEN.get(n.id)} />
                {n.ring === 2 ? (
                  <text className="lbl lbl-handeling" x={x} y={y}>{n.nummer}</text>
                ) : (
                  <text className={`lbl lbl-${n.soort}`} x={x} y={y} transform={`rotate(${draai} ${x} ${y})`}>{n.label}</text>
                )}
              </g>
            )
          })}
        </g>
      ))}

      {/* Overlay bovenop zodat focus- en selectiekader nooit door een buur worden afgedekt. */}
      {selectedId && <path className="overlay gekozen-rand" d={PADEN.get(selectedId)} />}
      {focusId && <path className="overlay focus-rand" d={PADEN.get(focusId)} />}

      <circle className="hub" r="58" />
      <text className="hub-tekst" y="-6">Waarden</text>
      <text className="hub-tekst" y="16">wiel</text>
    </svg>
  )
}
