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
            <p className="mx-auto max-w-xl text-lg text-gray-600">
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

          {/* Contact Support */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-gray-600">Still can't find what you're looking for?</p>
            <a
              href="/jobseeker/support"
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
