import nl from './nl.js'
import fr from './fr.js'
import en from './en.js'
import de from './de.js'

// Volgorde = volgorde in de taalkiezer. Nederlands is de brontaal en de terugval.
export const TALEN = [nl, fr, en, de]
export const STANDAARD = 'nl'
export const PER_CODE = Object.fromEntries(TALEN.map((t) => [t.code, t]))
