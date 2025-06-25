'use client';

import { useContext, useEffect, useState } from 'react';
import {
  Search,
  Filter,
  Mail,
  Calendar,
  Briefcase,
  Download,
  X,
  CheckCircle,
  XCircle,
  Phone,
  MapPin,
  CalendarPlus,
} from 'lucide-react';
import ApplicationService from '../../service/ApplicationService';
import AuthContext from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import InterviewService from '../../service/InterviewService';

const ViewApplications = () => {
  // Mock data based on your API response structure
  const { auth } = useContext(AuthContext);
  const applicationService = new ApplicationService(auth?.accessToken);
  const interviewService = new InterviewService(auth?.accessToken);

  useEffect(() => {
    fetchRecentApplications();
  }, []);

  const fetchRecentApplications = async () => {
    try {
      const response = await applicationService.getApplicationsForEmployer();
      console.log(response);
      setApplications(response);
    } catch (error) {
      console.log(error);
    }
  };
  const [applications, setApplications] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const [interviewData, setInterviewData] = useState({
    applicationId: '',
    interviewDateTime: '',
    mode: 'PHONE',
    interviewerNames: '',
    notes: '',
    stage: 'Initial Interview',
  });
  const [schedulingInterview, setSchedulingInterview] = useState(false);

  // Filter applications based on search and filters
  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || app.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesJob = selectedJob === 'all' || app.jobId.toString() === selectedJob;

    return matchesSearch && matchesStatus && matchesJob;
  });

  // Get unique jobs from applications for filter dropdown
  const jobs = [...new Set(applications.map(app => ({ id: app.jobId, title: app.jobTitle })))];

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = e => {
    setStatusFilter(e.target.value);
  };

  const handleJobFilter = e => {
    setSelectedJob(e.target.value);
  };

  const updateStatus = async (applicationId, newStatus) => {
    try {
      const applicationData = {
        applicationId,
        status: newStatus.toUpperCase(),
      };
      await applicationService.updateApplicationStatus(applicationData);
      setApplications(prev =>
        prev.map(app =>
          app.applicationId === applicationId ? { ...app, status: newStatus.toUpperCase() } : app
        )
      );
      if (selectedApplication && selectedApplication.applicationId === applicationId) {
        setSelectedApplication(prev => ({
          ...prev,
          status: newStatus.toUpperCase(),
        }));
      }

      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status.');
    }
  };

  const viewApplication = application => {
    setSelectedApplication(application);
  };

  const closeApplicationView = () => {
    setSelectedApplication(null);
  };

  const openScheduleInterview = application => {
    setInterviewData({
      applicationId: application.applicationId,
      interviewDateTime: '',
      mode: 'PHONE',
      interviewerNames: '',
      notes: '',
      stage: 'Initial Interview',
    });
    setShowInterviewModal(true);
  };

  const closeInterviewModal = () => {
    setShowInterviewModal(false);
    setInterviewData({
      applicationId: '',
      interviewDateTime: '',
      mode: 'PHONE',
      interviewerNames: '',
      notes: '',
      stage: 'Initial Interview',
    });
  };

  const handleInterviewInputChange = e => {
    const { name, value } = e.target;
    setInterviewData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const scheduleInterview = async () => {
    try {
      setSchedulingInterview(true);

      const formattedDateTime = new Date(interviewData.interviewDateTime).toISOString();

      const interviewPayload = {
        applicationId: parseInt(interviewData.applicationId),
        interviewDateTime: formattedDateTime,
        mode: interviewData.mode,
        interviewerNames: interviewData.interviewerNames,
        notes: interviewData.notes,
        stage: interviewData.stage,
      };

      const savedInterview = await interviewService.scheduleInterview(interviewPayload);

      setApplications(prevApps =>
        prevApps.map(app =>
          app.applicationId === interviewData.applicationId
            ? {
                ...app,
                interviews: [...app.interviews, savedInterview],
                status: 'INTERVIEW_SCHEDULED',
              }
            : app
        )
      );

      if (
        selectedApplication &&
        selectedApplication.applicationId === interviewData.applicationId
      ) {
        setSelectedApplication(prev => ({
          ...prev,
          interviews: [...prev.interviews, savedInterview],
          status: 'INTERVIEW_SCHEDULED',
        }));
      }

      closeInterviewModal();
      toast.success('Interview scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling interview:', error);
      toast.error('Failed to schedule interview. Please try again.');
    } finally {
      setSchedulingInterview(false);
    }
  };

  const getStatusBadge = status => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
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
      case 'interview_scheduled':
      case 'interview':
        return (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
            Interview Scheduled
          </span>
        );
      case 'shortlisted':
        return (
          <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
            Shortlisted
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

  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // adjust for timezone
    return now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
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
                  <option value="interview_scheduled">Interview Scheduled</option>
                  <option value="shortlisted">Shortlisted</option>
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
                    <option key={job.jobId} value={job.id}>
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
                  key={application.applicationId}
                  className="mb-4 overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 text-lg font-bold text-white">
                      {application.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {application.fullName}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(application.status)}
                        </div>
                      </div>

                      <p className="text-purple-600">{application.jobTitle}</p>

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
                          Applied {application.appliedAt}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center space-x-2">
                        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                          {application.companyName}
                        </span>
                        {application.interviews.length > 0 && (
                          <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                            {application.interviews.length} Interview(s) Scheduled
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

                        {!['REJECTED', 'HIRED'].includes(application.status) && (
                          <button
                            onClick={() => openScheduleInterview(application)}
                            className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-200"
                          >
                            <CalendarPlus className="mr-1 inline h-4 w-4" />
                            Schedule Interview
                          </button>
                        )}
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
                    onClick={() => setStatusFilter('interview_scheduled')}
                    className="w-full rounded-lg bg-amber-50 px-3 py-2 text-left text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100"
                  >
                    Interview Scheduled
                  </button>
                  <button
                    onClick={() => setStatusFilter('shortlisted')}
                    className="w-full rounded-lg bg-green-50 px-3 py-2 text-left text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
                  >
                    Shortlisted Candidates
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Scheduling Modal */}
      {showInterviewModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 p-4">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={closeInterviewModal}
              className="absolute top-4 right-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="mb-6 text-xl font-bold text-gray-900">Schedule Interview</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Interview Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="interviewDateTime"
                  value={interviewData.interviewDateTime}
                  onChange={handleInterviewInputChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                  required
                  min={getCurrentDateTimeLocal()}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Interview Mode
                </label>
                <select
                  name="mode"
                  value={interviewData.mode}
                  onChange={handleInterviewInputChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                >
                  <option value="PHONE">Phone</option>
                  <option value="VIDEO">Video Call</option>
                  <option value="IN_PERSON">In Person</option>
                  <option value="ONLINE">Online</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Interviewer Name(s)
                </label>
                <input
                  type="text"
                  name="interviewerNames"
                  value={interviewData.interviewerNames}
                  onChange={handleInterviewInputChange}
                  placeholder="Enter interviewer names"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Interview Stage
                </label>
                <input
                  type="text"
                  name="stage"
                  value={interviewData.stage}
                  onChange={handleInterviewInputChange}
                  placeholder="e.g., HR Round, Technical Round, Final Round"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={interviewData.notes}
                  onChange={handleInterviewInputChange}
                  placeholder="Any additional notes for the candidate"
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={closeInterviewModal}
                className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={scheduleInterview}
                disabled={
                  schedulingInterview ||
                  !interviewData.interviewDateTime ||
                  !interviewData.interviewerNames
                }
                className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {schedulingInterview ? 'Scheduling...' : 'Schedule Interview'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 p-4">
          <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={closeApplicationView}
              className="absolute top-4 right-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Split layout: left and right */}
            <div className="flex flex-col gap-8 md:flex-row">
              {/* LEFT SIDE - Application Info */}
              <div className="w-full md:w-1/2">
                <div className="mb-6 flex items-start space-x-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 text-2xl font-bold text-white">
                    {selectedApplication.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedApplication.fullName}
                    </h2>
                    <p className="text-lg text-purple-600">{selectedApplication.jobTitle}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      {getStatusBadge(selectedApplication.status)}
                      <span className="text-sm text-gray-500">
                        Applied {selectedApplication.appliedAt}
                      </span>
                    </div>
                  </div>
                </div>

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
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Resume</h3>
                  <button
                    onClick={() =>
                      downloadResume(
                        selectedApplication.fileUrl,
                        `${selectedApplication.fullName}_resume.pdf`
                      )
                    }
                    className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </button>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900">Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => updateStatus(selectedApplication.applicationId, 'SHORTLISTED')}
                      className="flex w-full items-center justify-center rounded-lg bg-yellow-100 px-4 py-2 font-medium text-yellow-700 transition-colors hover:bg-yellow-200"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Shortlist Candidate
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApplication.applicationId, 'SELECTED  ')}
                      className="flex w-full items-center justify-center rounded-lg bg-green-100 px-4 py-2 font-medium text-green-700 transition-colors hover:bg-green-200"
                    >
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Hire Candidate
                    </button>
                    <button
                      onClick={() => updateStatus(selectedApplication.applicationId, 'REJECTED')}
                      className="flex w-full items-center justify-center rounded-lg bg-red-100 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-200"
                    >
                      <XCircle className="mr-2 h-5 w-5" />
                      Reject Application
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Interviews */}
              <div className="w-full md:w-1/2">
                {selectedApplication.interviews.length > 0 ? (
                  <>
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">
                      Scheduled Interviews ({selectedApplication.interviews.length})
                    </h3>
                    <div className="max-h-[70vh] space-y-3 overflow-y-auto">
                      {selectedApplication.interviews.map((interview, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-medium text-gray-900">{interview.stage}</span>
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                              {interview.mode}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                              <strong>Date:</strong>&nbsp;
                              {new Date(interview.interviewDateTime).toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
                              <strong>Interviewer:</strong>&nbsp;{interview.interviewerNames}
                            </div>
                            {interview.notes && (
                              <div className="mt-2 rounded border-l-4 border-blue-400 bg-white p-2">
                                <strong className="text-gray-700">Notes:</strong>
                                <p className="mt-1 text-gray-600">{interview.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="mb-3 text-lg font-semibold text-gray-900">
                      No Interviews Scheduled
                    </h3>
                    <p className="text-gray-600">
                      You can schedule an interview using the button below.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
