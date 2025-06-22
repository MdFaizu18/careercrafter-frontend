'use client';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';
import AuthContext from '../../context/AuthProvider';
import JobService from '../../service/JobService';

const ManageJobs = () => {
  const { auth } = useContext(AuthContext);
  const jobService = new JobService(auth?.accessToken);

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);
  const fetchJobs = async () => {
    try {
      const response = await jobService.getJobsForEmployer();
      console.log(response);
      setJobs(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Helper function to get application count
  const getApplicationCount = applications => {
    if (!applications) return 0;
    if (typeof applications === 'number') return applications;
    if (Array.isArray(applications)) return applications.length;
    return 0;
  };

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = e => {
    setStatusFilter(e.target.value);
  };

  // Filter jobs based on search and status
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      searchTerm === '' ||
      (job.title && job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const confirmDelete = jobId => {
    setJobToDelete(jobId);
    setShowDeleteModal(true);
  };

  const deleteJob = () => {
    setJobs(jobs.filter(job => job.id !== jobToDelete));
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-12 sm:px-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">Manage Jobs</h1>
              <p className="text-purple-100">View, edit, and manage all your job postings.</p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                to="/employer/post-job"
                className="inline-flex items-center rounded-2xl bg-white px-6 py-3 font-medium text-purple-700 shadow-lg transition-all duration-200 hover:bg-purple-50 hover:shadow-xl"
              >
                <Plus className="mr-2 h-5 w-5" />
                Post New Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-24">
        {/* Quick Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setStatusFilter('all')}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${
              statusFilter === 'all'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
            }`}
          >
            All Jobs ({filteredJobs.length})
          </button>

          {/* <button
            onClick={() => setStatusFilter('expired')}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${
              statusFilter === 'expired'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
            }`}
          >
            Expired ({jobs.filter(j => j.status === 'expired').length})
          </button> */}
        </div>

        {/* Search and Filters */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-4 left-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title or location..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full rounded-xl border border-gray-200 py-4 pr-4 pl-12 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <div className="relative">
                <Filter className="absolute top-4 left-4 h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={handleStatusFilter}
                  className="w-full rounded-xl border border-gray-200 py-4 pr-4 pl-12 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} job{jobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Jobs Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Job Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Applications
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Posted
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Expires
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map(job => (
                    <tr key={job.jobId} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-6">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {job.jobTitle || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">{job.jobType || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="text-sm text-gray-900">{job.jobLocation || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {getApplicationCount(job.applications)}
                          </span>
                          <span className="ml-2 rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700">
                            applicants
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            job.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : job.status === 'expired'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {job.status
                            ? job.status.charAt(0).toUpperCase() + job.status.slice(1)
                            : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-500">{job.createdAt || 'N/A'}</td>
                      <td className="px-6 py-6 text-sm text-gray-500">
                        {job.applicationDeadline || 'N/A'}
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-end space-x-3">
                          <Link
                            to={`/employer/applications?job=${job.jobId}`}
                            className="rounded-lg p-2 text-purple-600 transition-colors hover:bg-purple-100"
                            title="View Applications"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                          <Link
                            to={`/employer/edit-job/${job.jobId}`}
                            className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-100"
                            title="Edit Job"
                          >
                            <Edit className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => confirmDelete(job.jobId)}
                            className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-100"
                            title="Delete Job"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                          <div className="group relative"></div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-gray-100 p-4">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No jobs found</h3>
                        <p className="mt-2 text-gray-500">
                          Try adjusting your search criteria or create a new job posting.
                        </p>
                        <Link
                          to="/employer/post-job"
                          className="mt-4 inline-flex items-center rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Post New Job
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              <p className="mt-2 text-gray-600">
                Are you sure you want to delete this job posting? This action cannot be undone and
                will remove all associated applications.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteJob}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
