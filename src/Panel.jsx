import { PER_ID, PER_RING, keten } from './model.js'

const SOORT = { behoefte: 'Behoefte', waarde: 'Waarde', handeling: 'Handeling' }

function Chip({ node, onSelect, huidig }) {
  return (
    <button
      type="button"
      className={`chip ring-${node.ring}${huidig ? ' chip-huidig' : ''}`}
      style={{ '--h': node.tint }}
      onClick={() => onSelect(node.id)}
      aria-pressed={huidig}
    >
      {node.label}
    </button>
  )
}

export default function Panel({ selectedId, onSelect }) {
  const node = selectedId ? PER_ID.get(selectedId) : null

  return (
    <aside className="paneel" aria-live="polite" aria-label="Uitleg bij je keuze">
      {!node ? (
        <>
          <h2>Verken je waarden</h2>
          <p>
            Het wiel heeft drie lagen. Binnen staan de <strong>behoeften</strong>, daarrond de{' '}
            <strong>waarden</strong> die daaruit groeien, en buiten de concrete <strong>handelingen</strong> waarin
            je ze terugziet.
          </p>
          <p>Kies een segment om de hele keten te zien en een vraag om bij stil te staan. Of begin hieronder:</p>
          <div className="chips">
            {PER_RING[0].map((n) => <Chip key={n.id} node={n} onSelect={onSelect} />)}
          </div>
          <p className="hint">
            Met het toetsenbord: Tab naar het wiel, pijltjes om te bewegen (links en rechts binnen een laag, omhoog en
            omlaag tussen lagen), Enter om te kiezen, Escape om te wissen.
          </p>
        </>
      ) : (
        <>
          <p className="soort">{SOORT[node.soort]}</p>
          <h2>{node.label}</h2>
          {node.uitleg && <p>{node.uitleg}</p>}

          <h3>Om bij stil te staan</h3>
          <p className="vraag">{node.vraag}</p>

          {node.ouderId && (
            <>
              <h3>Waar het uit voortkomt</h3>
              <ol className="trap">
                {keten(node.id).slice(0, -1).map((n, i) => (
                  <li key={n.id} style={{ '--niveau': i }}>
                    <span className="trap-soort">{SOORT[n.soort]}</span>
                    <Chip node={n} onSelect={onSelect} />
                  </li>
                ))}
              </ol>
            </>
          )}

          {node.kindIds.length > 0 && (
            <>
              <h3>{node.soort === 'behoefte' ? 'Waarden daaruit' : 'Hoe je het toont'}</h3>
              <div className="chips">
                {node.kindIds.map((id) => <Chip key={id} node={PER_ID.get(id)} onSelect={onSelect} />)}
              </div>
            </>
          )}

          <button type="button" className="wis" onClick={() => onSelect(null)}>Wis keuze</button>
        </>
      )}
    </aside>
  )
}
