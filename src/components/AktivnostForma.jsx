import { useState } from 'react';
import Polje from './Polje.jsx';
import { VRSTE_RADNJI } from '../data/constants.js';
import { danas, imeSUlogom } from '../utils/format.js';
import { validirajAktivnost } from '../utils/validation.js';

const prazna = (djelatnikId) => ({
  djelatnikId,
  datum: danas(),
  vrsta: VRSTE_RADNJI[0],
  opis: '',
  trajanje: 30,
  obavljeno: true,
  napomena: '',
});

// Forma za dodavanje i uređivanje aktivnosti.
export default function AktivnostForma({ aktivnost, djelatnici, predlozeniDjelatnikId = '', onSpremi, onOdustani }) {
  const [v, setV] = useState(aktivnost ?? prazna(predlozeniDjelatnikId));
  const [pokaziGreske, setPokaziGreske] = useState(false);
  const greske = validirajAktivnost(v);

  const promijeni = (e) => {
    const { name, value, type, checked } = e.target;
    setV((prethodno) => ({ ...prethodno, [name]: type === 'checkbox' ? checked : value }));
  };

  const posalji = (e) => {
    e.preventDefault();
    setPokaziGreske(true);
    if (Object.keys(greske).length === 0) onSpremi({ ...v, trajanje: Number(v.trajanje) });
  };
  const g = (polje) => (pokaziGreske ? greske[polje] : undefined);

  return (
    <form className="forma" onSubmit={posalji} noValidate>
      <h3>{aktivnost ? 'Uredi aktivnost' : 'Nova aktivnost'}</h3>
      <div className="forma__mreza">
        <Polje oznaka="Djelatnik" greska={g('djelatnikId')}>
          <select name="djelatnikId" value={v.djelatnikId} onChange={promijeni}>
            <option value="">— odaberite —</option>
            {djelatnici.map((d) => <option key={d.id} value={d.id}>{imeSUlogom(d)}</option>)}
          </select>
        </Polje>
        <Polje oznaka="Datum obavljanja" greska={g('datum')}>
          <input name="datum" type="date" value={v.datum} onChange={promijeni} />
        </Polje>
        <Polje oznaka="Vrsta radnje" greska={g('vrsta')}>
          <select name="vrsta" value={v.vrsta} onChange={promijeni}>
            <option value="">— odaberite —</option>
            {VRSTE_RADNJI.map((r) => <option key={r}>{r}</option>)}
          </select>
        </Polje>
        <Polje oznaka="Opis radnje" greska={g('opis')}><input name="opis" value={v.opis} onChange={promijeni} /></Polje>
        <Polje oznaka="Trajanje (min)" greska={g('trajanje')}>
          <input name="trajanje" type="number" min="1" value={v.trajanje} onChange={promijeni} />
        </Polje>
        <label className="kvacica kvacica--sredina">
          <input name="obavljeno" type="checkbox" checked={v.obavljeno} onChange={promijeni} /> Obavljeno
        </label>
      </div>
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
