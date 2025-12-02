import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { ThemeProvider } from './context/ThemeContext';
import { Hero } from './components/Hero';
import { FindBot } from './components/FindBot';
import { useItems } from './hooks/useItems';

function App() {
  const { items, loading } = useItems();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return [];

    const fuse = new Fuse(items, {
      keys: ['name', 'description', 'location'],
      threshold: 0.30,
      shouldSort: true, 
    });

    return fuse.search(q).map((result) => result.item);
  }, [items, query]);

  return (
    <ThemeProvider>
      <div className="min-h-full bg-base-100 text-base-content transition-colors duration-300">
        <Hero query={query} setQuery={setQuery} filtered={filtered} loading={loading} />
        <FindBot />
      </div>
    </ThemeProvider>
  );
}

export default App;
