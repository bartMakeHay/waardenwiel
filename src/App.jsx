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
        <div className="kop">
          <h1>{t('titel')}</h1>
          <p>{t('ondertitel')}</p>
        </div>
        <TaalKiezer />
      </header>
      <main className="inhoud">
        <div className="wiel-vak">
          <Wheel selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <Panel selectedId={selectedId} onSelect={setSelectedId} />
      </main>
      <footer>
        <p>{rijk(t('footer'), { github: <a href="https://github.com/bartMakeHay/waardenwiel">GitHub</a> })}</p>
      </footer>
    </div>
  )
}
