import { behoeften } from './data/waarden.js'

// Dit bestand kent alleen structuur en meetkunde; teksten komen uit src/locales via i18n.jsx.
// Binnen naar buiten. Stralen in SVG-eenheden; het viewBox loopt van -380 tot 380.
export const RINGEN = [
  { soort: 'behoefte', r0: 64, r1: 190 },
  { soort: 'waarde', r0: 194, r1: 314 },
  { soort: 'handeling', r0: 318, r1: 372 },
]

// Hoeken lopen in graden, klokwijzerzin, 0 = boven. Elke handeling krijgt een gelijk deel,
// waarden en behoeften nemen de hoek van hun kinderen over.
function bouw() {
  const nodes = []
  const perId = new Map()
  const totaal = behoeften.reduce((s, b) => s + b.waarden.reduce((t, w) => t + w.handelingen, 0), 0)
  const stap = 360 / totaal
  let slot = 0

  const voegToe = (n) => {
    nodes.push(n)
    perId.set(n.id, n)
    return n
  }

  for (const b of behoeften) {
    const bn = voegToe({ id: b.id, ring: 0, soort: 'behoefte', tint: b.tint, ouderId: null, kindIds: [], start: slot * stap, eind: 0 })
    for (const w of b.waarden) {
      const wn = voegToe({ id: w.id, ring: 1, soort: 'waarde', tint: b.tint, ouderId: bn.id, kindIds: [], start: slot * stap, eind: 0 })
      bn.kindIds.push(wn.id)
      for (let i = 1; i <= w.handelingen; i++) {
        const hn = voegToe({
          id: `${w.id}-${i}`, ring: 2, soort: 'handeling', tint: b.tint, ouderId: wn.id, kindIds: [],
          start: slot * stap, eind: (slot + 1) * stap,
        })
        wn.kindIds.push(hn.id)
        slot += 1
      }
      wn.eind = slot * stap
    }
    bn.eind = slot * stap
  }
  return { nodes, perId }
}

export const { nodes: NODES, perId: PER_ID } = bouw()
export const PER_RING = RINGEN.map((_, i) => NODES.filter((n) => n.ring === i))

// Geselecteerde node, zijn voorouders en alle nakomelingen.
export function verwant(id) {
  const set = new Set()
  if (!id) return set
  for (let n = PER_ID.get(id); n; n = PER_ID.get(n.ouderId)) set.add(n.id)
  const loop = (n) => n.kindIds.forEach((k) => { set.add(k); loop(PER_ID.get(k)) })
  loop(PER_ID.get(id))
  return set
}

export function keten(id) {
  const lijst = []
  for (let n = PER_ID.get(id); n; n = PER_ID.get(n.ouderId)) lijst.unshift(n)
  return lijst
}

const rad = (graden) => (graden * Math.PI) / 180
const punt = (r, graden) => [r * Math.sin(rad(graden)), -r * Math.cos(rad(graden))]
const f = (x) => Math.round(x * 100) / 100

// Ringsegment als SVG-pad, met een klein tussenruimtje tussen buren.
export function segmentPad(node) {
  const { r0, r1 } = RINGEN[node.ring]
  const gat = node.ring === 0 ? 0.5 : node.ring === 1 ? 0.45 : 0.4
  const a0 = node.start + gat
  const a1 = node.eind - gat
  const groot = a1 - a0 > 180 ? 1 : 0
  const [x0, y0] = punt(r1, a0)
  const [x1, y1] = punt(r1, a1)
  const [x2, y2] = punt(r0, a1)
  const [x3, y3] = punt(r0, a0)
  return `M${f(x0)} ${f(y0)}A${r1} ${r1} 0 ${groot} 1 ${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}A${r0} ${r0} 0 ${groot} 0 ${f(x3)} ${f(y3)}Z`
}

// Plaats en draaiing van het label: radiaal gericht en altijd van links naar rechts leesbaar.
export function labelPlaats(node) {
  const { r0, r1 } = RINGEN[node.ring]
  const mid = (node.start + node.eind) / 2
  const [x, y] = punt((r0 + r1) / 2, mid)
  const draai = mid > 180 ? mid + 90 : mid - 90
  return { x: f(x), y: f(y), draai: f(draai) }
}
