import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Cross, Heart, Mail, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-[#F4F6F8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a href="mailto:info@divineretreats.org" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#D4A937] transition-colors">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">info@divineretreats.org</span>
            </a>
            <a href="tel:+11234567890" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#D4A937] transition-colors">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+1 (123) 456-7890</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#D4A937] transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#D4A937] transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#D4A937] transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#D4A937] transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A937] to-[#A7C7E7] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Cross className="w-7 h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-xl text-gray-900">Divine Retreat</div>
                <div className="text-xs text-gray-500">Come and Rest</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About Divine</NavLink>
              <NavLink to="/retreats">Retreats</NavLink>
              <NavLink to="/media">Media Ministry</NavLink>
              <NavLink to="/charities">Charities</NavLink>
              <NavLink to="/support">Support Us</NavLink>
              <NavLink to="/soul-food">Soul Food</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </nav>

            {/* Donate Button & Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link to="/donate">
                <Button className="bg-[#D4A937] hover:bg-[#B88F2E] text-white shadow-md hover:shadow-lg transition-all">
                  <Heart className="w-4 h-4 mr-2" />
                  Donate
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <nav className="flex flex-col py-4">
                <MobileNavLink to="/">Home</MobileNavLink>
                <MobileNavLink to="/about">About Divine</MobileNavLink>
                <MobileNavLink to="/retreats">Retreats</MobileNavLink>
                <MobileNavLink to="/media">Media Ministry</MobileNavLink>
                <MobileNavLink to="/charities">Charities</MobileNavLink>
                <MobileNavLink to="/support">Support Us</MobileNavLink>
                <MobileNavLink to="/soul-food">Soul Food</MobileNavLink>
                <MobileNavLink to="/contact">Contact</MobileNavLink>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h3 className="mb-4 text-gray-900">About Us</h3>
              <p className="text-sm text-gray-600 mb-4">
                A place of spiritual renewal and divine encounter. Experience God's love through our retreats, prayer, and ministry.
              </p>
              <div className="flex gap-3">
                <a href="https://facebook.com" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#D4A937] hover:border-[#D4A937] hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://twitter.com" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#D4A937] hover:border-[#D4A937] hover:text-white transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="https://instagram.com" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#D4A937] hover:border-[#D4A937] hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#D4A937] hover:border-[#D4A937] hover:text-white transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-gray-900">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-600 hover:text-[#D4A937] transition-colors">About Divine</Link></li>
                <li><Link to="/retreats" className="text-gray-600 hover:text-[#D4A937] transition-colors">Upcoming Retreats</Link></li>
                <li><Link to="/media" className="text-gray-600 hover:text-[#D4A937] transition-colors">Watch Live</Link></li>
                <li><Link to="/charities" className="text-gray-600 hover:text-[#D4A937] transition-colors">Our Charities</Link></li>
                <li><Link to="/soul-food" className="text-gray-600 hover:text-[#D4A937] transition-colors">Soul Food Blog</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 text-gray-900">Contact Us</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a href="mailto:info@divineretreats.org" className="hover:text-[#D4A937] transition-colors">
                    info@divineretreats.org
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <a href="tel:+11234567890" className="hover:text-[#D4A937] transition-colors">
                    +1 (123) 456-7890
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Cross className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>123 Divine Way, Holy City, HC 12345</span>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 text-gray-900">Support Our Mission</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your generous donation helps us continue our ministry and reach more souls.
              </p>
              <Link to="/donate">
                <Button className="w-full bg-[#D4A937] hover:bg-[#B88F2E] text-white">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300 pt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">
              "For where two or three gather in my name, there am I with them." — Matthew 18:20
            </p>
            <p className="text-xs text-gray-500">
              © 2024 Divine Retreat Centre. All rights reserved. Built with faith and love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'text-[#D4A937]'
          : 'text-gray-700 hover:text-[#D4A937] hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-6 py-3 transition-colors ${
        isActive
          ? 'text-[#D4A937] bg-[#F4F6F8]'
          : 'text-gray-700 hover:text-[#D4A937] hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
}
