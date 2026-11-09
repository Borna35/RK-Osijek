import { useState } from 'react';
import AktivnostForma from '../components/AktivnostForma.jsx';
import PotvrdiBrisanje from '../components/PotvrdiBrisanje.jsx';
import { idi } from '../hooks/useHashRoute.js';
import { formatirajDatum, imeSUlogom, punoIme } from '../utils/format.js';
import { poDatumuSilazno, ukupnoMinuta } from '../utils/stats.js';

// Popis aktivnosti s filtrima (djelatnik, mjesec), zbrojem minuta te dodavanjem, uređivanjem i brisanjem.
// Adrese: #/aktivnosti, #/aktivnosti/nova (otvara formu), #/aktivnosti/djelatnik-ID (filter po djelatniku).
export default function Aktivnosti({ dijelovi, podaci, spremi, obrisi }) {
  const [uredi, setUredi] = useState(null);
  const [mjesec, setMjesec] = useState(''); // "YYYY-MM" ili prazno
  const nova = dijelovi[1] === 'nova';
  const djelatnikId = dijelovi[1]?.startsWith('djelatnik-') ? dijelovi[1].replace('djelatnik-', '') : '';

  const zatvori = () => {
    setUredi(null);
    if (nova) idi('/aktivnosti');
  };
  const spremiIZatvori = (aktivnost) => {
    spremi('aktivnosti', aktivnost);
    zatvori();
  };

  const promijeniDjelatnika = (id) => idi(id ? `/aktivnosti/djelatnik-${id}` : '/aktivnosti');

  const prikazane = poDatumuSilazno(
    podaci.aktivnosti.filter(
      (a) => (djelatnikId === '' || a.djelatnikId === djelatnikId) && (mjesec === '' || a.datum.startsWith(mjesec))
    )
  );

  return (
    <>
      <div className="naslov-red">
        <h2 className="naslov">Aktivnosti</h2>
        <button className="gumb" onClick={() => { setUredi(null); idi('/aktivnosti/nova'); }}>+ Nova aktivnost</button>
      </div>

      {(nova || uredi) && (
        <AktivnostForma
          key={uredi?.id ?? 'nova'}
          aktivnost={uredi}
          djelatnici={podaci.djelatnici}
          onSpremi={spremiIZatvori}
          onOdustani={zatvori}
        />
      )}

      <div className="filteri">
        <select aria-label="Filter po djelatniku" value={djelatnikId} onChange={(e) => promijeniDjelatnika(e.target.value)}>
          <option value="">Svi djelatnici</option>
          {podaci.djelatnici.map((d) => <option key={d.id} value={d.id}>{punoIme(d)}</option>)}
        </select>
        <label className="polje polje--uz">
          <span>Mjesec</span>
          <input type="month" value={mjesec} onChange={(e) => setMjesec(e.target.value)} />
        </label>
        <span className="zbroj">Obavljeno ukupno: <strong>{ukupnoMinuta(prikazane)} min</strong></span>
      </div>

      <div className="tablica-omot">
        <table>
          <thead>
            <tr><th>Datum</th><th>Djelatnik</th><th>Vrsta</th><th>Radnja</th><th>Trajanje</th><th>Status</th><th /></tr>
          </thead>
          <tbody>
            {prikazane.map((a) => (
              <tr key={a.id}>
                <td>{formatirajDatum(a.datum)}</td>
                <td>{imeSUlogom(podaci.djelatnici.find((d) => d.id === a.djelatnikId))}</td>
                <td>{a.vrsta}</td>
                <td>{a.opis}</td>
                <td>{a.trajanje} min</td>
                <td><span className={`znacka ${a.obavljeno ? 'znacka--da' : ''}`}>{a.obavljeno ? 'Obavljeno' : 'Planirano'}</span></td>
                <td className="akcije">
                  <button className="link" onClick={() => { setUredi(a); if (nova) idi('/aktivnosti'); }}>Uredi</button>
                  <PotvrdiBrisanje onObrisi={() => obrisi('aktivnosti', a.id)} />
                </td>
              </tr>
            ))}
            {prikazane.length === 0 && <tr><td colSpan="7" className="prazno">Nema aktivnosti za odabrani filter.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
