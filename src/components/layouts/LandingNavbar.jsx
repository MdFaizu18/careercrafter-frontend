'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Briefcase } from 'lucide-react';
import Logo from '../../assets/logo/cc.png';
import { HashLink } from 'react-router-hash-link';

const LandingNavbar = ({ isAuthenticated, userRole, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-16 py-4">
        <div className="flex h-[30px] items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="CareerCrafter Logo" className="h-8 w-8" />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent">
              CareerCrafter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <HashLink
              smooth
              to="/#home"
              className="font-medium text-gray-700 hover:text-purple-600"
            >
              Home
            </HashLink>

            <HashLink
              smooth
              to="/#about"
              className="font-medium text-gray-700 hover:text-purple-600"
            >
              About
            </HashLink>

            <HashLink
              smooth
              to="/#features"
              className="font-medium text-gray-700 hover:text-purple-600"
            >
              Features
            </HashLink>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            <Link
              to="/login"
              className="inline-block rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-transparent hover:text-indigo-600"
            >
              <div className="flex space-x-1">
                <User className="h-5 w-5" />
                <p>Sign In</p>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-4 border-t border-gray-200 py-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              <HashLink
                smooth
                to="#home"
                className="font-medium text-gray-700 hover:text-purple-600"
              >
                Home
              </HashLink>

              <HashLink
                smooth
                to="#about"
                className="font-medium text-gray-700 hover:text-purple-600"
              >
                About
              </HashLink>

              <HashLink
                smooth
                to="#features"
                className="font-medium text-gray-700 hover:text-purple-600"
              >
                Features
              </HashLink>

              <Link to="/login" className="btn-secondary text-center" onClick={toggleMenu}>
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingNavbar;
