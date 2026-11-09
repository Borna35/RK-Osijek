import { useState } from 'react';

// Gumb "Obriši" koji traži potvrdu u samoj stranici (bez window.confirm).
export default function PotvrdiBrisanje({ onObrisi, upozorenje }) {
  const [pita, setPita] = useState(false);

  if (!pita) {
    return <button className="link link--blijedo" onClick={() => setPita(true)}>Obriši</button>;
  }
  return (
    <span className="potvrda">
      {upozorenje && <small>{upozorenje}</small>}
      <button className="link" onClick={onObrisi}>Da, obriši</button>
      <button className="link link--blijedo" onClick={() => setPita(false)}>Odustani</button>
    </span>
  );
}
