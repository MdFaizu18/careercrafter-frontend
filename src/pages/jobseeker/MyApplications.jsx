'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, Eye, MessageCircle, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const MyApplications = () => {
  // Sample data
  const initialApplications = [
    {
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'San Francisco, CA',
      appliedDate: '2 days ago',
      status: 'Applied',
      notes: '',
      interviews: [],
    },
    {
      id: 2,
      position: 'UX Designer',
      company: 'DesignHub',
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'Remote',
      appliedDate: '1 week ago',
      status: 'Interview',
      notes: 'Had a great first interview. Second round scheduled for next week.',
      interviews: [
        {
          date: '2023-05-15T14:00:00',
          type: 'Video Call',
          with: 'Sarah Johnson, Design Lead',
          notes: 'Discussed portfolio and past projects. Went well overall.',
        },
        {
          date: '2023-05-22T15:30:00',
          type: 'Video Call',
          with: 'Design Team',
          notes: 'Technical interview and team meet.',
        },
      ],
    },
    {
      id: 3,
      position: 'Product Manager',
      company: 'InnovateTech',
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'New York, NY',
      appliedDate: '2 weeks ago',
      status: 'Rejected',
      notes: 'Received rejection email. They went with a candidate with more SaaS experience.',
      interviews: [
        {
          date: '2023-05-10T11:00:00',
          type: 'Phone Screen',
          with: 'HR Manager',
          notes: 'Basic screening call about experience and expectations.',
        },
      ],
    },
    {
      id: 4,
      position: 'Frontend Developer',
      company: 'WebSolutions',
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'Chicago, IL',
      appliedDate: '3 weeks ago',
      status: 'Offer',
      notes: 'Received offer: $110K base + benefits. Need to respond by Friday.',
      interviews: [
        {
          date: '2023-04-28T13:00:00',
          type: 'Phone Screen',
          with: 'HR Manager',
          notes: 'Initial screening call.',
        },
        {
          date: '2023-05-05T10:00:00',
          type: 'Video Call',
          with: 'Tech Lead',
          notes: 'Technical interview with coding challenge.',
        },
        {
          date: '2023-05-12T14:00:00',
          type: 'On-site',
          with: 'Team & CTO',
          notes: 'Final round with team and leadership.',
        },
      ],
    },
    {
      id: 5,
      position: 'React Developer',
      company: 'AppWorks',
      companyLogo: '/placeholder.svg?height=40&width=40',
      location: 'Austin, TX',
      appliedDate: '1 month ago',
      status: 'No Response',
      notes: '',
      interviews: [],
    },
  ];

  const [applications, setApplications] = useState(initialApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = e => {
    setStatusFilter(e.target.value);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || app.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const viewApplicationDetails = application => {
    setSelectedApplication(application);
    setNoteText(application.notes);
  };

  const closeApplicationDetails = () => {
    setSelectedApplication(null);
  };

  const openNoteModal = () => {
    setShowNoteModal(true);
  };

  const closeNoteModal = () => {
    setShowNoteModal(false);
  };

  const saveNote = () => {
    if (selectedApplication) {
      // Update the application notes
      const updatedApplications = applications.map(app =>
        app.id === selectedApplication.id ? { ...app, notes: noteText } : app
      );

      setApplications(updatedApplications);
      setSelectedApplication({ ...selectedApplication, notes: noteText });
      closeNoteModal();
    }
  };

  const formatDate = dateString => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = status => {
    switch (status.toLowerCase()) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'no response':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Helmet>
        <title>My Applications - CareerCraftery</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8 sm:px-24">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-600">Track and manage your job applications.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/job-seeker/search-jobs"
              className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Find More Jobs
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
                  placeholder="Search applications..."
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
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                  <option value="no response">No Response</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="mb-8 overflow-hidden rounded-lg bg-white shadow-md">
          {filteredApplications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Job
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Company
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
                      Applied
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      Status
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
                  {filteredApplications.map(application => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {application.position}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
                            {application.companyLogo ? (
                              <img
                                src={application.companyLogo || '/placeholder.svg'}
                                alt={application.company}
                                className="h-8 w-8 rounded-md"
                              />
                            ) : (
                              <span className="text-gray-500">{application.company.charAt(0)}</span>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.company}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{application.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{application.appliedDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs leading-5 font-semibold ${getStatusColor(application.status)}`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => viewApplicationDetails(application)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start applying to jobs to track your applications here.'}
              </p>
              <div className="mt-6">
                <Link to="/job-seeker/search-jobs" className="btn-primary">
                  Find Jobs
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Application Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold">Total Applications</h3>
            <p className="text-3xl font-bold text-purple-600">{applications.length}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold">Interviews</h3>
            <p className="text-3xl font-bold text-purple-600">
              {applications.filter(app => app.status === 'Interview').length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold">Offers</h3>
            <p className="text-3xl font-bold text-green-600">
              {applications.filter(app => app.status === 'Offer').length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-2 text-lg font-semibold">Rejection Rate</h3>
            <p className="text-3xl font-bold text-gray-700">
              {applications.length > 0
                ? `${Math.round((applications.filter(app => app.status === 'Rejected').length / applications.length) * 100)}%`
                : '0%'}
            </p>
          </div>
        </div>

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white">
              <div className="p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {selectedApplication.position}
                    </h2>
                    <p className="text-gray-600">
                      {selectedApplication.company} - {selectedApplication.location}
                    </p>
                  </div>
                  <button
                    onClick={closeApplicationDetails}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Applied Date</h3>
                    <p className="text-gray-900">{selectedApplication.appliedDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs leading-5 font-semibold ${getStatusColor(selectedApplication.status)}`}
                    >
                      {selectedApplication.status}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Notes</h3>
                    <button
                      onClick={openNoteModal}
                      className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                    >
                      <MessageCircle className="mr-1 h-4 w-4" />
                      {selectedApplication.notes ? 'Edit Note' : 'Add Note'}
                    </button>
                  </div>
                  {selectedApplication.notes ? (
                    <p className="rounded-md bg-gray-50 p-4 text-gray-700">
                      {selectedApplication.notes}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">No notes added yet.</p>
                  )}
                </div>

                {selectedApplication.interviews.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-4 text-lg font-semibold">Interviews</h3>
                    <div className="space-y-4">
                      {selectedApplication.interviews.map((interview, index) => (
                        <div key={index} className="rounded-md border border-gray-200 p-4">
                          <div className="mb-2 flex justify-between">
                            <h4 className="font-medium">{interview.type}</h4>
                            <span className="text-sm text-gray-500">
                              {formatDate(interview.date)}
                            </span>
                          </div>
                          <p className="mb-2 text-sm text-gray-600">With: {interview.with}</p>
                          {interview.notes && (
                            <div>
                              <h5 className="mb-1 text-xs font-medium text-gray-500">Notes:</h5>
                              <p className="text-sm text-gray-700">{interview.notes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeApplicationDetails}
                    className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <Link
                    to={`/job-seeker/job/${selectedApplication.id}`}
                    className="focus:ring-opacity-50 flex items-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Job
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Note Modal */}
        {showNoteModal && (
          <div className="bg-opacity-100 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-lg rounded-lg bg-white">
              <div className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <h2 className="text-lg font-semibold">
                    {selectedApplication.notes ? 'Edit Note' : 'Add Note'}
                  </h2>
                  <button onClick={closeNoteModal} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    rows="6"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Add notes about this application, interviews, or follow-ups..."
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeNoteModal}
                    className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button onClick={saveNote} className="btn-primary">
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
