// Pomoćne funkcije za prikaz.

// "2026-11-09" -> "09. 11. 2026."
export function formatirajDatum(iso) {
  if (!iso) return '–';
  const [g, m, d] = iso.split('-');
  return `${d}. ${m}. ${g}.`;
}

// Današnji datum kao ISO (YYYY-MM-DD) po lokalnom vremenu
export function danas() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const punoIme = (d) => `${d.ime} ${d.prezime}`;

// "Ana Babić (demo) (Klupski liječnik)"
export const imeSUlogom = (d) => (d ? `${punoIme(d)} (${d.uloga})` : '–');
