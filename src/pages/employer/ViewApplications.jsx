'use client';

import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  StarOff,
  Mail,
  Calendar,
  Briefcase,
  Clock,
  Download,
  X,
  CheckCircle,
  XCircle,
  MessageSquare,
  Phone,
  MapPin,
} from 'lucide-react';
import ApplicationService from '../../service/ApplicationService';
import AuthContext from '../../context/AuthProvider';

const ViewApplications = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('job');

  const { auth } = useContext(AuthContext);
  const applicationService = new ApplicationService(auth?.accessToken);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState(jobId || 'all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationService.getApplicationsForEmployer();
      console.log(response);

      // Transform API response to match component structure
      const transformedApplications = response.map(app => ({
        id: app.applicationId,
        name: app.fullName,
        email: app.email,
        position: app.jobTitle,
        jobId: app.jobId.toString(),
        status: app.status.toLowerCase(), // Convert PENDING to pending, etc.
        appliedDate: new Date(app.appliedAt).toLocaleDateString(),
        experience: 'N/A', // Not provided in API
        skills: [], // Not provided in API
        avatar: null, // Not provided in API
        starred: false, // Default value
        coverLetter: 'Cover letter not provided', // Default value
        companyName: app.companyName,
        location: app.location,
        phoneNumber: app.phoneNumber,
        fileUrl: app.fileUrl,
        interviews: app.interviews || [],
        seekerId: app.seekerId,
      }));

      setApplications(transformedApplications);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique jobs from applications for filter dropdown
  const jobs = [...new Set(applications.map(app => ({ id: app.jobId, title: app.position })))];

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = e => {
    setStatusFilter(e.target.value);
  };

  const handleJobFilter = e => {
    setSelectedJob(e.target.value);
  };

  const toggleStar = id => {
    setApplications(
      applications.map(app => (app.id === id ? { ...app, starred: !app.starred } : app))
    );
  };

  const updateStatus = async (id, newStatus) => {
    try {
      // Here you would typically call an API to update the status
      // await applicationService.updateApplicationStatus(id, newStatus);

      setApplications(
        applications.map(app => (app.id === id ? { ...app, status: newStatus } : app))
      );
      if (selectedApplication && selectedApplication.id === id) {
        setSelectedApplication({ ...selectedApplication, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const viewApplication = application => {
    setSelectedApplication(application);
  };

  const closeApplicationView = () => {
    setSelectedApplication(null);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesJob = selectedJob === 'all' || app.jobId === selectedJob;

    return matchesSearch && matchesStatus && matchesJob;
  });

  const getStatusBadge = status => {
    switch (status) {
      case 'pending':
        return (
          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
            Pending
          </span>
        );
      case 'reviewed':
        return (
          <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-800">
            Reviewed
          </span>
        );
      case 'interview':
        return (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
            Interview
          </span>
        );
      case 'rejected':
        return (
          <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800">
            Rejected
          </span>
        );
      case 'hired':
        return (
          <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
            Hired
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
            {status}
          </span>
        );
    }
  };

  const downloadResume = (fileUrl, fileName) => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName || 'resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white shadow-md">
        <div className="flex flex-col px-4 py-4 sm:px-24 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">View Applications</h1>
            <p className="mt-1 text-purple-100">
              Review and manage candidate applications for your job postings.
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-2 md:mt-0">
            <div className="rounded-lg bg-white/20 px-3 py-1 text-sm">
              <span className="font-medium">{filteredApplications.length}</span> applications found
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 sm:px-24">
        <div className="mb-6 rounded-xl bg-white p-4 shadow-md">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <div className="relative">
                <Search className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 pl-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Filter className="absolute top-3 left-3 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={handleStatusFilter}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 pl-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
              </div>
            </div>
            <div>
              <div className="relative">
                <Briefcase className="absolute top-3 left-3 text-gray-400" />
                <select
                  value={selectedJob}
                  onChange={handleJobFilter}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 pl-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                >
                  <option value="all">All Jobs</option>
                  {jobs.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">All Applications</h2>
              <div className="text-sm text-gray-500">
                Showing {filteredApplications.length} of {applications.length} applications
              </div>
            </div>

            {filteredApplications.length > 0 ? (
              filteredApplications.map(application => (
                <div
                  key={application.id}
                  className="mb-4 overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 text-lg font-bold text-white">
                      {application.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{application.name}</h3>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(application.status)}
                          <button
                            onClick={() => toggleStar(application.id)}
                            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-yellow-500"
                          >
                            {application.starred ? (
                              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <p className="text-purple-600">{application.position}</p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Mail className="mr-1 h-4 w-4" />
                          {application.email}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {application.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          Applied {application.appliedDate}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center space-x-2">
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                          {application.companyName}
                        </span>
                        {application.interviews.length > 0 && (
                          <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                            {application.interviews.length} Interview(s)
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex items-center space-x-2">
                        <button
                          onClick={() => viewApplication(application)}
                          className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => updateStatus(application.id, 'reviewed')}
                          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                          disabled={application.status !== 'pending'}
                        >
                          Mark as Reviewed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-40 items-center justify-center rounded-xl bg-white p-6 text-center shadow-sm">
                <div>
                  <Search className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  <p className="text-gray-500">No applications match your filters</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setSelectedJob('all');
                    }}
                    className="mt-2 text-sm font-medium text-purple-600 hover:text-purple-800"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-1">
            <div className="sticky top-4">
              <div className="mb-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white shadow-sm">
                <h2 className="flex items-center text-lg font-semibold">
                  <Star className="mr-2 h-5 w-5 fill-yellow-300 text-yellow-300" />
                  Starred Applications
                </h2>
                <p className="mt-1 text-sm text-purple-100">Quick access to important candidates</p>
              </div>

              {filteredApplications.filter(app => app.starred).length > 0 ? (
                filteredApplications
                  .filter(app => app.starred)
                  .map(application => (
                    <div
                      key={application.id}
                      className="mb-4 overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 font-bold text-white">
                          {application.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{application.name}</h3>
                          <p className="text-sm text-purple-600">{application.position}</p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        {getStatusBadge(application.status)}
                        <button
                          onClick={() => viewApplication(application)}
                          className="text-sm font-medium text-purple-600 hover:text-purple-800"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                  <StarOff className="mx-auto mb-2 h-6 w-6 text-gray-300" />
                  <p className="text-sm text-gray-500">No starred applications</p>
                </div>
              )}

              <div className="mt-6 rounded-xl bg-white p-4 shadow-sm">
                <h3 className="mb-3 font-medium text-gray-900">Quick Filters</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setStatusFilter('pending')}
                    className="w-full rounded-lg bg-blue-50 px-3 py-2 text-left text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    Pending Applications
                  </button>
                  <button
                    onClick={() => setStatusFilter('interview')}
                    className="w-full rounded-lg bg-amber-50 px-3 py-2 text-left text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100"
                  >
                    Interview Scheduled
                  </button>
                  <button
                    onClick={() => setStatusFilter('hired')}
                    className="w-full rounded-lg bg-green-50 px-3 py-2 text-left text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
                  >
                    Hired Candidates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 p-4">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={closeApplicationView}
              className="absolute top-4 right-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-6 flex items-start space-x-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 text-2xl font-bold text-white">
                {selectedApplication.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedApplication.name}</h2>
                <p className="text-lg text-purple-600">{selectedApplication.position}</p>
                <div className="mt-2 flex items-center space-x-2">
                  {getStatusBadge(selectedApplication.status)}
                  <span className="text-sm text-gray-500">
                    Applied {selectedApplication.appliedDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-gray-400" />
                    <span>{selectedApplication.email}</span>
                  </div>
                  {selectedApplication.phoneNumber && (
                    <div className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 text-gray-400" />
                      <span>{selectedApplication.phoneNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <MapPin className="mr-3 h-5 w-5 text-gray-400" />
                    <span>{selectedApplication.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="mr-3 h-5 w-5 text-gray-400" />
                    <span>{selectedApplication.companyName}</span>
                  </div>
                </div>

                <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-900">Resume</h3>
                <button
                  onClick={() =>
                    downloadResume(
                      selectedApplication.fileUrl,
                      `${selectedApplication.name}_resume.pdf`
                    )
                  }
                  className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </button>

                {selectedApplication.interviews.length > 0 && (
                  <>
                    <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-900">Interviews</h3>
                    <div className="space-y-3">
                      {selectedApplication.interviews.map((interview, index) => (
                        <div key={index} className="rounded-lg border border-gray-200 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              Interview #{index + 1}
                            </span>
                            <span className="text-sm text-gray-500">{interview.mode}</span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div>
                              <strong>Date:</strong>{' '}
                              {new Date(interview.interviewDateTime).toLocaleString()}
                            </div>
                            <div>
                              <strong>Interviewer:</strong> {interview.interviewerNames}
                            </div>
                            <div>
                              <strong>Stage:</strong> {interview.stage}
                            </div>
                            {interview.notes && (
                              <div>
                                <strong>Notes:</strong> {interview.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Cover Letter</h3>
                <div className="rounded-lg border border-gray-200 p-4">
                  <p className="text-gray-700">{selectedApplication.coverLetter}</p>
                </div>

                <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-900">Actions</h3>
                <div className="space-y-3">
                  {selectedApplication.status === 'pending' && (
                    <button
                      onClick={() => updateStatus(selectedApplication.id, 'reviewed')}
                      className="flex w-full items-center justify-center rounded-lg bg-purple-100 px-4 py-2 font-medium text-purple-700 transition-colors hover:bg-purple-200"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Mark as Reviewed
                    </button>
                  )}

                  {['pending', 'reviewed'].includes(selectedApplication.status) && (
                    <button
                      onClick={() => updateStatus(selectedApplication.id, 'interview')}
                      className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition-all hover:shadow-md"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule Interview
                    </button>
                  )}

                  {['pending', 'reviewed', 'interview'].includes(selectedApplication.status) && (
                    <>
                      <button
                        onClick={() => updateStatus(selectedApplication.id, 'hired')}
                        className="flex w-full items-center justify-center rounded-lg bg-green-100 px-4 py-2 font-medium text-green-700 transition-colors hover:bg-green-200"
                      >
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Hire Candidate
                      </button>

                      <button
                        onClick={() => updateStatus(selectedApplication.id, 'rejected')}
                        className="flex w-full items-center justify-center rounded-lg bg-red-100 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-200"
                      >
                        <XCircle className="mr-2 h-5 w-5" />
                        Reject Application
                      </button>
                    </>
                  )}

                  <button className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Message Candidate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
