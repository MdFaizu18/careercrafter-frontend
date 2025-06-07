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
} from 'lucide-react';

import backgroundImage from '../../assets/images/background.png';

import { Helmet } from 'react-helmet-async';
import SimpleTestimonial from '../../components/landing/SimpleTestimonial';
import JobCard from '../../components/common/JobCard';
import LandingNavbar from '../../components/layouts/LandingNavbar';
import LandingFooter from '../../components/layouts/LandingFooter';

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
     
      <section className="flex flex-col items-center justify-between bg-[#f6f6f645] px-6 py-20 text-gray-900 md:flex-row md:px-24 md:py-20">
        {/* Left: Text content */}
        <div className="mb-10 w-full text-center md:mb-0 md:w-1/2 md:text-left">
          <h1 className="mb-6 bg-indigo-600 bg-clip-text text-4xl leading-tight font-extrabold text-transparent md:text-5xl lg:text-6xl">
            Build Careers. Hire Talent.
          </h1>
          <p className="mb-8 text-lg text-gray-600 md:text-xl">
            Connect with the best opportunities and find the perfect candidates for your team.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Link
              to="/job-seeker/search-jobs"
              className="focus:ring-opacity-50 rounded-md border border-purple-200 bg-indigo-100 bg-white px-6 py-3 font-medium text-indigo-700 text-purple-600 shadow-md transition-all duration-200 hover:border-purple-300 hover:bg-indigo-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Find Jobs
            </Link>
            <Link
              to="/employer/post-job"
              className="focus:ring-opacity-50 rounded-md bg-indigo-700 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:bg-indigo-800 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Post Jobs
            </Link>
          </div>
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
      <section className="md:24 container mx-auto bg-[#f6f6f645] px-8 py-20 sm:px-32">
        <div className="mb-16 text-center">
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600">How CareerCrafter Works</h2> */}
          <h2 className="mb-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent">
            How CareerCrafter Works
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            We connect talented professionals with the best companies worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 text-center shadow-md transition-shadow duration-200 hover:shadow-lg">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="mb-3 text-xl font-bold">For Job Seekers</h3>
            <p className="text-gray-600">
              Create a profile, upload your resume, and apply to thousands of jobs from top
              companies worldwide.
            </p>
            <Link
              to="/register"
              className="mt-4 inline-block font-medium text-indigo-600 hover:underline"
            >
              Create Account →
            </Link>
          </div>

          <div className="duration-200text-center rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <Building className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="mb-3 text-xl font-bold">For Employers</h3>
            <p className="text-gray-600">
              Post jobs, review applications, and connect with qualified candidates that match your
              requirements.
            </p>
            <Link
              to="/register"
              className="mt-4 inline-block font-medium text-indigo-600 hover:underline"
            >
              Start Hiring →
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-md transition-shadow duration-200 hover:shadow-lg">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <Briefcase className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="mb-3 text-xl font-bold">Perfect Match</h3>
            <p className="text-gray-600">
              Our intelligent matching algorithm connects the right talent with the right
              opportunities.
            </p>
            <Link
              to="/how-it-works"
              className="mt-4 inline-block font-medium text-indigo-600 hover:underline"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

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

      {/* Testimonials Section */}
      <SimpleTestimonial />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-purple-100">
            Join thousands of professionals who have found their dream jobs through CareerCrafter.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="focus:ring-opacity-50 rounded-md border border-purple-200 bg-white px-6 py-3 font-medium text-purple-600 shadow-md transition-all duration-200 hover:border-purple-300 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Create Account
            </Link>
            <Link
              to="/job-seeker/search-jobs"
              className="focus:ring-opacity-50 rounded-md bg-indigo-700 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:bg-indigo-800 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
