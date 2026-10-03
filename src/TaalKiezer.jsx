import { TALEN } from './locales/index.js'
import { useI18n } from './i18n.jsx'

export default function TaalKiezer() {
  const { taal, setTaal, t } = useI18n()
  return (
    <div className="taalkiezer" role="group" aria-label={t('taalKiezer')}>
      {TALEN.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-pressed={taal === l.code}
          aria-label={l.naam}
          title={l.naam}
          onClick={() => setTaal(l.code)}
        >
          <span className="taal-code" aria-hidden="true">{l.code.toUpperCase()}</span>
          <span className="taal-naam" aria-hidden="true">{l.naam}</span>
        </button>
      ))}
    </div>
  )
}
