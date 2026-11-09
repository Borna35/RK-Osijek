// Validacije formi. Svaka vraća objekt s greškama; prazan objekt = sve u redu.

const OBAVEZNO = 'Obavezno polje';

export function validirajDjelatnika(d) {
  const g = {};
  if (d.ime.trim() === '') g.ime = OBAVEZNO;
  if (d.prezime.trim() === '') g.prezime = OBAVEZNO;
  if (d.uloga === '') g.uloga = OBAVEZNO;
  if (!d.datumZaposlenja) g.datumZaposlenja = OBAVEZNO;
  return g;
}

export function validirajAktivnost(a) {
  const g = {};
  if (a.djelatnikId === '') g.djelatnikId = OBAVEZNO;
  if (!a.datum) g.datum = OBAVEZNO;
  if (a.vrsta === '') g.vrsta = OBAVEZNO;
  if (a.opis.trim() === '') g.opis = OBAVEZNO;
  const t = Number(a.trajanje);
  if (!Number.isInteger(t) || t < 1) g.trajanje = 'Unesite trajanje u minutama.';
  return g;
}
