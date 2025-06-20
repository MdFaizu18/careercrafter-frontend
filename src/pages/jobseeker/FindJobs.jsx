'use client';

import { useState, useEffect, use, useContext } from 'react';
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
import JobService from '../../service/JobService';
import AuthContext from '../../context/AuthProvider';
import EnhancedJobCard from '../../components/common/EnhancedJobCard';
import ApplicationService from '../../service/ApplicationService';

const FindJobs = () => {
  const { auth } = useContext(AuthContext);
  const jobService = new JobService(auth?.accessToken);
  const applicationService = new ApplicationService(auth?.accessToken);

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [applications, setApplications] = useState([]);
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

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);
  const fetchJobs = async () => {
    try {
      const response = await jobService.getAllJobs();
      console.log('Fetched jobs:', response);
      setJobs(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  const fetchApplications = async () => {
    try {
      const response = await applicationService.getApplicationsForUser();
      console.log('Fetched jobs:', response);
      setApplications(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
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
    let filteredJobs = [...jobs];

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
            jobs.map(job => <EnhancedJobCard key={job.id} job={job} applications={applications} />)
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
      </div>
    </div>
  );
};

export default FindJobs;
