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
