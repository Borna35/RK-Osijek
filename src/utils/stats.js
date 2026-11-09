// Izračuni za početnu stranicu i filtre.
import { danas } from './format.js';

// ISO datum prije `dana` dana
function prije(dana) {
  const d = new Date();
  d.setDate(d.getDate() - dana);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function statistika({ djelatnici, aktivnosti }) {
  const od = prije(7);
  const do_ = danas();
  return {
    aktivnihDjelatnika: djelatnici.filter((d) => d.aktivan).length,
    obavljenoU7Dana: aktivnosti.filter((a) => a.obavljeno && a.datum >= od && a.datum <= do_).length,
    planiranih: aktivnosti.filter((a) => !a.obavljeno).length,
  };
}

// Najnovije aktivnosti prve
export const poDatumuSilazno = (aktivnosti) => [...aktivnosti].sort((a, b) => b.datum.localeCompare(a.datum));

export const brojAktivnosti = (aktivnosti, djelatnikId) => aktivnosti.filter((a) => a.djelatnikId === djelatnikId).length;

export const ukupnoMinuta = (aktivnosti) => aktivnosti.filter((a) => a.obavljeno).reduce((zbroj, a) => zbroj + a.trajanje, 0);
