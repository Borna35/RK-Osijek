import { useState } from 'react';
import DjelatnikForma from '../components/DjelatnikForma.jsx';
import PotvrdiBrisanje from '../components/PotvrdiBrisanje.jsx';
import { ULOGE } from '../data/constants.js';
import { idi } from '../hooks/useHashRoute.js';
import { formatirajDatum, punoIme } from '../utils/format.js';
import { brojAktivnosti } from '../utils/stats.js';

// Popis djelatnika s filtrom po ulozi te dodavanjem, uređivanjem i brisanjem.
export default function Djelatnici({ dijelovi, podaci, spremi, obrisi }) {
  const [uredi, setUredi] = useState(null); // objekt djelatnika koji se uređuje
  const [uloga, setUloga] = useState('');
  const novi = dijelovi[1] === 'novi'; // adresa #/djelatnici/novi otvara praznu formu

  const zatvori = () => {
    setUredi(null);
    if (novi) idi('/djelatnici');
  };
  const spremiIZatvori = (djelatnik) => {
    spremi('djelatnici', djelatnik);
    zatvori();
  };

  const prikazani = podaci.djelatnici.filter((d) => uloga === '' || d.uloga === uloga);

  return (
    <>
      <div className="naslov-red">
        <h2 className="naslov">Djelatnici</h2>
        <button className="gumb" onClick={() => { setUredi(null); idi('/djelatnici/novi'); }}>+ Novi djelatnik</button>
      </div>

      {(novi || uredi) && (
        <DjelatnikForma key={uredi?.id ?? 'novi'} djelatnik={uredi} onSpremi={spremiIZatvori} onOdustani={zatvori} />
      )}

      <div className="filteri">
        <select aria-label="Filter po ulozi" value={uloga} onChange={(e) => setUloga(e.target.value)}>
          <option value="">Sve uloge</option>
          {ULOGE.map((u) => <option key={u}>{u}</option>)}
        </select>
      </div>

      <div className="tablica-omot">
        <table>
          <thead>
            <tr><th>Djelatnik</th><th>Uloga</th><th>Zaposlen od</th><th>Status</th><th>Aktivnosti</th><th /></tr>
          </thead>
          <tbody>
            {prikazani.map((d) => (
              <tr key={d.id}>
                <td>{punoIme(d)}</td>
                <td>{d.uloga}</td>
                <td>{formatirajDatum(d.datumZaposlenja)}</td>
                <td><span className={`znacka ${d.aktivan ? 'znacka--da' : ''}`}>{d.aktivan ? 'Aktivan' : 'Neaktivan'}</span></td>
                <td><a href={`#/aktivnosti/djelatnik-${d.id}`}>{brojAktivnosti(podaci.aktivnosti, d.id)} aktivnosti</a></td>
                <td className="akcije">
                  <button className="link" onClick={() => { setUredi(d); if (novi) idi('/djelatnici'); }}>Uredi</button>
                  <PotvrdiBrisanje upozorenje="Briše i njegove aktivnosti." onObrisi={() => obrisi('djelatnici', d.id)} />
                </td>
              </tr>
            ))}
            {prikazani.length === 0 && <tr><td colSpan="6" className="prazno">Nema djelatnika za odabrani filter.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
