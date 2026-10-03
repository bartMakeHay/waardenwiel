# Waardenwiel

Een interactieve, drielagige SVG-visualisatie om de waarden achter je handelen te herkennen en te verkennen. Gebouwd met React en Vite, gehost via GitHub Pages.

## Wat is het?

Het wiel heeft drie ringen, van binnen naar buiten:

1. **Behoeften** (8): wat je diep van binnen nodig hebt, zoals verbondenheid of autonomie.
2. **Waarden** (16): wat je belangrijk vindt en wat uit die behoeften groeit.
3. **Handelingen** (24): concrete dingen die je doet en waarin je die waarden terugziet.

Elke waarde hoort bij één behoefte, elke handeling bij één waarde. Zo zie je in één oogopslag de keten van "wat ik nodig heb" tot "wat ik doe".

## Gebruik

- **Klik of tik** op een segment: het segment, zijn voorouders en zijn nakomelingen lichten op, de rest dimt.
- Het **paneel** naast of onder het wiel toont uitleg, een vraag om bij stil te staan en knoppen om door de keten te navigeren. Op een gsm vind je daar ook een lijst van alle behoeften, want de tekst in het wiel is dan te klein.
- **Toetsenbord**: Tab naar het wiel, daarna pijltje links/rechts binnen een ring, omhoog naar de bovenliggende laag, omlaag naar de eerste onderliggende laag. Enter of spatie kiest, Escape wist de keuze.
- Werkt in light en dark mode (volgt de instelling van je toestel).
- Er wordt niets opgeslagen of verstuurd.

## Lokaal draaien

Vereist Node.js 20.19 of nieuwer (22 aanbevolen).

```bash
npm install
npm run dev
```

Open daarna <http://localhost:5173/waardenwiel/>. Het pad `/waardenwiel/` komt van de `base` in [vite.config.js](vite.config.js), nodig voor GitHub Pages.

Andere commando's:

```bash
npm run build    # productiebouw in dist/
npm run preview  # de productiebouw lokaal bekijken
```

## Inhoud aanpassen

Alle teksten staan in [src/data/waarden.js](src/data/waarden.js): behoeften, waarden en handelingen met uitleg en reflectievraag. De hoeken van het wiel worden automatisch berekend uit het aantal handelingen per waarde, dus je kunt items toevoegen of schrappen zonder iets te tekenen.

## Publiceren op GitHub Pages

Een GitHub Actions-workflow ([.github/workflows/pages.yml](.github/workflows/pages.yml)) bouwt en publiceert de site bij elke push naar `main`. Zet daarvoor eenmalig in de repo-instellingen onder **Settings, Pages, Source** de optie **GitHub Actions** aan. De site staat dan op `https://bartmakehay.github.io/waardenwiel/`.

## Licentie

[MIT](LICENSE)
