import { useEffect, useState } from 'react'
import Wheel from './Wheel.jsx'
import Panel from './Panel.jsx'
import TaalKiezer from './TaalKiezer.jsx'
import { rijk, useI18n } from './i18n.jsx'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)
  const { t } = useI18n()

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedId(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="pagina">
      <header>
        <h1>{t('titel')}</h1>
        <p>{t('ondertitel')}</p>
      </header>
      <main className="inhoud">
        <div className="wiel-vak">
          <Wheel selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <Panel selectedId={selectedId} onSelect={setSelectedId} />
      </main>
      <footer>
        <TaalKiezer />
        <p>{rijk(t('footer'), { github: <a href="https://github.com/bartMakeHay/wheelofvalues">GitHub</a> })}</p>
      </footer>
    </div>
  )
}
