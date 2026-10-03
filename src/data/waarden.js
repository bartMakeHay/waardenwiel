// Structuur van het waardenwiel: 8 behoeften -> 16 waarden -> 24 handelingen.
// Hier staat enkel wat taalonafhankelijk is. Alle teksten staan in src/locales/.
// Een handeling heeft geen eigen regel: `handelingen: 2` levert de ids '<waarde>-1' en '<waarde>-2' op.
// `tint` is een hue (0 tot 360) die door de hele tak loopt. De hoeken van het wiel worden uit het aantal
// handelingen berekend, dus je kunt items toevoegen of schrappen zonder iets te tekenen.

export const behoeften = [
  {
    id: 'verbondenheid',
    tint: 350,
    waarden: [
      { id: 'warmte', handelingen: 2 },
      { id: 'vertrouwen', handelingen: 1 },
    ],
  },
  {
    id: 'autonomie',
    tint: 25,
    waarden: [
      { id: 'vrijheid', handelingen: 2 },
      { id: 'eigenheid', handelingen: 1 },
    ],
  },
  {
    id: 'veiligheid',
    tint: 45,
    waarden: [
      { id: 'zekerheid', handelingen: 2 },
      { id: 'rust', handelingen: 1 },
    ],
  },
  {
    id: 'betekenis',
    tint: 100,
    waarden: [
      { id: 'bijdragen', handelingen: 2 },
      { id: 'integriteit', handelingen: 1 },
    ],
  },
  {
    id: 'groei',
    tint: 165,
    waarden: [
      { id: 'nieuwsgierigheid', handelingen: 2 },
      { id: 'moed', handelingen: 1 },
    ],
  },
  {
    id: 'welzijn',
    tint: 200,
    waarden: [
      { id: 'gezondheid', handelingen: 2 },
      { id: 'balans', handelingen: 1 },
    ],
  },
  {
    id: 'erkenning',
    tint: 235,
    waarden: [
      { id: 'waardering', handelingen: 2 },
      { id: 'respect', handelingen: 1 },
    ],
  },
  {
    id: 'plezier',
    tint: 290,
    waarden: [
      { id: 'speelsheid', handelingen: 2 },
      { id: 'schoonheid', handelingen: 1 },
    ],
  },
]
