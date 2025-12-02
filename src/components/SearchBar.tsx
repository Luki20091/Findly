import { useEffect, useMemo, useState } from 'react';
import { getRandomPlaceholder } from '../utils/placeholders';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  const [placeholder, setPlaceholder] = useState('');

  useEffect(() => {
    setPlaceholder(getRandomPlaceholder());
  }, []);

  const ariaLabel = useMemo(() => 'Szukaj zgubionych przedmiotów', []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label className="input input-bordered flex items-center gap-3 rounded-full px-5 py-3 h-auto shadow-sm focus-within:shadow-md transition-shadow">
        <i className="fas fa-search text-base-content/50"></i>
        <input
          aria-label={ariaLabel}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="grow bg-transparent border-none focus:ring-0 text-base md:text-lg"
          placeholder={placeholder}
        />
      </label>
      <p className="mt-3 text-xs opacity-70">Wpisz nazwę przedmiotu, opis lub lokalizację.</p>
    </div>
  );
}
