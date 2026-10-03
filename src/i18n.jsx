import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PER_CODE, STANDAARD } from './locales/index.js'
import { PER_ID } from './model.js'

const bron = PER_CODE[STANDAARD]

// Volgorde: ?taal= in de URL, dan de browsertaal (eerste ondersteunde uit navigator.languages), dan Nederlands.
function taalUitUrl() {
  try {
    const code = new URLSearchParams(window.location.search).get('taal')?.toLowerCase()
    return code && PER_CODE[code] ? code : null
  } catch {
    return null
  }
}

function taalUitBrowser() {
  const lijst = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const l of lijst) {
    const code = String(l ?? '').slice(0, 2).toLowerCase()
    if (PER_CODE[code]) return code
  }
  return null
}

export const kiesTaal = () => taalUitUrl() ?? taalUitBrowser() ?? STANDAARD

const vul = (tekst, vars) => (vars ? tekst.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : tekst)

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [taal, setTaalState] = useState(kiesTaal)

  // Een keuze komt in de URL (?taal=fr), zodat de link deelbaar is en er niets wordt opgeslagen.
  const setTaal = (code) => {
    setTaalState(code)
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('taal', code)
      window.history.replaceState(null, '', url)
    } catch { /* geen history beschikbaar: de keuze geldt dan enkel voor deze sessie */ }
  }

  const waarde = useMemo(() => {
    const L = PER_CODE[taal]
    const t = (sleutel, vars) => vul(L.ui[sleutel] ?? bron.ui[sleutel] ?? sleutel, vars)
    // behoefte en waarde: [label, uitleg, vraag]; handeling: [kort, label, vraag]
    const tekst = (id) => {
      const r = L.inhoud[id] ?? bron.inhoud[id]
      return PER_ID.get(id).soort === 'handeling'
        ? { kort: r[0], label: r[1], uitleg: null, vraag: r[2] }
        : { kort: null, label: r[0], uitleg: r[1], vraag: r[2] }
    }
    // Naam voor in een bijschrift of tooltip: de korte naam als die bestaat.
    const naam = (id) => { const x = tekst(id); return x.kort ?? x.label }
    return { taal, setTaal, t, tekst, naam }
  }, [taal])

  useEffect(() => {
    document.documentElement.lang = taal
    document.title = waarde.t('paginaTitel')
    document.querySelector('meta[name="description"]')?.setAttribute('content', waarde.t('beschrijving'))
  }, [taal, waarde])

  return <I18nContext.Provider value={waarde}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)

// *woord* wordt vetgedrukt, {sleutel} wordt vervangen door een element uit `delen`.
export function rijk(tekst, delen = {}) {
  return tekst.split(/(\*[^*]+\*|\{\w+\})/).filter(Boolean).map((stuk, i) => {
    if (stuk.startsWith('*')) return <strong key={i}>{stuk.slice(1, -1)}</strong>
    if (stuk.startsWith('{')) return <span key={i}>{delen[stuk.slice(1, -1)] ?? stuk}</span>
    return stuk
  })
}
