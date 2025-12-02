
import { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './Navbar';
import { SearchBar } from './SearchBar';
import { Card } from './Card';
import { Skeleton } from './Skeleton';
import type { Item } from '../types/Item';

interface HeroProps {
  query: string;
  setQuery: (q: string) => void;
  filtered: Item[];
  loading: boolean;
}

export function Hero({ query, setQuery, filtered, loading }: HeroProps) {
  const [visibleCount, setVisibleCount] = useState(3);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(3);
  }, [query]);

  const displayedItems = filtered.slice(0, visibleCount);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && visibleCount < filtered.length) {
      setVisibleCount((prev) => Math.min(prev + 6, filtered.length));
    }
  }, [visibleCount, filtered.length]);

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-base-100 transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-gradient-to-b from-brand-500/10 via-fuchsia-500/10 to-transparent blur-3xl dark:from-brand-500/20 dark:via-fuchsia-500/20" />
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-gradient-to-t from-fuchsia-500/20 via-violet-500/15 to-brand-500/5 blur-2xl dark:from-fuchsia-500/35 dark:via-violet-500/25 dark:to-brand-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.02)_0%,_transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06)_0%,_transparent_60%)]" />
      </div>

      <div className="relative z-10 pt-4">
        <Navbar />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-12 px-6 md:px-10 text-center">
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-base-content mb-6">
          Findly.com
        </h1>
        <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mb-10">
          Twoje Biuro Rzeczy Znalezionych Online.
        </p>

        <div className="w-full max-w-2xl mb-12">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="w-full max-w-6xl pb-20 min-h-[200px] transition-all duration-500 ease-in-out">
          {loading && query.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-2xl bg-base-content/5" />
              ))}
            </div>
          ) : (
            <>
              {query.length > 0 && (
                <div className="animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedItems.map((item) => (
                      <Card key={item.id} item={item} />
                    ))}
                  </div>

                  {visibleCount < filtered.length && (
                    <div ref={observerTarget} className="h-20 w-full flex items-center justify-center mt-8">
                      <div className="loading loading-dots loading-lg opacity-30"></div>
                    </div>
                  )}

                  {filtered.length === 0 && (
                    <p className="mt-8 text-base-content/60 animate-fade-in">
                      Brak wyników. Spróbuj ponownie.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
