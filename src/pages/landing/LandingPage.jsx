'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Briefcase,
  Users,
  Building,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

import backgroundImage from '../../assets/images/background.png';

import { Helmet } from 'react-helmet-async';

import JobCard from '../../components/common/JobCard';
import AboutPage from '../../components/landing/AboutPage';

const LandingPage = () => {
  // Sample featured jobs
  const featuredJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120K - $150K',
      tags: ['React', 'TypeScript', 'UI/UX'],
      description:
        "We're looking for a Senior Frontend Developer to join our team and help build beautiful, responsive web applications.",
      postedDate: '2 days ago',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'InnovateTech',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110K - $140K',
      tags: ['Product', 'Agile', 'SaaS'],
      description:
        'Join our product team to lead the development of innovative software solutions that solve real customer problems.',
      postedDate: '1 week ago',
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'DesignHub',
      location: 'Remote',
      type: 'Contract',
      salary: '$80K - $100K',
      tags: ['Figma', 'UI Design', 'User Research'],
      description:
        "We're seeking a talented UX/UI Designer to create intuitive and engaging user experiences for our digital products.",
      postedDate: '3 days ago',
    },
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <Helmet>
        <title>CareerCrafter - Where Talent Meets Opportunity </title>
      </Helmet>

      <section
        id="home"
        className="flex flex-col items-center justify-between bg-[#f6f6f645] px-6 py-20 text-gray-900 md:flex-row md:px-24 md:py-20"
      >
        {/* Left: Text content */}
        <div className="mb-10 w-full text-center md:mb-0 md:w-1/2 md:text-left">
          <h1 className="mb-6 bg-indigo-600 bg-clip-text text-4xl leading-tight font-extrabold text-transparent md:text-5xl lg:text-6xl">
            Build Careers. Hire Talent.
          </h1>
          <p className="mb-8 text-lg text-gray-600 md:text-xl">
            Connect with the best opportunities and find the perfect candidates for your team.
          </p>
          <Link
            to="/login"
            className="focus:ring-opacity-50 flex w-[220px] items-center justify-center space-x-4 rounded-md border border-purple-600 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none sm:w-[220px]"
          >
            <span>To Explore Jobs</span>
            <ArrowRight />
          </Link>
        </div>

        {/* Right: Background image */}
        <div className="flex w-[100%] justify-center md:w-1/2">
          <img
            src={backgroundImage}
            alt="CareerCrafter Illustration"
            className="h-auto max-w-full object-contain"
          />
        </div>
      </section>

      {/* <div className="w-full border-t-2 border-dashed border-gray-400 my-20" /> */}

      {/* Search Bar */}
      <section className="md:24 relative z-10 container mx-auto -mt-12 bg-[#f6f6f645] px-8 sm:px-48">
        <div className="rounded-lg bg-white p-6 shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>
            <button className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutPage />

      {/* Featured Jobs Section */}
      <section className="md:24 bg-gray-50 bg-gradient-to-b from-purple-50 to-purple-50 px-8 py-20 sm:px-28">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent">
              Featured Jobs
            </h2>
            <Link
              to="/job-seeker/search-jobs"
              className="font-medium text-indigo-600 hover:underline"
            >
              View All Jobs →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 px-4 py-16 text-white md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to find your dream job?</h2>
          <p className="mb-8 text-xl opacity-90">
            Join thousands of professionals who are discovering new opportunities every day
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-white px-8 py-3 font-bold text-purple-700 shadow-lg transition-colors hover:bg-purple-50">
              Get Started Now
            </button>
            <button className="rounded-full border-2 border-white bg-transparent px-8 py-3 font-bold transition-colors hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
