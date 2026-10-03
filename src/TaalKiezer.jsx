import { TALEN } from './locales/index.js'
import { useI18n } from './i18n.jsx'

export default function TaalKiezer() {
  const { taal, setTaal, t } = useI18n()
  return (
    <nav className="taalkiezer" aria-label={t('taalKiezer')}>
      {TALEN.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-pressed={taal === l.code}
          onClick={() => setTaal(l.code)}
        >
          {l.naam}
        </button>
      ))}
    </nav>
  )
}
