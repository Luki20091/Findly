import { useEffect, useState } from 'react';
import type { Item } from '../types/Item';
import itemsData from '../data/items.json';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setItems(itemsData as Item[]);
        setLoading(false);
      } catch (e) {
        setError('Failed to load items');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { items, loading, error };
}
