import { useEffect, useState } from 'react'
import Wheel from './Wheel.jsx'
import Panel from './Panel.jsx'

export default function App() {
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelectedId(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="pagina">
      <header>
        <h1>Waardenwiel</h1>
        <p>Een drielagige kaart om de waarden achter je handelen te herkennen en te verkennen.</p>
      </header>
      <main className="inhoud">
        <div className="wiel-vak">
          <Wheel selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <Panel selectedId={selectedId} onSelect={setSelectedId} />
      </main>
      <footer>
        <p>
          Er wordt niets opgeslagen of verstuurd. Broncode op{' '}
          <a href="https://github.com/bartMakeHay/waardenwiel">GitHub</a>, onder MIT-licentie.
        </p>
      </footer>
    </div>
  )
}
