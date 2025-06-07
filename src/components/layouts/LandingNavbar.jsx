'use client';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Briefcase } from 'lucide-react';
import Logo from '../../assets/logo/cc.png';

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
            {/* <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center"> */}
            {/* <Briefcase className="w-5 h-5 text-white" /> */}
            <img src={Logo} alt="CareerCrafter Logo" className="h-8 w-8" />
            {/* </div> */}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent">
              CareerCrafter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <Link to="/" className="font-medium text-gray-700 hover:text-purple-600">
              Home
            </Link>
            <Link
              to="/job-seeker/search-jobs"
              className="font-medium text-gray-700 hover:text-purple-600"
            >
              Find Jobs
            </Link>
            <Link to="/about" className="font-medium text-gray-700 hover:text-purple-600">
              About
            </Link>
            <Link to="/support" className="font-medium text-gray-700 hover:text-purple-600">
              Support
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden items-center space-x-4 md:flex">
            {isAuthenticated ? (
              <div className="group relative">
                <button className="flex items-center space-x-2 font-medium text-gray-700 hover:text-purple-600">
                  <User className="h-5 w-5" />
                  <span>Account</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute right-0 z-10 mt-2 hidden w-48 rounded-md bg-white py-2 shadow-lg group-hover:block">
                  <Link
                    to={userRole === 'employer' ? '/employer/dashboard' : '/job-seeker/dashboard'}
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={userRole === 'employer' ? '/employer/profile' : '/job-seeker/profile'}
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-50"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-purple-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* <Link to="/login" className="text-gray-700 hover:text-purple-600 font-medium">
                  Login
                </Link> */}
                <Link
                  to="/register"
                  className="inline-block rounded border border-indigo-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-transparent hover:text-indigo-600"
                >
                  <div className="flex space-x-1">
                    <User className="h-5 w-5" />
                    <p>Sign In</p>
                  </div>
                </Link>
              </>
            )}
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
              <Link
                to="/"
                className="font-medium text-gray-700 hover:text-purple-600"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/job-seeker/search-jobs"
                className="font-medium text-gray-700 hover:text-purple-600"
                onClick={toggleMenu}
              >
                Find Jobs
              </Link>

              <Link
                to="/contact"
                className="font-medium text-gray-700 hover:text-purple-600"
                onClick={toggleMenu}
              >
                Support
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to={userRole === 'employer' ? '/employer/dashboard' : '/job-seeker/dashboard'}
                    className="font-medium text-gray-700 hover:text-purple-600"
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={userRole === 'employer' ? '/employer/profile' : '/job-seeker/profile'}
                    className="font-medium text-gray-700 hover:text-purple-600"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-left font-medium text-gray-700 hover:text-purple-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="font-medium text-gray-700 hover:text-purple-600"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link to="/register" className="btn-secondary text-center" onClick={toggleMenu}>
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingNavbar;
