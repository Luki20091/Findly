export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-base-300 rounded ${className}`}
      aria-hidden="true"
    />
  );
}
