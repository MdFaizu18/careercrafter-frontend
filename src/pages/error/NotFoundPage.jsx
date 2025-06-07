'use client';

import { useState, useEffect } from 'react';
import {
  Home,
  Search,
  ArrowLeft,
  Briefcase,
  Users,
  TrendingUp,
  Mail,
  RefreshCw,
} from 'lucide-react';

export default function NotFoundPage() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Create floating elements for background animation
    const elements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setFloatingElements(elements);
  }, []);

  const handleRefresh = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      window.location.reload();
    }, 1000);
  };

  const popularPages = [
    { name: 'Find Jobs', icon: Briefcase, href: '/jobs' },
    { name: 'Dashboard', icon: TrendingUp, href: '/dashboard' },
    { name: 'Profile', icon: Users, href: '/profile' },
    { name: 'Support', icon: Mail, href: '/support' },
  ];

  const jobSearchTerms = [
    'Software Engineer',
    'Product Manager',
    'Data Scientist',
    'UX Designer',
    'Marketing Manager',
    'Sales Representative',
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50">
      {/* Floating Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingElements.map(element => (
          <div
            key={element.id}
            className="absolute h-20 w-20 opacity-10"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          >
            <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-purple-400 to-indigo-400"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated 404 */}
          <div className="mb-8">
            <div className="relative inline-block">
              <h1 className="animate-pulse bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
                404
              </h1>

              {/* Animated briefcase icon */}
              <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8">
                <div
                  className={`transform transition-all duration-1000 ${isAnimating ? 'scale-125 rotate-360' : 'scale-100 rotate-0'}`}
                >
                  <Briefcase className="h-12 w-12 animate-bounce text-purple-500 md:h-16 md:w-16" />
                </div>
              </div>
            </div>
          </div>

          {/* Creative Message */}
          <div className="mb-8 space-y-4">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Oops! This page is on a{' '}
              <span className="relative text-purple-600">
                career break
                <div className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-purple-400 to-indigo-400"></div>
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Looks like this page decided to pursue other opportunities. Don't worry though - we'll
              help you find exactly what you're looking for!
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto mb-12 max-w-2xl">
            <div className="relative">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for jobs, pages, or anything..."
                className="w-full rounded-xl border-2 border-purple-200 bg-white/80 py-4 pr-4 pl-12 text-lg backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none"
              />
              <button className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 text-white transition-all duration-200 hover:from-purple-700 hover:to-indigo-700">
                Search
              </button>
            </div>

            {/* Popular Search Terms */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="mr-2 text-sm text-gray-500">Popular searches:</span>
              {jobSearchTerms.slice(0, 3).map((term, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(term)}
                  className="rounded-full border border-purple-200 bg-white/60 px-3 py-1 text-sm text-purple-700 transition-all duration-200 hover:border-purple-300 hover:bg-white/80"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => window.history.back()}
              className="flex transform items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-indigo-700"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              className="flex transform items-center gap-2 rounded-xl border-2 border-purple-200 bg-white px-8 py-3 font-medium text-purple-700 shadow-lg transition-all duration-200 hover:scale-105 hover:border-purple-300 hover:bg-purple-50"
            >
              <Home className="h-5 w-5" />
              Go Home
            </button>

            <button
              onClick={handleRefresh}
              disabled={isAnimating}
              className="flex transform items-center gap-2 rounded-xl bg-gray-100 px-8 py-3 font-medium text-gray-700 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-200 disabled:opacity-50"
            >
              <RefreshCw className={`h-5 w-5 ${isAnimating ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Popular Pages */}
          <div className="mb-12">
            <h3 className="mb-6 text-xl font-bold text-gray-800">
              Or explore these popular pages:
            </h3>
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
              {popularPages.map((page, index) => (
                <a
                  key={index}
                  href={page.href}
                  className="group transform rounded-xl border border-purple-100 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-300 hover:bg-white hover:shadow-lg"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 transition-all duration-300 group-hover:from-purple-200 group-hover:to-indigo-200">
                    <page.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="font-medium text-gray-800 transition-colors group-hover:text-purple-700">
                    {page.name}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Fun Stats */}
          <div className="mx-auto max-w-3xl rounded-2xl border border-purple-100 bg-white/60 p-8 backdrop-blur-sm">
            <h3 className="mb-6 text-lg font-bold text-gray-800">
              While you're here, check out these stats:
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-purple-600">50K+</div>
                <div className="text-gray-600">Jobs Posted</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-indigo-600">25K+</div>
                <div className="text-gray-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-pink-600">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-gray-600">Still can't find what you're looking for?</p>
            <a
              href="/support"
              className="inline-flex items-center gap-2 font-medium text-purple-600 underline decoration-2 underline-offset-4 transition-all duration-200 hover:text-purple-700 hover:decoration-purple-300"
            >
              <Mail className="h-4 w-4" />
              Contact our support team
            </a>
          </div>
        </div>
      </div>

      {/* Animated Background Gradient */}
      <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-br from-purple-100/20 via-transparent to-indigo-100/20"></div>
    </div>
  );
}
