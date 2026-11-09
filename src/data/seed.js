// Početni (demo) podaci. Datumi aktivnosti računaju se u odnosu na današnji dan,
// pa početna stranica uvijek ima smislene brojke ("obavljeno u 7 dana").

// Vraća ISO datum (YYYY-MM-DD) pomaknut za zadani broj dana od danas
function datumPomak(dana) {
  const d = new Date();
  d.setDate(d.getDate() + dana);
  const mj = String(d.getMonth() + 1).padStart(2, '0');
  const dan = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mj}-${dan}`;
}

export function pocetniPodaci() {
  return {
    djelatnici: [
      { id: '1', ime: 'Ivan', prezime: 'Horvat (demo)', uloga: 'Trener', datumZaposlenja: '2022-07-01', aktivan: true, napomena: '' },
      { id: '2', ime: 'Marko', prezime: 'Kovač (demo)', uloga: 'Fizioterapeut', datumZaposlenja: '2023-08-15', aktivan: true, napomena: '' },
      { id: '3', ime: 'Ana', prezime: 'Babić (demo)', uloga: 'Klupski liječnik', datumZaposlenja: '2021-01-10', aktivan: true, napomena: '' },
      { id: '4', ime: 'Petar', prezime: 'Novak (demo)', uloga: 'Kondicijski trener', datumZaposlenja: '2024-02-01', aktivan: false, napomena: '' },
    ],
    aktivnosti: [
      { id: 'a1', djelatnikId: '2', datum: datumPomak(2), vrsta: 'Fizioterapija', opis: 'Zakazana terapija ramena', trajanje: 40, obavljeno: false, napomena: '' },
      { id: 'a2', djelatnikId: '2', datum: datumPomak(0), vrsta: 'Fizioterapija', opis: 'Masaža i oporavak nakon treninga', trajanje: 45, obavljeno: true, napomena: '' },
      { id: 'a3', djelatnikId: '1', datum: datumPomak(-1), vrsta: 'Trening', opis: 'Taktički trening, obrana 6-0', trajanje: 90, obavljeno: true, napomena: '' },
      { id: 'a4', djelatnikId: '3', datum: datumPomak(-3), vrsta: 'Liječnički pregled', opis: 'Kontrolni pregled igrača', trajanje: 30, obavljeno: true, napomena: '' },
    ],
  };
}
