// Inhoud van het waardenwiel: 8 behoeften -> 16 waarden -> 24 handelingen.
// Pas gerust aan: het wiel rekent de hoeken zelf uit op basis van het aantal handelingen.
// Elke handeling heeft een `kort` label voor in het bijschrift en een volledige `label` voor het paneel.
// Elke behoefte heeft een tint (`tint`, een hue van 0 tot 360) die door de hele tak loopt.

export const behoeften = [
  {
    id: 'verbondenheid',
    label: 'Verbondenheid',
    tint: 350,
    uitleg: 'De behoefte om erbij te horen en echt gezien te worden door anderen.',
    vraag: 'Met wie voel je je verbonden, en wat doet die verbinding groeien?',
    waarden: [
      {
        id: 'warmte',
        label: 'Warmte',
        uitleg: 'Zorgzaam en toegankelijk zijn, zodat anderen zich welkom voelen.',
        vraag: 'Wanneer voelde iemand zich bij jou echt welkom?',
        handelingen: [
          { kort: 'Echt luisteren', label: 'Oprecht vragen hoe het gaat en luisteren zonder meteen advies te geven', vraag: 'Wat hoorde je de laatste keer dat je echt luisterde?' },
          { kort: 'Gesprek zonder scherm', label: 'Tijd maken voor een gesprek zonder scherm erbij', vraag: 'Welk gesprek verdient deze week jouw volle aandacht?' },
        ],
      },
      {
        id: 'vertrouwen',
        label: 'Vertrouwen',
        uitleg: 'Betrouwbaar zijn en anderen het voordeel van de twijfel gunnen.',
        vraag: 'Op wie reken je blindelings, en wat maakt dat die persoon betrouwbaar is?',
        handelingen: [
          { kort: 'Afspraken nakomen', label: 'Afspraken nakomen, en tijdig zeggen als het niet lukt', vraag: 'Welke afspraak schuif je al te lang voor je uit?' },
        ],
      },
    ],
  },
  {
    id: 'autonomie',
    label: 'Autonomie',
    tint: 25,
    uitleg: 'De behoefte om zelf te kiezen en je leven naar je eigen overtuiging in te richten.',
    vraag: 'Waar voel je ruimte om te kiezen, en waar voel je je gestuurd?',
    waarden: [
      {
        id: 'vrijheid',
        label: 'Vrijheid',
        uitleg: 'Ruimte hebben om te doen of te laten wat bij je past.',
        vraag: 'Wat zou je doen als niemand er iets van vond?',
        handelingen: [
          { kort: 'Nee zeggen', label: 'Nee zeggen zonder lange uitleg', vraag: 'Welk nee heb je de voorbije tijd ingeslikt?' },
          { kort: 'Lege agenda', label: 'Een stuk van de agenda bewust leeg laten', vraag: 'Wat gebeurt er in leegte die in een volle agenda niet kan?' },
        ],
      },
      {
        id: 'eigenheid',
        label: 'Eigenheid',
        uitleg: 'Trouw blijven aan wie je bent, ook wanneer anderen het anders doen.',
        vraag: 'Waarin ben je anders dan de mensen om je heen, en ben je daar blij mee?',
        handelingen: [
          { kort: 'Eigen keuzes maken', label: 'Kiezen wat bij mij past, ook als anderen iets anders doen', vraag: 'Welke keuze maakte je recent omdat het van je verwacht werd?' },
        ],
      },
    ],
  },
  {
    id: 'veiligheid',
    label: 'Veiligheid',
    tint: 45,
    uitleg: 'De behoefte aan stabiliteit, bescherming en voorspelbaarheid.',
    vraag: 'Wat geeft je een stevige grond onder je voeten?',
    waarden: [
      {
        id: 'zekerheid',
        label: 'Zekerheid',
        uitleg: 'Dingen op orde hebben, zodat tegenslag je niet meteen omver blaast.',
        vraag: 'Welk onderdeel van je leven zou je graag steviger willen maken?',
        handelingen: [
          { kort: 'Buffer opbouwen', label: 'Een buffer opbouwen voor onverwachte kosten', vraag: 'Wat zou een buffer jou vandaag aan rust geven?' },
          { kort: 'Tijdig regelen', label: 'Dingen op tijd regelen in plaats van uitstellen', vraag: 'Wat zit al te lang als een steentje in je schoen?' },
        ],
      },
      {
        id: 'rust',
        label: 'Rust',
        uitleg: 'Een kalme, voorspelbare omgeving waarin je tot jezelf kunt komen.',
        vraag: 'Waar en wanneer word je het rustigst?',
        handelingen: [
          { kort: 'Prikkels beperken', label: 'Prikkels beperken voor het slapengaan', vraag: 'Wat zou je 30 minuten voor het slapen kunnen loslaten?' },
        ],
      },
    ],
  },
  {
    id: 'betekenis',
    label: 'Betekenis',
    tint: 100,
    uitleg: 'De behoefte om te weten waarvoor je dingen doet en dat het ertoe doet.',
    vraag: 'Waarvoor sta je ’s ochtends op, los van wat moet?',
    waarden: [
      {
        id: 'bijdragen',
        label: 'Bijdragen',
        uitleg: 'Iets betekenen voor anderen of voor iets groters dan jezelf.',
        vraag: 'Waar maakte jouw inbreng echt een verschil?',
        handelingen: [
          { kort: 'Talent aanbieden', label: 'Tijd of talent aanbieden aan iets buiten mezelf', vraag: 'Welk talent van jou ligt nu ongebruikt?' },
          { kort: 'Afmaken wat helpt', label: 'Iets afmaken dat anderen verder helpt', vraag: 'Wat wacht op jou en houdt iemand anders tegen?' },
        ],
      },
      {
        id: 'integriteit',
        label: 'Integriteit',
        uitleg: 'Eerlijk zijn en doen wat je zegt, ook wanneer niemand het ziet.',
        vraag: 'Waar botsen woorden en daden bij jou?',
        handelingen: [
          { kort: 'Woord houden', label: 'Doen wat ik zeg, ook als niemand kijkt', vraag: 'Welke kleine inconsequentie knaagt aan je?' },
        ],
      },
    ],
  },
  {
    id: 'groei',
    label: 'Groei',
    tint: 165,
    uitleg: 'De behoefte om te leren, te ontwikkelen en verder te komen.',
    vraag: 'Waarin ben je de voorbije tijd gegroeid, en wat wil je nu leren?',
    waarden: [
      {
        id: 'nieuwsgierigheid',
        label: 'Nieuwsgierigheid',
        uitleg: 'Open staan voor het onbekende en vragen blijven stellen.',
        vraag: 'Wat zou je morgen willen uitzoeken als je er de tijd voor had?',
        handelingen: [
          { kort: 'Doorvragen', label: 'Een vraag blijven stellen tot ik het echt begrijp', vraag: 'Wat doe je alsof je het begrijpt?' },
          { kort: 'Iets nieuws proberen', label: 'Elke week iets nieuws uitproberen', vraag: 'Wat is een klein experiment voor deze week?' },
        ],
      },
      {
        id: 'moed',
        label: 'Moed',
        uitleg: 'Doen wat belangrijk is, ook als het spannend of ongemakkelijk is.',
        vraag: 'Wat vraagt van jou nu een kleine dosis moed?',
        handelingen: [
          { kort: 'Gesprek aangaan', label: 'Het gesprek aangaan dat ik aan het uitstellen ben', vraag: 'Wat is het ergste dat kan gebeuren, en kun je dat dragen?' },
        ],
      },
    ],
  },
  {
    id: 'welzijn',
    label: 'Welzijn',
    tint: 200,
    uitleg: 'De behoefte om goed in je vel te zitten, lichamelijk en mentaal.',
    vraag: 'Wat geeft je energie en wat kost je energie?',
    waarden: [
      {
        id: 'gezondheid',
        label: 'Gezondheid',
        uitleg: 'Goed zorgen voor je lichaam en geest, nu en op lange termijn.',
        vraag: 'Wat vraagt je lichaam al een tijdje van je?',
        handelingen: [
          { kort: 'Dagelijks bewegen', label: 'Elke dag bewegen, ook al is het kort', vraag: 'Welke beweging doe je graag, zonder dat je moet?' },
          { kort: 'Rustig eten', label: 'Regelmatig en rustig eten', vraag: 'Hoe zou een rustige maaltijd er voor jou uitzien?' },
        ],
      },
      {
        id: 'balans',
        label: 'Balans',
        uitleg: 'Een evenwicht tussen inspanning en herstel, tussen geven en nemen.',
        vraag: 'Waar slaat de weegschaal door, naar teveel of te weinig?',
        handelingen: [
          { kort: 'Rust inplannen', label: 'Rust inplannen na een drukke periode', vraag: 'Wanneer was je laatst echt volledig uitgerust?' },
        ],
      },
    ],
  },
  {
    id: 'erkenning',
    label: 'Erkenning',
    tint: 235,
    uitleg: 'De behoefte om gewaardeerd en gerespecteerd te worden, en dat zelf ook te geven.',
    vraag: 'Wanneer voelde je je laatst echt gewaardeerd, en door wie?',
    waarden: [
      {
        id: 'waardering',
        label: 'Waardering',
        uitleg: 'Zien wat anderen doen en dat ook zeggen.',
        vraag: 'Wie verdient van jou een woord van dank dat nog niet is uitgesproken?',
        handelingen: [
          { kort: 'Bedanken', label: 'Oprecht bedanken, met een concrete reden', vraag: 'Wie bedank je vandaag, en waarvoor precies?' },
          { kort: 'Succes vieren', label: 'Het succes van anderen mee vieren', vraag: 'Wiens succes gun je moeiteloos, en wiens minder?' },
        ],
      },
      {
        id: 'respect',
        label: 'Respect',
        uitleg: 'Anderen en hun grenzen serieus nemen, en jezelf ook.',
        vraag: 'Waar voel je je niet gerespecteerd, en wat zegt dat over jouw grenzen?',
        handelingen: [
          { kort: 'Grenzen respecteren', label: 'De grenzen van anderen serieus nemen', vraag: 'Welke grens van iemand anders heb je recent overschreden?' },
        ],
      },
    ],
  },
  {
    id: 'plezier',
    label: 'Plezier',
    tint: 290,
    uitleg: 'De behoefte aan lichtheid, spel en genieten.',
    vraag: 'Wanneer vergat je laatst de tijd omdat je zo aan het genieten was?',
    waarden: [
      {
        id: 'speelsheid',
        label: 'Speelsheid',
        uitleg: 'Dingen lichter opvatten en ruimte maken voor spel.',
        vraag: 'Wanneer was je laatst echt aan het spelen?',
        handelingen: [
          { kort: 'Lachen met mezelf', label: 'Kunnen lachen met mezelf', vraag: 'Welke blunder is intussen vooral grappig geworden?' },
          { kort: 'Doelloos doen', label: 'Iets doen zonder doel of resultaat', vraag: 'Wat zou je doen als het niet nuttig hoefde te zijn?' },
        ],
      },
      {
        id: 'schoonheid',
        label: 'Schoonheid',
        uitleg: 'Aandacht hebben voor het mooie, groot of klein.',
        vraag: 'Welk klein ding mooi vond je gisteren, zonder dat je er veel bij nadacht?',
        handelingen: [
          { kort: 'Schoonheid zien', label: 'Aandacht geven aan mooie dingen om me heen', vraag: 'Waar kijk je dagelijks naar zonder het echt te zien?' },
        ],
      },
    ],
  },
]
