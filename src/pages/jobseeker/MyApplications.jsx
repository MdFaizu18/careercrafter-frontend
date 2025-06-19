'use client';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  MessageCircle,
  X,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Briefcase,
  Target,
  Plus,
  MapPin,
  DollarSign,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ApplicationService from '../../service/ApplicationService';
import AuthContext from '../../context/AuthProvider';

const MyApplications = () => {
  const { auth } = useContext(AuthContext);
  const applicationService = new ApplicationService(auth?.accessToken);

  const [application, setApplication] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // cards or kanban
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = e => {
    setStatusFilter(e.target.value);
  };

  useEffect(() => {
    fetchRecentApplications();
  }, []);

  const fetchRecentApplications = async () => {
    try {
      const response = await applicationService.getApplicationsForUser();
      console.log(response);
      setApplication(response);
    } catch (error) {
      console.log(error);
    }
  };
  const applications = [];

  const filteredApplications = application.filter(app => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || app.status?.toLowerCase() === statusFilter.toLowerCase();

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
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'interview':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'offer':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'no response':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = status => {
    switch (status.toLowerCase()) {
      case 'applied':
        return <Clock className="h-4 w-4" />;
      case 'interview':
        return <Users className="h-4 w-4" />;
      case 'offer':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'no response':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getUrgencyIndicator = urgency => {
    switch (urgency) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  const stats = [
    {
      title: 'Total Applications',
      value: applications.length,
      icon: <Briefcase className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      change: '+12%',
    },
    {
      title: 'Active Interviews',
      value: applications.filter(app => app.status === 'Interview').length,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      change: '+25%',
    },
    {
      title: 'Pending Offers',
      value: applications.filter(app => app.status === 'Offer').length,
      icon: <Target className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      change: '+100%',
    },
    {
      title: 'Response Rate',
      value: `${Math.round(((applications.length - applications.filter(app => app.status === 'No Response').length) / applications.length) * 100)}%`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      change: '+8%',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Helmet>
        <title>My Applications - CareerCrafter</title>
      </Helmet>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-8 sm:px-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">My Applications</h1>
              <p className="text-lg text-purple-100">Track your journey to your dream job</p>
            </div>
            <div className="mt-6 flex items-center space-x-4 md:mt-0">
              <Link
                to="/jobseeker/find-jobs"
                className="flex items-center space-x-2 rounded-lg bg-white px-6 py-3 font-medium text-purple-600 transition-colors duration-200 hover:bg-purple-50"
              >
                <Plus className="h-5 w-5" />
                <span>Find More Jobs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-24">
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} rounded-lg p-3 text-white`}>{stat.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-10 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={handleStatusFilter}
                  className="appearance-none rounded-lg border border-gray-200 bg-white py-3 pr-8 pl-10 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
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
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('cards')}
                className={`rounded-lg px-4 py-2 transition-colors duration-200 ${
                  viewMode === 'cards'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`rounded-lg px-4 py-2 transition-colors duration-200 ${
                  viewMode === 'kanban'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Kanban
              </button>
            </div>
          </div>
        </div>

        {/* Applications Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredApplications.length > 0 ? (
              filteredApplications.map(application => (
                <div
                  key={application.id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-purple-200 hover:shadow-lg"
                >
                  {/* Urgency Indicator */}
                  <div
                    className={`absolute top-0 left-0 h-full w-1 ${getUrgencyIndicator(application.urgency)}`}
                  />

                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50">
                        {application.companyLogo ? (
                          <img
                            src={application.companyLogo || '/placeholder.svg'}
                            alt={application.company}
                            className="h-8 w-8 rounded-lg object-cover"
                          />
                        ) : (
                          <span className="text-sm font-bold text-purple-600">
                            {application?.companyName.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 truncate text-lg font-semibold text-gray-900">
                          {application?.jobTitle}
                        </h3>
                        <p className="mb-1 font-medium text-gray-600">{application.company}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {application.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {application.salary}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(application.status)}`}
                      >
                        {getStatusIcon(application.status)}
                        {application.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {application.progress}%
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                        style={{ width: `${application.progress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{application.nextStep}</p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {application.appliedDate}
                      </span>
                      {application.interviews.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {application.interviews.length} interview(s)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewApplicationDetails(application)}
                        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-50"
                      >
                        <Eye className="h-4 w-4" />
                        Details
                      </button>
                      {/* <button
                        onClick={() => {
                          setSelectedApplication(application);
                          openNoteModal();
                        }}
                        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Note
                      </button> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-2xl bg-white p-12 text-center shadow-sm">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-50 to-indigo-50">
                  <Briefcase className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">No applications found</h3>
                <p className="mx-auto mb-6 max-w-md text-gray-600">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Start your job search journey by applying to positions that match your skills.'}
                </p>
                <Link
                  to="/jobseeker/find-jobs"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  Find Jobs
                </Link>
              </div>
            )}
          </div>
        ) : (
          // Kanban Board View
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {['Applied', 'Interview', 'Offer', 'Rejected', 'No Response'].map(status => (
              <div key={status} className="rounded-xl bg-white p-4 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{status}</h3>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-600">
                    {filteredApplications.filter(app => app.status === status).length}
                  </span>
                </div>
                <div className="space-y-3">
                  {filteredApplications
                    .filter(app => app.status === status)
                    .map(application => (
                      <div
                        key={application.id}
                        className="cursor-pointer rounded-lg bg-gray-50 p-3 transition-shadow duration-200 hover:shadow-md"
                        onClick={() => viewApplicationDetails(application)}
                      >
                        <h4 className="mb-1 text-sm font-medium text-gray-900">
                          {application.position}
                        </h4>
                        <p className="text-xs text-gray-600">{application.company}</p>
                        <p className="mt-1 text-xs text-gray-500">{application.appliedDate}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
              <div className="p-8">
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                      {selectedApplication.position}
                    </h2>
                    <p className="text-xl text-gray-600">
                      {selectedApplication.company} • {selectedApplication.location}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-green-600">
                      {selectedApplication.salary}
                    </p>
                  </div>
                  <button
                    onClick={closeApplicationDetails}
                    className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                        Applied Date
                      </h3>
                      <p className="mt-1 text-lg text-gray-900">
                        {selectedApplication.appliedDate}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                        Status
                      </h3>
                      <span
                        className={`mt-1 inline-flex items-center space-x-2 rounded-full border px-3 py-1 text-sm font-medium ${getStatusColor(selectedApplication.status)}`}
                      >
                        {getStatusIcon(selectedApplication.status)}
                        <span>{selectedApplication.status}</span>
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                        Progress
                      </h3>
                      <div className="mt-2">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-lg font-medium text-gray-900">
                            {selectedApplication.progress}%
                          </span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-gray-200">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300"
                            style={{ width: `${selectedApplication.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                        Next Step
                      </h3>
                      <p className="mt-1 text-lg text-gray-900">{selectedApplication.nextStep}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">Notes</h3>
                    <button
                      onClick={openNoteModal}
                      className="flex items-center space-x-2 font-medium text-purple-600 hover:text-purple-700"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>{selectedApplication.notes ? 'Edit Note' : 'Add Note'}</span>
                    </button>
                  </div>
                  {selectedApplication.notes ? (
                    <div className="rounded-xl bg-gray-50 p-6">
                      <p className="leading-relaxed text-gray-700">{selectedApplication.notes}</p>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-gray-50 p-6 text-center">
                      <p className="text-gray-500 italic">No notes added yet.</p>
                    </div>
                  )}
                </div>

                {selectedApplication.interviews.length > 0 && (
                  <div className="mb-8">
                    <h3 className="mb-6 text-xl font-bold text-gray-900">Interview Timeline</h3>
                    <div className="space-y-6">
                      {selectedApplication.interviews.map((interview, index) => (
                        <div key={index} className="relative">
                          {index !== selectedApplication.interviews.length - 1 && (
                            <div className="absolute top-12 left-6 h-16 w-0.5 bg-gray-200"></div>
                          )}
                          <div className="flex items-start space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 font-bold text-white">
                              {index + 1}
                            </div>
                            <div className="flex-1 rounded-xl bg-gray-50 p-6">
                              <div className="mb-3 flex items-start justify-between">
                                <h4 className="text-lg font-bold text-gray-900">
                                  {interview.type}
                                </h4>
                                <span className="rounded-full bg-white px-3 py-1 text-sm text-gray-500">
                                  {formatDate(interview.date)}
                                </span>
                              </div>
                              <p className="mb-3 text-gray-600">
                                <span className="font-medium">With:</span> {interview.with}
                              </p>
                              {interview.notes && (
                                <div>
                                  <h5 className="mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">
                                    Notes
                                  </h5>
                                  <p className="text-gray-700">{interview.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeApplicationDetails}
                    className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <Link
                    to={`/job-seeker/job/${selectedApplication.id}`}
                    className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:shadow-lg"
                  >
                    <Eye className="h-5 w-5" />
                    <span>View Job Posting</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Note Modal */}
        {showNoteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
              <div className="p-8">
                <div className="mb-6 flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedApplication?.notes ? 'Edit Note' : 'Add Note'}
                  </h2>
                  <button
                    onClick={closeNoteModal}
                    className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    rows="6"
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                    placeholder="Add notes about this application, interviews, follow-ups, or any other relevant information..."
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeNoteModal}
                    className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveNote}
                    className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:shadow-lg"
                  >
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
