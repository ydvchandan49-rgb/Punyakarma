import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for shrinking navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'About', path: '/#about' },
    { name: 'Admin Login', path: '/admin' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 px-4 ${scrolled ? 'top-2' : 'top-6'}`}
    >
      <div className="max-w-6xl mx-auto relative">
        <div className={`
          relative flex items-center justify-between px-6 
          bg-primary/95 backdrop-blur-md rounded-full shadow-2xl
          border border-white/10 transition-all duration-300
          ${scrolled ? 'py-2' : 'py-3'}
        `}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-50 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-3xl filter drop-shadow-md"
            >
              🕉️
            </motion.div>
            <span className="text-white font-bold text-xl tracking-wide hidden sm:block group-hover:text-amber-200 transition-colors">
              HolyBath
            </span>
          </Link>

          {/* Desktop Links (Pill-in-Pill style) */}
          <div className="hidden md:flex items-center gap-1 bg-white/10 p-1.5 rounded-full">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path.includes('#') && location.hash === link.path.substring(1));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive ? 'text-primary bg-white shadow-md' : 'text-white hover:bg-white/20'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Call to Action & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50">
            <Link
              to="/booking"
              className="hidden md:block bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 px-6 py-2.5 rounded-full font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all duration-300 hover:scale-105"
            >
              Book Now
            </Link>

          {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2 focus:outline-none"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <motion.span animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-white block transition-all"></motion.span>
                <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-full h-0.5 bg-white block transition-all"></motion.span>
                <motion.span animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-full h-0.5 bg-white block transition-all"></motion.span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-4 p-4 bg-primary/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 md:hidden flex flex-col gap-2"
            >
              {[...navLinks, { name: 'Book Now', path: '/booking', isCta: true }].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-center py-3 rounded-xl transition-all font-medium text-lg ${
                    link.isCta ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold shadow-lg mt-2' : 'text-white hover:bg-white/20'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;