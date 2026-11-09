import { useState } from 'react';
import Polje from './Polje.jsx';
import { ULOGE } from '../data/constants.js';
import { danas } from '../utils/format.js';
import { validirajDjelatnika } from '../utils/validation.js';

const prazan = () => ({ ime: '', prezime: '', uloga: ULOGE[0], datumZaposlenja: danas(), aktivan: true, napomena: '' });

// Forma za dodavanje i uređivanje djelatnika.
export default function DjelatnikForma({ djelatnik, onSpremi, onOdustani }) {
  const [v, setV] = useState(djelatnik ?? prazan());
  const [pokaziGreske, setPokaziGreske] = useState(false);
  const greske = validirajDjelatnika(v);

  const promijeni = (e) => {
    const { name, value, type, checked } = e.target;
    setV((prethodno) => ({ ...prethodno, [name]: type === 'checkbox' ? checked : value }));
  };

  const posalji = (e) => {
    e.preventDefault();
    setPokaziGreske(true);
    if (Object.keys(greske).length === 0) onSpremi(v);
  };
  const g = (polje) => (pokaziGreske ? greske[polje] : undefined);

  return (
    <form className="forma" onSubmit={posalji} noValidate>
      <h3>{djelatnik ? 'Uredi djelatnika' : 'Novi djelatnik'}</h3>
      <div className="forma__mreza">
        <Polje oznaka="Ime" greska={g('ime')}><input name="ime" value={v.ime} onChange={promijeni} /></Polje>
        <Polje oznaka="Prezime" greska={g('prezime')}><input name="prezime" value={v.prezime} onChange={promijeni} /></Polje>
        <Polje oznaka="Uloga u klubu" greska={g('uloga')}>
          <select name="uloga" value={v.uloga} onChange={promijeni}>
            <option value="">— odaberite —</option>
            {ULOGE.map((u) => <option key={u}>{u}</option>)}
          </select>
        </Polje>
        <Polje oznaka="Datum zaposlenja" greska={g('datumZaposlenja')}>
          <input name="datumZaposlenja" type="date" value={v.datumZaposlenja} onChange={promijeni} />
        </Polje>
      </div>
      <label className="kvacica">
        <input name="aktivan" type="checkbox" checked={v.aktivan} onChange={promijeni} /> Aktivan
      </label>
      <Polje oznaka="Napomena">
        <textarea name="napomena" rows="3" value={v.napomena} onChange={promijeni} />
      </Polje>
      <div className="forma__gumbi">
        <button type="submit" className="gumb">Spremi</button>
        <button type="button" className="gumb gumb--sporedni" onClick={onOdustani}>Odustani</button>
      </div>
    </form>
  );
}
