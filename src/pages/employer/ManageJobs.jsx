'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Plus, Search, Filter, MoreHorizontal } from 'lucide-react';

const ManageJobs = () => {
  // Sample data
  const initialJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      applications: 24,
      status: 'active',
      posted: '2 weeks ago',
      expires: '2 weeks left',
    },
    {
      id: 2,
      title: 'UX Designer',
      location: 'Remote',
      type: 'Contract',
      applications: 18,
      status: 'active',
      posted: '1 week ago',
      expires: '3 weeks left',
    },
    {
      id: 3,
      title: 'Product Manager',
      location: 'New York, NY',
      type: 'Full-time',
      applications: 32,
      status: 'active',
      posted: '3 days ago',
      expires: '27 days left',
    },
    {
      id: 4,
      title: 'Backend Developer',
      location: 'Boston, MA',
      type: 'Full-time',
      applications: 15,
      status: 'expired',
      posted: '2 months ago',
      expires: 'Expired',
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      location: 'Chicago, IL',
      type: 'Part-time',
      applications: 8,
      status: 'draft',
      posted: 'Not published',
      expires: 'N/A',
    },
  ];

  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = e => {
    setStatusFilter(e.target.value);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
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
    <div className="container mx-auto px-4 py-8 sm:px-24">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Jobs</h1>
          <p className="text-gray-600">View, edit, and manage all your job postings.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/employer/post-job"
            className="focus:ring-opacity-50 flex items-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <Plus className="mr-2 h-5 w-5" />
            Post New Job
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full md:w-64">
            <div className="relative">
              <Filter className="absolute top-3 left-3 text-gray-400" />
              <select
                value={statusFilter}
                onChange={handleStatusFilter}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
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

      {/* Jobs Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Job Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Applications
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Posted
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Expires
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.applications}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs leading-5 font-semibold ${
                          job.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : job.status === 'expired'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {job.posted}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {job.expires}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/employer/applications?job=${job.id}`}
                          className="text-purple-600 hover:text-purple-900"
                          title="View Applications"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <Link
                          to={`/employer/edit-job/${job.id}`}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit Job"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => confirmDelete(job.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Job"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="group relative">
                          <button className="text-gray-500 hover:text-gray-700">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                          <div className="absolute right-0 z-10 mt-2 hidden w-48 rounded-md bg-white py-1 shadow-lg group-hover:block">
                            <Link
                              to={`/job-seeker/job/${job.id}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Preview Job
                            </Link>
                            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                              Duplicate Job
                            </button>
                            {job.status === 'active' ? (
                              <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                Pause Job
                              </button>
                            ) : (
                              <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                Activate Job
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No jobs found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-bold">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this job posting? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteJob}
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;
