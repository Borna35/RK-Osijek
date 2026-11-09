// Reducer za kolekcije `djelatnici` i `aktivnosti`.
// Čista funkcija (bez side-effecta): prima stanje i akciju, vraća novo stanje.

// Ako stavka s tim id-em postoji, zamijeni je; inače dodaj na kraj
const upisi = (popis, stavka) =>
  popis.some((s) => s.id === stavka.id) ? popis.map((s) => (s.id === stavka.id ? stavka : s)) : [...popis, stavka];

export function reducer(stanje, akcija) {
  switch (akcija.tip) {
    case 'SPREMI':
      return { ...stanje, [akcija.kolekcija]: upisi(stanje[akcija.kolekcija], akcija.stavka) };

    case 'OBRISI': {
      const { kolekcija, id } = akcija;
      const sljedece = { ...stanje, [kolekcija]: stanje[kolekcija].filter((s) => s.id !== id) };
      // Brisanjem djelatnika brišu se i njegove aktivnosti
      if (kolekcija === 'djelatnici') {
        sljedece.aktivnosti = sljedece.aktivnosti.filter((a) => a.djelatnikId !== id);
      }
      return sljedece;
    }

    default:
      return stanje;
  }
}
