// Controleert dat elke taal in src/locales alle ui-sleutels en alle inhoud-ids van het Nederlands heeft,
// en geen onbekende. Gebruik: npm run check-locales
import { TALEN, STANDAARD, PER_CODE } from '../src/locales/index.js'
import { behoeften } from '../src/data/waarden.js'

const ids = []
for (const b of behoeften) {
  ids.push(b.id)
  for (const w of b.waarden) {
    ids.push(w.id)
    for (let i = 1; i <= w.handelingen; i++) ids.push(`${w.id}-${i}`)
  }
}
const bron = PER_CODE[STANDAARD]
let fouten = 0
const meld = (taal, tekst) => { fouten++; console.error(`[${taal}] ${tekst}`) }

for (const taal of TALEN) {
  const c = taal.code
  const MAG_LEEG = ['hubOnder'] // tweede regel in het midden van het wiel; leeg = één regel
for (const k of Object.keys(bron.ui)) if (!(k in taal.ui) || (!taal.ui[k] && !MAG_LEEG.includes(k))) meld(c, `ui.${k} ontbreekt`)
  for (const k of Object.keys(taal.ui)) if (!(k in bron.ui)) meld(c, `ui.${k} bestaat niet in het Nederlands`)
  for (const id of ids) {
    const r = taal.inhoud[id]
    const verwacht = 3
    if (!r) meld(c, `inhoud.${id} ontbreekt`)
    else if (r.length !== verwacht || r.some((x) => !x || !x.trim())) meld(c, `inhoud.${id} moet ${verwacht} niet-lege teksten hebben`)
  }
  for (const id of Object.keys(taal.inhoud)) if (!ids.includes(id)) meld(c, `inhoud.${id} komt niet voor in de structuur`)
  for (const k of Object.keys(bron.ui)) {
    const ph = (s) => (s.match(/\{\w+\}/g) ?? []).sort().join()
    if (taal.ui[k] && ph(taal.ui[k]) !== ph(bron.ui[k])) meld(c, `ui.${k}: plaatsvervangers verschillen van het Nederlands`)
  }
}
const naNalezen = TALEN.filter((t) => t.reviewed === false).map((t) => t.code)
if (naNalezen.length) console.log(`Nog na te lezen (reviewed: false): ${naNalezen.join(', ')}`)
console.log(fouten ? `${fouten} probleem(en)` : `Alles in orde: ${TALEN.length} talen, ${ids.length} items, ${Object.keys(bron.ui).length} interfaceteksten.`)
process.exit(fouten ? 1 : 0)
