import { PER_ID, PER_RING, keten } from './model.js'
import { rijk, useI18n } from './i18n.jsx'

const SOORT_SLEUTEL = { behoefte: 'soortBehoefte', waarde: 'soortWaarde', handeling: 'soortHandeling' }

function Chip({ node, onSelect, huidig }) {
  const { tekst } = useI18n()
  return (
    <button
      type="button"
      className={`chip ring-${node.ring}${huidig ? ' chip-huidig' : ''}`}
      style={{ '--h': node.tint }}
      onClick={() => onSelect(node.id)}
      aria-pressed={huidig}
    >
      {tekst(node.id).label}
    </button>
  )
}

export default function Panel({ selectedId, onSelect }) {
  const { t, tekst } = useI18n()
  const node = selectedId ? PER_ID.get(selectedId) : null
  const inhoud = node ? tekst(node.id) : null

  return (
    <aside className="paneel" aria-live="polite" aria-label={t('paneelAria')}>
      {!node ? (
        <>
          <h2>{t('introTitel')}</h2>
          <p>{rijk(t('intro1'))}</p>
          <p>{t('intro2')}</p>
          <div className="chips">
            {PER_RING[0].map((n) => <Chip key={n.id} node={n} onSelect={onSelect} />)}
          </div>
          <p className="hint">{t('hint')}</p>
        </>
      ) : (
        <>
          <p className="soort">{t(SOORT_SLEUTEL[node.soort])}</p>
          <h2>{inhoud.label}</h2>
          {inhoud.uitleg && <p>{inhoud.uitleg}</p>}

          <h3>{t('vraagKop')}</h3>
          <p className="vraag">{inhoud.vraag}</p>

          {node.ouderId && (
            <>
              <h3>{t('ketenKop')}</h3>
              <ol className="trap">
                {keten(node.id).slice(0, -1).map((n, i) => (
                  <li key={n.id} style={{ '--niveau': i }}>
                    <span className="trap-soort">{t(SOORT_SLEUTEL[n.soort])}</span>
                    <Chip node={n} onSelect={onSelect} />
                  </li>
                ))}
              </ol>
            </>
          )}

          {node.kindIds.length > 0 && (
            <>
              <h3>{node.soort === 'behoefte' ? t('kinderenBehoefte') : t('kinderenWaarde')}</h3>
              <div className="chips">
                {node.kindIds.map((id) => <Chip key={id} node={PER_ID.get(id)} onSelect={onSelect} />)}
              </div>
            </>
          )}

          <button type="button" className="wis" onClick={() => onSelect(null)}>{t('wis')}</button>
        </>
      )}
    </aside>
  )
}
