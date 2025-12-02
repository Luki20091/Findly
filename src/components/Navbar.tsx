import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <div className="navbar px-6 md:px-10 text-base-content">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl pl-2">
          <i className="fas fa-search mr-2 text-xl"></i>
          Findly
        </a>
      </div>
      
      <div className="navbar-end gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
}
