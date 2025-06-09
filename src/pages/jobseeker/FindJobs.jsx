'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Filter, X, ChevronDown, CheckCircle } from 'lucide-react';
import JobCard from '../../components/common/JobCard';

const FindJobs = () => {
  // Sample data
  const allJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      companyLogo: '/placeholder.svg?height=40&width=40',
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
      companyLogo: '/placeholder.svg?height=40&width=40',
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
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'Remote',
      type: 'Contract',
      salary: '$80K - $100K',
      tags: ['Figma', 'UI Design', 'User Research'],
      description:
        "We're seeking a talented UX/UI Designer to create intuitive and engaging user experiences for our digital products.",
      postedDate: '3 days ago',
    },
    {
      id: 4,
      title: 'Backend Developer',
      company: 'ServerStack',
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'Boston, MA',
      type: 'Full-time',
      salary: '$130K - $160K',
      tags: ['Node.js', 'Python', 'AWS'],
      description:
        'Looking for an experienced Backend Developer to build scalable and secure APIs and services.',
      postedDate: '5 days ago',
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'CloudTech',
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$125K - $155K',
      tags: ['Docker', 'Kubernetes', 'CI/CD'],
      description:
        'Join our DevOps team to build and maintain our cloud infrastructure and deployment pipelines.',
      postedDate: '1 week ago',
    },
    {
      id: 6,
      title: 'Data Scientist',
      company: 'DataInsights',
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'Remote',
      type: 'Full-time',
      salary: '$115K - $145K',
      tags: ['Python', 'Machine Learning', 'SQL'],
      description:
        "We're looking for a Data Scientist to help us extract insights from our data and build predictive models.",
      postedDate: '2 weeks ago',
    },
    {
      id: 7,
      title: 'Mobile Developer',
      company: 'AppWorks',
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$100K - $130K',
      tags: ['React Native', 'iOS', 'Android'],
      description:
        'Join our mobile team to build cross-platform applications that deliver exceptional user experiences.',
      postedDate: '4 days ago',
    },
    {
      id: 8,
      title: 'Technical Writer',
      company: 'DocuTech',
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'Remote',
      type: 'Part-time',
      salary: '$40 - $60 per hour',
      tags: ['Documentation', 'API', 'Technical Writing'],
      description:
        'We need a Technical Writer to create clear and concise documentation for our software products.',
      postedDate: '1 week ago',
    },
  ];

  const [jobs, setJobs] = useState(allJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: [],
    salary: [],
    datePosted: 'any',
    experienceLevel: [],
  });

  // Filter options
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const salaryRanges = ['$0 - $50K', '$50K - $100K', '$100K - $150K', '$150K+'];
  const datePostedOptions = [
    { value: 'any', label: 'Any time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
  ];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

  const toggleFilter = (category, value) => {
    setFilters(prevFilters => {
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
    });
    setSearchTerm('');
    setLocation('');
  };

  const handleSearch = () => {
    // In a real app, this would call an API with the search parameters
    // For now, we'll just filter the sample data
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

    // Filter by job type
    if (filters.jobType.length > 0) {
      filteredJobs = filteredJobs.filter(job =>
        filters.jobType.some(
          type =>
            job.type.toLowerCase() === type.toLowerCase() ||
            (type === 'Remote' && job.location.toLowerCase().includes('remote'))
        )
      );
    }

    // Filter by salary
    if (filters.salary.length > 0) {
      filteredJobs = filteredJobs.filter(job => {
        // Extract numeric values from salary range
        const salaryMatch = job.salary.match(/\$(\d+)K\s*-\s*\$(\d+)K/);
        if (!salaryMatch) return false;

        const minSalary = parseInt(salaryMatch[1]);
        const maxSalary = parseInt(salaryMatch[2]);

        return filters.salary.some(range => {
          if (range === '$0 - $50K') return maxSalary <= 50;
          if (range === '$50K - $100K') return minSalary >= 50 && maxSalary <= 100;
          if (range === '$100K - $150K') return minSalary >= 100 && maxSalary <= 150;
          if (range === '$150K+') return minSalary >= 150;
          return false;
        });
      });
    }

    // Filter by date posted
    if (filters.datePosted !== 'any') {
      const now = new Date();
      filteredJobs = filteredJobs.filter(job => {
        const postedText = job.postedDate;

        if (filters.datePosted === 'today' && postedText.includes('day')) {
          const days = parseInt(postedText);
          return days <= 1;
        }

        if (filters.datePosted === 'week' && postedText.includes('day')) {
          const days = parseInt(postedText);
          return days <= 7;
        }

        if (filters.datePosted === 'week' && postedText.includes('week')) {
          const weeks = parseInt(postedText);
          return weeks <= 1;
        }

        if (filters.datePosted === 'month') {
          if (postedText.includes('day')) {
            const days = parseInt(postedText);
            return days <= 30;
          }
          if (postedText.includes('week')) {
            const weeks = parseInt(postedText);
            return weeks <= 4;
          }
          return false;
        }

        return true;
      });
    }

    setJobs(filteredJobs);
  };

  // Run search when filters change
  useEffect(() => {
    handleSearch();
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-24">
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Find Your Perfect Job</h1>

      {/* Search Bar */}
      <div className="mb-8 rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="focus:border-transparent; w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="focus:border-transparent; w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <button
            className="focus:ring-opacity-50; flex-shrink-0 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            onClick={handleSearch}
          >
            Search Jobs
          </button>
          <button
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium">Filter Results</h3>
              <button className="text-sm text-purple-600 hover:underline" onClick={clearFilters}>
                Clear all filters
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {/* Job Type */}
              <div>
                <h4 className="mb-2 flex items-center font-medium">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Job Type
                </h4>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={() => toggleFilter('jobType', type)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div>
                <h4 className="mb-2 font-medium">Salary Range</h4>
                <div className="space-y-2">
                  {salaryRanges.map(range => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.salary.includes(range)}
                        onChange={() => toggleFilter('salary', range)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Posted */}
              <div>
                <h4 className="mb-2 font-medium">Date Posted</h4>
                <div className="space-y-2">
                  {datePostedOptions.map(option => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        checked={filters.datePosted === option.value}
                        onChange={() => setDatePosted(option.value)}
                        className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h4 className="mb-2 font-medium">Experience Level</h4>
                <div className="space-y-2">
                  {experienceLevels.map(level => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.experienceLevel.includes(level)}
                        onChange={() => toggleFilter('experienceLevel', level)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(filters.jobType.length > 0 ||
          filters.salary.length > 0 ||
          filters.datePosted !== 'any' ||
          filters.experienceLevel.length > 0 ||
          searchTerm ||
          location) && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <div className="flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
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
                <div className="flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                  <span>Location: {location}</span>
                  <button
                    onClick={() => setLocation('')}
                    className="ml-2 text-purple-700 hover:text-purple-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {filters.jobType.map(type => (
                <div
                  key={type}
                  className="flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
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

              {filters.salary.map(range => (
                <div
                  key={range}
                  className="flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                >
                  <span>{range}</span>
                  <button
                    onClick={() => toggleFilter('salary', range)}
                    className="ml-2 text-purple-700 hover:text-purple-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              {filters.datePosted !== 'any' && (
                <div className="flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                  <span>
                    {datePostedOptions.find(option => option.value === filters.datePosted)?.label}
                  </span>
                  <button
                    onClick={() => setDatePosted('any')}
                    className="ml-2 text-purple-700 hover:text-purple-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {filters.experienceLevel.map(level => (
                <div
                  key={level}
                  className="flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                >
                  <span>{level}</span>
                  <button
                    onClick={() => toggleFilter('experienceLevel', level)}
                    className="ml-2 text-purple-700 hover:text-purple-900"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
        </h2>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-600">Sort by:</span>
          <select className="focus:border-transparent; w-auto w-full rounded-md border border-gray-300 px-3 px-4 py-1 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none">
            <option>Most Relevant</option>
            <option>Newest</option>
            <option>Salary: High to Low</option>
            <option>Salary: Low to High</option>
          </select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {jobs.length > 0 ? (
          jobs.map(job => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="rounded-lg bg-white py-12 text-center shadow-md">
            <Briefcase className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-xl font-medium text-gray-900">No jobs found</h3>
            <p className="mb-6 text-gray-600">
              Try adjusting your search or filter criteria to find more jobs.
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {jobs.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="rounded-md bg-purple-600 px-3 py-2 text-white">1</button>
            <button className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50">
              3
            </button>
            <span className="px-3 py-2">...</span>
            <button className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50">
              10
            </button>
            <button className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default FindJobs;
