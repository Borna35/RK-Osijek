// Oznaka + input/select + poruka o grešci. `children` je sam input (ili select).
export default function Polje({ oznaka, greska, children }) {
  return (
    <label className="polje">
      <span>{oznaka}</span>
      {children}
      {greska && <span className="greska" role="alert">{greska}</span>}
    </label>
  );
}
