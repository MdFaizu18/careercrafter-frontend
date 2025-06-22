'use client';

import { useContext, useEffect, useState } from 'react';
import { useSearchParams, Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Mail,
  Phone,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  MoreHorizontal,
} from 'lucide-react';
import AuthContext from '../../context/AuthProvider';
import JobService from '../../service/JobService';
import ApplicationService from '../../service/ApplicationService';

const JobApplications = () => {
  const { auth } = useContext(AuthContext);
  const jobService = new JobService(auth?.accessToken);
  const applicationService = new ApplicationService(auth?.accessToken);
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchJobDetails();
    fetchApplications();
  }, []);

  const fetchJobDetails = async () => {
    try {
      const response = await jobService.getJobById(id);
      setJob(response);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await applicationService.getApplicationsForJob(id);
      setApplications(response);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      await jobService.updateApplicationStatus(applicationId, newStatus);
      setApplications(
        applications.map(app =>
          app.applicationId === applicationId ? { ...app, status: newStatus } : app
        )
      );
      setShowStatusModal(false);
      setSelectedApplication(null);
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const downloadResume = async (applicationId, fileName) => {
    try {
      const blob = await jobService.downloadResume(applicationId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  const getStatusColor = status => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'hired':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = status => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'reviewed':
      case 'shortlisted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'hired':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredApplications = applications.filter(application => {
    const matchesSearch =
      !searchTerm ||
      application.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Job Not Found</h2>
          <p className="mb-4 text-gray-600">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/employer/manage-jobs"
            className="inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-8 sm:px-24">
          <div className="mb-6 flex items-center">
            <Link
              to="/employer/manage-jobs"
              className="mr-4 rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Job Applications</h1>
              <p className="text-purple-100">Manage applications for this job posting</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-24">
        {/* Job Details Card */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h2 className="mb-2 text-3xl font-bold text-gray-900">{job.jobTitle}</h2>
              <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  {job.jobLocation}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  {job.jobType}
                </div>
                {job.salary && (
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    {job.salaryMin && job.salaryMax}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Posted {formatDate(job.createdAt)}
                </div>
              </div>

              {job.JobDescription && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Job Description</h3>
                  <div className="prose max-w-none text-gray-600">{job.jobDescription}</div>
                </div>
              )}
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
                <div className="text-center">
                  <div className="mb-2 flex items-center justify-center">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="mb-1 text-3xl font-bold text-purple-600">
                    {applications.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Applications</div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-medium">
                      {applications.filter(a => a.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Reviewed</span>
                    <span className="font-medium">
                      {applications.filter(a => a.status === 'reviewed').length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shortlisted</span>
                    <span className="font-medium">
                      {applications.filter(a => a.status === 'shortlisted').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute top-4 left-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-4 pr-4 pl-12 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <div className="relative">
                <Filter className="absolute top-4 left-4 h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-4 pr-4 pl-12 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Applications ({filteredApplications.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Candidate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Applied
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map(application => (
                    <tr
                      key={application.applicationId}
                      className="transition-colors hover:bg-gray-50"
                    >
                      <td className="px-6 py-6">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {application.fullName || 'N/A'}
                          </div>
                          {application.experience && (
                            <div className="text-sm text-gray-500">
                              {application.experience} years experience
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="mr-2 h-4 w-4" />
                            {application.email || 'N/A'}
                          </div>
                          {application.phoneNumber && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="mr-2 h-4 w-4" />
                              {application.phoneNumber}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(application.status)}`}
                        >
                          {getStatusIcon(application.status)}
                          <span className="ml-1">
                            {application.status
                              ? application.status.charAt(0).toUpperCase() +
                                application.status.slice(1)
                              : 'Pending'}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-6 text-sm text-gray-500">
                        {formatDate(application.appliedAt)}
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center justify-end space-x-2">
                          {application.resumeUrl && (
                            <button
                              onClick={() =>
                                downloadResume(
                                  application.applicationId,
                                  `${application.fullName}_resume.pdf`
                                )
                              }
                              className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-100"
                              title="Download Resume"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedApplication(application);
                              setShowStatusModal(true);
                            }}
                            className="rounded-lg p-2 text-purple-600 transition-colors hover:bg-purple-100"
                            title="Update Status"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <div className="group relative">
                            <button className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                            <div className="ring-opacity-5 absolute right-0 z-10 mt-2 hidden w-48 rounded-xl bg-white shadow-lg ring-1 ring-black group-hover:block">
                              <div className="py-2">
                                <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                  View Profile
                                </button>
                                <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                  Schedule Interview
                                </button>
                                <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                  Send Message
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Users className="mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-medium text-gray-900">
                          No applications found
                        </h3>
                        <p className="text-gray-500">
                          {searchTerm || statusFilter !== 'all'
                            ? 'Try adjusting your search or filter criteria.'
                            : 'No one has applied to this job yet.'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && selectedApplication && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Update Application Status</h3>
            <p className="mb-6 text-gray-600">
              Change status for <strong>{selectedApplication.fullName}</strong>
            </p>
            <div className="mb-6 space-y-3">
              {['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].map(status => (
                <button
                  key={status}
                  onClick={() => updateApplicationStatus(selectedApplication.applicationId, status)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    selectedApplication.status === status
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    {getStatusIcon(status)}
                    <span className="ml-2 capitalize">{status}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedApplication(null);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
