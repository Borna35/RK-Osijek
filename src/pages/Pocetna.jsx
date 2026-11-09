import { formatirajDatum, imeSUlogom } from '../utils/format.js';
import { poDatumuSilazno, statistika } from '../utils/stats.js';

// Početna: brojke i posljednje aktivnosti.
export default function Pocetna({ podaci }) {
  const s = statistika(podaci);
  const kartice = [
    { broj: s.aktivnihDjelatnika, naziv: 'Aktivnih djelatnika' },
    { broj: s.obavljenoU7Dana, naziv: 'Obavljeno u 7 dana' },
    { broj: s.planiranih, naziv: 'Planiranih radnji' },
  ];
  const posljednje = poDatumuSilazno(podaci.aktivnosti).slice(0, 5);

  return (
    <>
      <h2 className="naslov">Evidencija djelatnika i aktivnosti</h2>
      <p className="opis">Tko je što obavio i kada: treneri, fizioterapeuti, liječnici i ostalo osoblje kluba.</p>

      <section className="kartice">
        {kartice.map((k) => (
          <div className="kartica" key={k.naziv}>
            <strong>{k.broj}</strong>
            <span>{k.naziv}</span>
          </div>
        ))}
      </section>

      <div className="naslov-red">
        <h3>Posljednje aktivnosti</h3>
        <div className="gumbi">
          <a className="gumb" href="#/aktivnosti/nova">+ Nova aktivnost</a>
          <a className="gumb gumb--sporedni" href="#/djelatnici/novi">+ Novi djelatnik</a>
        </div>
      </div>

      <div className="tablica-omot">
        <table>
          <thead><tr><th>Datum</th><th>Djelatnik</th><th>Radnja</th><th>Status</th></tr></thead>
          <tbody>
            {posljednje.map((a) => (
              <tr key={a.id}>
                <td>{formatirajDatum(a.datum)}</td>
                <td>{imeSUlogom(podaci.djelatnici.find((d) => d.id === a.djelatnikId))}</td>
                <td>{a.vrsta}: {a.opis}</td>
                <td><span className={`znacka ${a.obavljeno ? 'znacka--da' : ''}`}>{a.obavljeno ? 'Obavljeno' : 'Planirano'}</span></td>
              </tr>
            ))}
            {posljednje.length === 0 && <tr><td colSpan="4" className="prazno">Još nema aktivnosti.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
