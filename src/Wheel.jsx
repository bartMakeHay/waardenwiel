import { useRef, useState } from 'react'
import { NODES, PER_ID, PER_RING, RINGEN, keten, labelPlaats, segmentPad, verwant } from './model.js'
import { useI18n } from './i18n.jsx'

const PADEN = new Map(NODES.map((n) => [n.id, segmentPad(n)]))
const SOORT_SLEUTEL = { behoefte: 'soortBehoefte', waarde: 'soortWaarde', handeling: 'soortHandeling' }
const RING_SLEUTEL = { behoefte: 'ringBehoefte', waarde: 'ringWaarde', handeling: 'ringHandeling' }
const ARIA_SLEUTEL = { behoefte: 'ariaBehoefte', waarde: 'ariaWaarde', handeling: 'ariaHandeling' }

// Past de letter aan de ruimte in de ring aan, zodat langere vertalingen niet uit hun segment lopen.
// `breedte` is de gemiddelde tekenbreedte in em (vet is breder), `max` de beschikbare ruimte in SVG-eenheden.
const LABEL = { behoefte: { basis: 17, max: 116, breedte: 0.6 }, waarde: { basis: 14.5, max: 112, breedte: 0.55 } }
const lettergrootte = (tekst, soort) => {
  const { basis, max, breedte } = LABEL[soort]
  return Math.min(basis, max / (tekst.length * breedte))
}

export default function Wheel({ selectedId, onSelect }) {
  const { t, tekst, naam } = useI18n()
  const refs = useRef(new Map())
  const [rovingId, setRovingId] = useState(PER_RING[0][0].id)
  const [focusId, setFocusId] = useState(null)
  const relevant = verwant(selectedId)
  const actief = rovingId

  const gekozen = selectedId ? PER_ID.get(selectedId) : null
  const boven = gekozen ? keten(selectedId).slice(0, -1).map((n) => tekst(n.id).label) : []
  const bovenRegel = gekozen ? [t(SOORT_SLEUTEL[gekozen.soort]), boven.join(' \u203a ')].filter(Boolean).join(' \u00b7 ') : ''
  const onderRegel = gekozen ? naam(gekozen.id) : t('kiesSegment')

  const ariaLabel = (n) => {
    const ouder = n.ouderId ? tekst(n.ouderId).label : ''
    return t(ARIA_SLEUTEL[n.soort], { naam: tekst(n.id).label, ouder })
  }

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
      viewBox="-380 -380 760 865"
      role="group"
      aria-label={t('wielAria')}
      onClick={() => onSelect(null)}
    >
      {RINGEN.map((r, i) => (
        <g key={r.soort} role="group" aria-label={t(RING_SLEUTEL[r.soort])}>
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
                <title>{naam(n.id)}</title>
                <path d={PADEN.get(n.id)} />
                {n.ring < 2 && (
                  <text
                    className={`lbl lbl-${n.soort}`}
                    x={x}
                    y={y}
                    transform={`rotate(${draai} ${x} ${y})`}
                    style={{ fontSize: lettergrootte(tekst(n.id).label, n.soort) }}
                  >
                    {tekst(n.id).label}
                  </text>
                )}
              </g>
            )
          })}
        </g>
      ))}

      {/* Overlay bovenop zodat focus- en selectiekader nooit door een buur worden afgedekt. */}
      {selectedId && <path className="overlay gekozen-rand" d={PADEN.get(selectedId)} />}
      {focusId && <path className="overlay focus-rand" d={PADEN.get(focusId)} />}

      {/* Bijschrift in het diagram: groot genoeg om ook op een gsm te lezen. Bovenste regel = niveau en
          bovenliggende lagen, onderste regel = de gekozen naam. */}
      <text className="bijschrift-boven" y="422" aria-hidden="true">{bovenRegel}</text>
      <text className="bijschrift" y="462" aria-hidden="true">{onderRegel}</text>

      <circle className="hub" r="58" />
      {t('hubOnder') ? (
        <>
          <text className="hub-tekst" y="-6">{t('hubBoven')}</text>
          <text className="hub-tekst" y="16">{t('hubOnder')}</text>
        </>
      ) : (
        <text className="hub-tekst" y="5">{t('hubBoven')}</text>
      )}
    </svg>
  )
}
