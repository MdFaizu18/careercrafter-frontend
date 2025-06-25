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
  Filter,
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
  const [allJobs, setAllJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const [loading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    jobType: [],
    salary: [],
    datePosted: 'any',
    experienceLevel: [],
    remote: false,
    featured: false,
  });

  useEffect(() => {
    fetchApplications();
    fetchAllJobs();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const fetchAllJobs = async () => {
    try {
      const response = await jobService.getAllJobs();
      console.log('Fetched all jobs:', response);
      setAllJobs(response);
      setJobs(response); // Show all jobs initially
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await applicationService.getApplicationsForUser();
      console.log('Fetched applications:', response);
      setApplications(response);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
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
    setJobs(allJobs);
  };

  const handleSearch = () => {
    try {
      const filteredJobs = allJobs.filter(job => {
        const titleMatch = searchTerm.trim()
          ? job.jobTitle?.toLowerCase().includes(searchTerm.trim().toLowerCase())
          : true;

        const locationMatch = location.trim()
          ? job.location?.toLowerCase().includes(location.trim().toLowerCase())
          : true;

        return titleMatch && locationMatch;
      });

      setJobs(filteredJobs);
    } catch (error) {
      console.error('Error filtering jobs:', error);
      setJobs(allJobs); // fallback
    }
  };

  // Handle Enter key press in search inputs
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
        <div className="flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-blue-500"></div>
        </div>
        <p className="mt-4 animate-pulse text-lg font-medium text-gray-700">
          Loading, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Helmet>
        <title>Find Jobs - CareerCrafter</title>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
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
                    onKeyPress={handleKeyPress}
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
                    onKeyPress={handleKeyPress}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                  />
                </div>
                <button
                  className="flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  <Search className="mr-2 h-5 w-5" />
                  {isSearching ? 'Searching...' : 'Search Jobs'}
                </button>
                <button
                  className="flex items-center justify-center rounded-lg bg-gradient-to-r from-gray-600 to-blue-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={clearFilters}
                  disabled={isSearching}
                >
                  <Filter className="mr-2 h-5 w-5" />
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-24">
        {/* Results Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
            </h2>
            <p className="mt-1 text-gray-600">
              {searchTerm || location
                ? `Showing results for "${searchTerm}"${location ? ` in ${location}` : ''}`
                : 'Showing all available jobs'}
            </p>
          </div>
        </div>

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
                  {searchTerm || location
                    ? 'No jobs match your search criteria. Try adjusting your search terms.'
                    : 'No jobs available at the moment. Please check back later.'}
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
