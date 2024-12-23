import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { 
  FaBrain
} from 'react-icons/fa';

// Root Component with Dynamic Navigation
const RootComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-gray-900 text-gray-100">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <FaBrain className="text-2xl text-purple-400" />
              <span className="font-bold text-xl">GameTheory.gg</span>
            </Link>
            <div className="flex space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/games">Games</NavLink>
              <NavLink to="/learn">Learn</NavLink>
              <NavLink to="/challenge">Challenge</NavLink>
              <NavLink to="/about">About</NavLink>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
})

// Reusable Components
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="hover:text-purple-400 transition-colors duration-200"
    activeProps={{
      className: 'text-purple-400 font-semibold'
    }}
  >
    {children}
  </Link>
);