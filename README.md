# Waardenwiel (Wheel of Values)

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
- **Talen:** Nederlands, Frans, Engels en Duits. De app kiest de eerste taal uit de voorkeurstalen van je browser die ze ondersteunt, en anders Nederlands. Met de taalkiezer in de footer wissel je zelf, en de keuze staat in de URL (`?taal=fr`), zodat je er een link naar kunt delen.
- Werkt in light en dark mode (volgt de instelling van je toestel).
- Er wordt niets opgeslagen of verstuurd.

## Lokaal draaien

Vereist Node.js 20.19 of nieuwer (22 aanbevolen).

```bash
npm install
npm run dev
```

Open daarna <http://localhost:5173/wheelofvalues/>. Het pad `/wheelofvalues/` komt van de `base` in [vite.config.js](vite.config.js), nodig voor GitHub Pages.

Andere commando's:

```bash
npm run build    # productiebouw in dist/
npm run preview  # de productiebouw lokaal bekijken
```

## Inhoud aanpassen

Alle teksten staan in [src/data/waarden.js](src/data/waarden.js): behoeften, waarden en handelingen met uitleg en reflectievraag. De hoeken van het wiel worden automatisch berekend uit het aantal handelingen per waarde, dus je kunt items toevoegen of schrappen zonder iets te tekenen.

## Adres

De site draait op <https://bartmakehay.github.io/wheelofvalues/>. De Engelse naam in het adres is bewust: de app kiest zelf de taal van de bezoeker, dus een Nederlandstalige lezer krijgt er meteen het Nederlands. De repo heette eerder `waardenwiel`; het oude Pages-adres bestaat niet meer.

## Talen en vertalingen

Structuur en teksten zijn gescheiden:

- [src/data/waarden.js](src/data/waarden.js): de structuur (behoeften, waarden, aantal handelingen, kleurtint). Taalonafhankelijk.
- [src/locales/](src/locales): per taal een bestand (`nl.js`, `fr.js`, `en.js`, `de.js`) met de interfaceteksten en per item een label, uitleg en reflectievraag. Het formaat staat bovenaan `nl.js`. Ontbreekt een tekst, dan valt de app terug op Nederlands.

Een taal toevoegen:

1. Kopieer `src/locales/nl.js` naar bv. `es.js` en vertaal de teksten.
2. Voeg de taal toe in [src/locales/index.js](src/locales/index.js).
3. Controleer met `npm run check-locales`: dat meldt ontbrekende of overtollige teksten. Kijk ook even of de woorden in het wiel nog passen; de letter wordt automatisch kleiner voor lange woorden.

De Franse, Engelse en Duitse teksten zijn opgesteld met Claude en nog niet nagelezen door een moedertaalspreker. Dat staat als `reviewed: false` in het bestand van elke taal. Haal die vlag weg zodra een taal is nagelezen.

## Publiceren op GitHub Pages

Een GitHub Actions-workflow ([.github/workflows/pages.yml](.github/workflows/pages.yml)) bouwt en publiceert de site bij elke push naar `main`. Zet daarvoor eenmalig in de repo-instellingen onder **Settings, Pages, Source** de optie **GitHub Actions** aan. De site staat dan op `https://bartmakehay.github.io/wheelofvalues/`.

## Licentie

[MIT](LICENSE)
