import { AUTOR, KLUB } from '../data/constants.js';

const STAVKE = [
  { naziv: 'Početna', korijen: '', putanja: '/' },
  { naziv: 'Djelatnici', korijen: 'djelatnici', putanja: '/djelatnici' },
  { naziv: 'Aktivnosti', korijen: 'aktivnosti', putanja: '/aktivnosti' },
];

// Naslov kluba i navigacija; aktivna stavka se određuje prvim dijelom adrese.
export default function Zaglavlje({ dijelovi }) {
  const aktivno = dijelovi[0] ?? '';
  return (
    <header className="zaglavlje">
      <div className="zaglavlje__naslov">
        <a href="#/" className="logo">
          <span aria-hidden="true">🤾</span> {KLUB}
        </a>
        <span className="autor">{AUTOR}</span>
      </div>
      <nav aria-label="Glavna navigacija">
        {STAVKE.map((s) => (
          <a
            key={s.korijen}
            href={`#${s.putanja}`}
            className={aktivno === s.korijen ? 'aktivno' : ''}
            aria-current={aktivno === s.korijen ? 'page' : undefined}
          >
            {s.naziv}
          </a>
        ))}
      </nav>
    </header>
  );
}
