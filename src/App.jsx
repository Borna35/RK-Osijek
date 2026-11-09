import Zaglavlje from './components/Zaglavlje.jsx';
import Pocetna from './pages/Pocetna.jsx';
import Djelatnici from './pages/Djelatnici.jsx';
import Aktivnosti from './pages/Aktivnosti.jsx';
import { useHashRoute } from './hooks/useHashRoute.js';
import { useStore } from './hooks/useStore.js';
import { KLUB } from './data/constants.js';

// Sastavlja aplikaciju: zaglavlje, stranica prema adresi (#/djelatnici ...) i podnožje.
export default function App() {
  const dijelovi = useHashRoute();
  const { podaci, spremi, obrisi } = useStore();
  const stranica = dijelovi[0] ?? '';

  return (
    <>
      <Zaglavlje dijelovi={dijelovi} />
      <main className="okvir">
        {stranica === 'djelatnici' && <Djelatnici dijelovi={dijelovi} podaci={podaci} spremi={spremi} obrisi={obrisi} />}
        {stranica === 'aktivnosti' && <Aktivnosti dijelovi={dijelovi} podaci={podaci} spremi={spremi} obrisi={obrisi} />}
        {stranica !== 'djelatnici' && stranica !== 'aktivnosti' && <Pocetna podaci={podaci} />}
      </main>
      <footer className="podnozje">© {KLUB}</footer>
    </>
  );
}
