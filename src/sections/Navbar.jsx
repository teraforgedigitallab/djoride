import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CarTaxiFront, LogIn } from 'lucide-react';
import Button from '../components/Button';
import { Link, useLocation } from 'react-router-dom';

export function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return null;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const location = useLocation();

  // Use a ref to track if the active link was set by clicking
  const clickedNavRef = useRef(false);
  // Timeout ref to clear previous timeouts
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Only update active link based on scroll if it wasn't recently clicked
      if (!clickedNavRef.current) {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;

        sections.forEach(section => {
          const sectionHeight = section.offsetHeight;
          const sectionTop = section.offsetTop - 100;
          const sectionId = section.getAttribute('id');

          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            setActiveLink(sectionId);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Helper to get absolute hash links for homepage sections
  const getSectionLink = (id) => `/#${id}`;

  // Handle link click with improved animation control
  const handleLinkClick = (id) => {
    // Set active link immediately to avoid flickering
    setActiveLink(id);

    // Set clicked flag to true to prevent scroll handler from changing it
    clickedNavRef.current = true;

    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Reset the clicked flag after the scroll animation completes
    timeoutRef.current = setTimeout(() => {
      clickedNavRef.current = false;
    }, 1000); // Scroll animation typically takes around 1 second
  };

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-background/95 backdrop-blur-md shadow-lg shadow-primary/5' : 'py-5 bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <ScrollToHash />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mr-10"
            >
              <Link to="/" className="flex items-center">
                <div className="relative">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <CarTaxiFront size={20} className="text-white" />
                  </div>
                </div>
                <span className="ml-2 text-2xl font-extrabold text-primary">DJO<span className="text-secondary">Ride</span></span>
              </Link>
            </motion.div>

            <div className="hidden lg:flex space-x-1">
              <AnimatePresence mode="sync">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={getSectionLink(link.id)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 relative ${activeLink === link.id ? 'text-primary' : 'text-text hover:text-primary'}`}
                    onClick={() => handleLinkClick(link.id)}
                  >
                    {link.name}
                    {activeLink === link.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-primary rounded-full w-full"
                        layoutId="activeNavIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                          duration: 0.35
                        }}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </Link>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden lg:flex gap-2 align-center justify-center">
            <Link to="/book">
              <Button
                variant="primary"
                size="sm"
                className="flex items-center gap-2 w-full md:w-auto !p-2.5"
              >
                Book Now
              </Button>
            </Link>

            <Link to="/login">
              <Button
                className="flex items-center gap-2"
                size='sm'
                variant="outline"
              >
                Login
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
                >
                  <LogIn size={18} className="transform" />
                </motion.div>
              </Button>
            </Link>
          </div>

          <motion.div
            className="lg:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-primary/10 text-primary"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden mt-4 bg-white rounded-xl shadow-xl overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="py-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={getSectionLink(link.id)}
                    className={`block px-6 py-3 transition-colors duration-200 ${activeLink === link.id ? 'bg-primary/10 text-primary font-medium' : 'text-text'}`}
                    onClick={() => {
                      setIsOpen(false);
                      handleLinkClick(link.id);
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="px-5 pt-3 pb-4 border-t border-gray-100 mt-3 flex flex-col align-center justify-center gap-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button
                      className="flex items-center gap-2 w-full"
                      size='sm'
                      variant="outline"
                    >
                      Login
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
                      >
                        <LogIn size={18} className="transform" />
                      </motion.div>
                    </Button>
                  </Link>

                  <Link to="/book" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="px-5 flex items-center gap-2 w-full !py-2.5"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;