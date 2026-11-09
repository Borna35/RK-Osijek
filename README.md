# Rukometni klub Osijek

Web aplikacija za evidenciju djelatnika i aktivnosti rukometnog kluba: tko je što obavio i kada
(treneri, fizioterapeuti, liječnici i ostalo osoblje). Izrađena u Reactu 18 i Viteu, bez backenda –
podaci se spremaju u `localStorage` preglednika.



## Funkcionalnosti

- **Početna:** broj aktivnih djelatnika, broj obavljenih aktivnosti u zadnjih 7 dana, broj planiranih radnji i popis posljednjih aktivnosti.
- **Djelatnici:** popis s filtrom po ulozi, dodavanje, uređivanje i brisanje. Poveznica „N aktivnosti" otvara aktivnosti tog djelatnika.
- **Aktivnosti:** popis s filtrom po djelatniku i mjesecu, zbroj obavljenih minuta te dodavanje, uređivanje i brisanje.
- Validacija formi (obavezna polja) i potvrda brisanja u samoj stranici.
- Brisanjem djelatnika brišu se i njegove aktivnosti.

## Struktura projekta

```
src/
├── data/         konstante (uloge, vrste radnji), demo podaci (seed.js) i reducer
├── hooks/        useStore (stanje + localStorage), useHashRoute (routing preko #)
├── utils/        format.js (datumi, imena), stats.js (brojke), validation.js
├── components/   Zaglavlje, Polje, PotvrdiBrisanje, DjelatnikForma, AktivnostForma
├── pages/        Pocetna, Djelatnici, Aktivnosti
├── App.jsx       sastavlja aplikaciju: zaglavlje, stranica prema adresi, podnožje
└── styles.css    stilovi (boje su CSS varijable na vrhu)
```

## Adrese (routing)

| Adresa                          | Stranica                                   |
| ------------------------------- | ------------------------------------------ |
| `#/`                            | Početna                                    |
| `#/djelatnici`                  | Popis djelatnika                           |
| `#/djelatnici/novi`             | Popis s otvorenom formom za novog djelatnika |
| `#/aktivnosti`                  | Popis aktivnosti                           |
| `#/aktivnosti/nova`             | Popis s otvorenom formom za novu aktivnost |
| `#/aktivnosti/djelatnik-ID`     | Aktivnosti jednog djelatnika               |

## Podaci

Model podataka u `localStorage` (ključ `rkosijek.podaci`):

- **djelatnik:** `id`, `ime`, `prezime`, `uloga`, `datumZaposlenja`, `aktivan`, `napomena`
- **aktivnost:** `id`, `djelatnikId`, `datum`, `vrsta`, `opis`, `trajanje` (minute), `obavljeno`, `napomena`


