'use client';

import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  User,
  CircleArrowOutDownRightIcon,
  ArrowDown,
  BriefcaseBusinessIcon,
  LayoutDashboardIcon,
  PodcastIcon,
  BoxSelect,
  BookText,
  Drumstick,
  SearchCode,
  Subtitles,
} from 'lucide-react';
import Logo from '../../assets/logo/cc.png';
import { HashLink } from 'react-router-hash-link';
import UserService from '../../service/UserService';
import AuthContext from '../../context/AuthProvider';
import { toast } from 'react-toastify';

const EmployerNavbar = ({ isAuthenticated, userRole, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { setAuth, auth } = useContext(AuthContext);
  const userService = new UserService(auth?.accessToken);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await userService.getCurrentUser();
      console.log(response);
      setCurrentUser(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem('auth');
    toast.success('Logged out successfully!');
    navigate('/');
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              to="/employer/dashboard"
              className="font-medium text-gray-500 hover:text-purple-600"
            >
              <div className="flex items-center space-x-1">
                <div>
                  <LayoutDashboardIcon />
                </div>
                <div>Dashboard</div>
              </div>
            </HashLink>

            <HashLink
              smooth
              to="/employer/post-job"
              className="font-medium text-gray-500 hover:text-purple-600"
            >
              <div className="flex items-center space-x-1">
                <div>
                  <Subtitles />
                </div>
                <div>Post Jobs</div>
              </div>
            </HashLink>

            <HashLink
              smooth
              to="/employer/view-applications"
              className="font-medium text-gray-500 hover:text-purple-600"
            >
              <div className="flex items-center space-x-1">
                <div>
                  <SearchCode />
                </div>
                <div>View Applications</div>
              </div>
            </HashLink>
          </nav>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="relative inline-block text-left">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center space-x-1 rounded border border-indigo-600 bg-white px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-gray-50"
              >
                <User className="h-5 w-5" />
                <span>{userRole === 'employer' ? `${currentUser.userName}` : 'Admin  '}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isMenuOpen && (
                <div className="animate-fade-in-down absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5">
                  <div className="py-1">
                    <Link
                      to="/employer/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:bg-purple-50 hover:text-purple-700"
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/employer/manage-jobs"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:bg-purple-50 hover:text-purple-700"
                    >
                      <BriefcaseBusinessIcon className="h-4 w-4" />
                      <span>Manage Jobs</span>
                    </Link>
                    {/* <Link
                      to="/employer/support"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 transition-all duration-150 hover:bg-purple-50 hover:text-purple-700"
                    >
                      <CircleArrowOutDownRightIcon className="h-4 w-4" />
                      <span>Support</span>
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 transition-all duration-150 hover:bg-red-50 hover:text-red-700"
                    >
                      <ArrowDown className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-block rounded border border-indigo-600 bg-white px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-gray-50"
            >
              Sign In
            </Link>
          )}

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

export default EmployerNavbar;
