import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full py-4 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/0bec4c11-b6f4-42a0-af4b-2c4cb2782ab4.png"
            alt="Trophic Cascade Logo"
            className="h-12"
          />
          <span className="font-serif text-2xl font-medium">Trophic Cascade</span>
        </a>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#bio" className="nav-link">Bio</a>
          <a href="#credentials" className="nav-link">Credentials</a>
          <a href="#contact" className="btn-primary">Contact</a>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-cascade-gray-dark hover:text-cascade-blue transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute w-full py-4 shadow-md animate-fade-in">
          <div className="container-custom flex flex-col space-y-3">
            <a href="#bio" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Bio</a>
            <a href="#credentials" className="nav-link py-2" onClick={() => setIsMenuOpen(false)}>Credentials</a>
            <a href="#contact" className="btn-primary inline-block text-center" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
