'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Briefcase,
  X,
  CheckCircle,
  Heart,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Star,
  Sliders,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const FindJobs = () => {
  // Sample data with enhanced information
  const allJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      companyLogo: '/placeholder.svg?height=60&width=60',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120K - $150K',
      tags: ['React', 'TypeScript', 'UI/UX'],
      description:
        "We're looking for a Senior Frontend Developer to join our team and help build beautiful, responsive web applications.",
      postedDate: '2 days ago',
      applicants: 24,
      featured: true,
      remote: false,
      urgent: false,
      rating: 4.8,
      benefits: ['Health Insurance', 'Remote Work', '401k'],
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'InnovateTech',
      companyLogo: '/placeholder.svg?height=60&width=60',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110K - $140K',
      tags: ['Product', 'Agile', 'SaaS'],
      description:
        'Join our product team to lead the development of innovative software solutions that solve real customer problems.',
      postedDate: '1 week ago',
      applicants: 18,
      featured: false,
      remote: true,
      urgent: true,
      rating: 4.6,
      benefits: ['Stock Options', 'Flexible Hours', 'Learning Budget'],
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'DesignHub',
      companyLogo: '/placeholder.svg?height=60&width=60',
      location: 'Remote',
      type: 'Contract',
      salary: '$80K - $100K',
      tags: ['Figma', 'UI Design', 'User Research'],
      description:
        "We're seeking a talented UX/UI Designer to create intuitive and engaging user experiences for our digital products.",
      postedDate: '3 days ago',
      applicants: 32,
      featured: true,
      remote: true,
      urgent: false,
      rating: 4.9,
      benefits: ['Creative Freedom', 'Top Equipment', 'Conference Budget'],
    },
    {
      id: 4,
      title: 'Backend Developer',
      company: 'ServerStack',
      companyLogo: '/placeholder.svg?height=60&width=60',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$130K - $160K',
      tags: ['Node.js', 'Python', 'AWS'],
      description:
        'Looking for an experienced Backend Developer to build scalable and secure APIs and services.',
      postedDate: '5 days ago',
      applicants: 15,
      featured: false,
      remote: false,
      urgent: false,
      rating: 4.7,
      benefits: ['Health Insurance', 'Gym Membership', 'Catered Meals'],
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      companyLogo: '/placeholder.svg?height=60&width=60',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$125K - $155K',
      tags: ['Docker', 'Kubernetes', 'CI/CD'],
      description:
        'Join our DevOps team to build and maintain our cloud infrastructure and deployment pipelines.',
      postedDate: '1 week ago',
      applicants: 28,
      featured: false,
      remote: true,
      urgent: true,
      rating: 4.5,
      benefits: ['Stock Options', 'Remote Work', 'Professional Development'],
    },
  ];

  const [jobs, setJobs] = useState(allJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [filters, setFilters] = useState({
    jobType: [],
    salary: [],
    datePosted: 'any',
    experienceLevel: [],
    remote: false,
    featured: false,
  });

  // Filter options
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const salaryRanges = ['$0 - $50K', '$50K - $100K', '$100K - $150K', '$150K+'];
  const datePostedOptions = [
    { value: 'any', label: 'Any time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
  ];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

  const toggleSaveJob = jobId => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const toggleFilter = (category, value) => {
    setFilters(prevFilters => {
      if (category === 'remote' || category === 'featured') {
        return {
          ...prevFilters,
          [category]: !prevFilters[category],
        };
      }

      const currentFilters = [...prevFilters[category]];
      if (currentFilters.includes(value)) {
        return {
          ...prevFilters,
          [category]: currentFilters.filter(item => item !== value),
        };
      } else {
        return {
          ...prevFilters,
          [category]: [...currentFilters, value],
        };
      }
    });
  };

  const setDatePosted = value => {
    setFilters(prevFilters => ({
      ...prevFilters,
      datePosted: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      jobType: [],
      salary: [],
      datePosted: 'any',
      experienceLevel: [],
      remote: false,
      featured: false,
    });
    setSearchTerm('');
    setLocation('');
  };

  const handleSearch = () => {
    let filteredJobs = [...allJobs];

    // Filter by search term
    if (searchTerm) {
      filteredJobs = filteredJobs.filter(
        job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by location
    if (location) {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by remote
    if (filters.remote) {
      filteredJobs = filteredJobs.filter(job => job.remote);
    }

    // Filter by featured
    if (filters.featured) {
      filteredJobs = filteredJobs.filter(job => job.featured);
    }

    // Other filters...
    if (filters.jobType.length > 0) {
      filteredJobs = filteredJobs.filter(job => filters.jobType.includes(job.type));
    }

    setJobs(filteredJobs);
  };

  // Run search when filters change
  useEffect(() => {
    handleSearch();
  }, [filters]);

  const EnhancedJobCard = ({ job }) => (
    <div
      className={
        'group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl'
      }
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={job.companyLogo || '/placeholder.svg'}
              alt={`${job.company} logo`}
              className="h-14 w-14 rounded-lg object-cover shadow-sm"
            />
            <div className="absolute -right-1 -bottom-1 rounded-full bg-green-500 p-1">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-purple-600">
              {job.title}
            </h3>
            <p className="mb-2 text-base font-medium text-gray-700">{job.company}</p>

            <div className="mb-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-1 h-3.5 w-3.5" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="mr-1 h-3.5 w-3.5" />
                <span className="text-sm">{job.type}</span>
              </div>
              <div className="flex items-center text-green-600">
                <DollarSign className="mr-1 h-3.5 w-3.5" />
                <span className="text-sm font-medium">{job.salary}</span>
              </div>
            </div>

            <p className="mb-4 line-clamp-2 text-sm text-gray-600">{job.description}</p>

            <div className="mb-4 flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2"></div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center space-x-8">
          <div className="flex items-center text-gray-500">
            <Clock className="mr-1 h-3.5 w-3.5" />
            <span className="text-xs">{job.postedDate}</span>
          </div>
          <div className="mt-1 flex items-center text-gray-500">
            <Users className="mr-1 h-3.5 w-3.5" />
            <span className="text-xs">{job.applicants} applicants</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link
            to={`/jobseeker/job/${job.id}`}
            className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            View Details
          </Link>
          <Link
            to={`/jobseeker/job/${job.id}`}
            className="rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm text-white transition-all hover:shadow-md"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Helmet>
        <title>Find Jobs - CareerCrafter</title>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            {/* <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Job</h1> */}
            <p className="mb-8 text-xl text-purple-100">
              Discover opportunities that match your skills and aspirations
            </p>

            {/* Enhanced Search Bar */}
            <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title, keywords"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                  />
                </div>
                <button
                  className="flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:shadow-lg"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search Jobs
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-purple-100"
                >
                  <Sliders className="mr-2 h-4 w-4" />
                  Advanced Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-24">
        {/* Advanced Filters */}
        {showFilters && (
          <div className="mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
              <button
                onClick={clearFilters}
                className="font-medium text-purple-600 hover:text-purple-700"
              >
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {/* Job Type */}
              <div>
                <h4 className="mb-3 flex items-center font-medium text-gray-900">
                  <Briefcase className="mr-2 h-4 w-4 text-purple-600" />
                  Job Type
                </h4>
                <div className="space-y-3">
                  {jobTypes.map(type => (
                    <label key={type} className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={() => toggleFilter('jobType', type)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <h4 className="mb-3 flex items-center font-medium text-gray-900">
                  <DollarSign className="mr-2 h-4 w-4 text-green-600" />
                  Salary Range
                </h4>
                <div className="space-y-3">
                  {salaryRanges.map(range => (
                    <label key={range} className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={filters.salary.includes(range)}
                        onChange={() => toggleFilter('salary', range)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Posted */}
              <div>
                <h4 className="mb-3 flex items-center font-medium text-gray-900">
                  <Clock className="mr-2 h-4 w-4 text-blue-600" />
                  Date Posted
                </h4>
                <div className="space-y-3">
                  {datePostedOptions.map(option => (
                    <label key={option.value} className="flex cursor-pointer items-center">
                      <input
                        type="radio"
                        checked={filters.datePosted === option.value}
                        onChange={() => setDatePosted(option.value)}
                        className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h4 className="mb-3 flex items-center font-medium text-gray-900">
                  <TrendingUp className="mr-2 h-4 w-4 text-orange-600" />
                  Experience Level
                </h4>
                <div className="space-y-3">
                  {experienceLevels.map(level => (
                    <label key={level} className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={filters.experienceLevel.includes(level)}
                        onChange={() => toggleFilter('experienceLevel', level)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
            </h2>
            <p className="mt-1 text-gray-600">Showing the best matches for your search</p>
          </div>

          <div className="mt-4 flex items-center space-x-4 md:mt-0">
            <div className="flex items-center">
              <span className="mr-3 text-sm text-gray-600">Sort by:</span>
              <select className="rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none">
                <option>Most Relevant</option>
                <option>Newest</option>
                <option>Salary: High to Low</option>
                <option>Salary: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.jobType.length > 0 ||
          filters.salary.length > 0 ||
          filters.datePosted !== 'any' ||
          filters.experienceLevel.length > 0 ||
          filters.remote ||
          filters.featured ||
          searchTerm ||
          location) && (
          <div className="mb-6 rounded-xl border border-gray-100 bg-white p-4 shadow-md">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <div className="flex items-center rounded-full bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700">
                  <span>Keyword: {searchTerm}</span>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 text-purple-700 hover:text-purple-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {location && (
                <div className="flex items-center rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700">
                  <span>Location: {location}</span>
                  <button
                    onClick={() => setLocation('')}
                    className="ml-2 text-blue-700 hover:text-blue-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {filters.featured && (
                <div className="flex items-center rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700">
                  <span>Featured Jobs</span>
                  <button
                    onClick={() => toggleFilter('featured', null)}
                    className="ml-2 text-yellow-700 hover:text-yellow-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Other active filters... */}
              {filters.jobType.map(type => (
                <div
                  key={type}
                  className="flex items-center rounded-full bg-purple-100 px-3 py-1.5 text-sm font-medium text-purple-700"
                >
                  <span>{type}</span>
                  <button
                    onClick={() => toggleFilter('jobType', type)}
                    className="ml-2 text-purple-700 hover:text-purple-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-6 space-y-6 sm:grid-cols-2">
          {jobs.length > 0 ? (
            jobs.map(job => <EnhancedJobCard key={job.id} job={job} />)
          ) : (
            <div className="rounded-xl bg-white py-16 text-center shadow-md">
              <div className="mx-auto max-w-md">
                <Briefcase className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">No jobs found</h3>
                <p className="mb-6 text-gray-600">
                  Try adjusting your search criteria or explore different keywords to find more
                  opportunities.
                </p>
                <button
                  onClick={clearFilters}
                  className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {/* {jobs.length > 0 && (
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium">
                1
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                3
              </button>
              <span className="px-4 py-2 text-gray-500">...</span>
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                10
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </nav>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FindJobs;
