import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold">CareerCrafter</h3>
            <p className="mb-4 text-gray-400">
              Building careers and connecting talent with opportunities worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/job-seeker/search-jobs"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/employer/post-job"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/job-seeker/dashboard"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/job-seeker/profile"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/job-seeker/resume"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Resume Manager
                </Link>
              </li>
              <li>
                <Link
                  to="/job-seeker/applications"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  My Applications
                </Link>
              </li>
              <li>
                <Link
                  to="/career-advice"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Career Advice
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-purple-400" />
                <span className="text-gray-400">
                  123 Career Street, Suite 200
                  <br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 flex-shrink-0 text-purple-400" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 flex-shrink-0 text-purple-400" />
                <span className="text-gray-400">info@careercrafter.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CareerCrafter. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link to="/cookies" className="transition-colors hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
