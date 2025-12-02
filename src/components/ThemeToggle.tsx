import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="btn btn-sm btn-ghost rounded-full w-10 h-10 p-0"
    >
      {theme === 'dark' ? (
        <i className="fas fa-moon text-xl"></i>
      ) : (
        <i className="fas fa-sun text-xl text-black-500"></i>
      )}
    </button>
  );
}
