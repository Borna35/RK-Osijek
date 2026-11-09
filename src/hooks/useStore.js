import { useEffect, useReducer } from 'react';
import { pocetniPodaci } from '../data/seed.js';
import { reducer } from '../data/reducer.js';

const KLJUC = 'rkosijek.podaci';

// Učitava spremljene podatke; ako ih nema ili su neispravni, koristi demo podatke
function ucitaj() {
  try {
    const spremljeno = localStorage.getItem(KLJUC);
    return spremljeno ? JSON.parse(spremljeno) : pocetniPodaci();
  } catch {
    return pocetniPodaci();
  }
}

// Hook koji drži sve podatke aplikacije i nudi akcije spremi/obrisi.
export function useStore() {
  const [podaci, dispatch] = useReducer(reducer, null, ucitaj);

  useEffect(() => {
    try {
      localStorage.setItem(KLJUC, JSON.stringify(podaci));
    } catch {
      /* bez trajne pohrane aplikacija i dalje radi */
    }
  }, [podaci]);

  // Nova stavka dobiva id; postojeća ga već ima.
  const spremi = (kolekcija, stavka) =>
    dispatch({ tip: 'SPREMI', kolekcija, stavka: { ...stavka, id: stavka.id ?? crypto.randomUUID() } });

  const obrisi = (kolekcija, id) => dispatch({ tip: 'OBRISI', kolekcija, id });

  return { podaci, spremi, obrisi };
}
