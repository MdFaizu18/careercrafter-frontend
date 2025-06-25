import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Briefcase,
  Target,
  Plus,
  Search,
  Filter,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ApplicationService from '../../service/ApplicationService';
import AuthContext from '../../context/AuthProvider';
import { ApplicationCard } from '../../components/common/ApplicationCard';
import { ApplicationDetailsModal } from '../../components/common/ApplicationDetailsModal';

const STATUS_COLORS = {
  pending: 'bg-blue-100 text-blue-700 border-blue-200',
  shortlisted: 'bg-purple-100 text-purple-700 border-purple-200',
  selected: 'bg-green-100 text-green-700 border-green-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
  default: 'bg-gray-100 text-gray-700 border-gray-200',
};

const STATUS_ICONS = {
  pending: Clock,
  shortlisted: Users,
  selected: CheckCircle,
  rejected: XCircle,
  default: Clock,
};

const DATE_FORMAT_OPTIONS = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

const MyApplications = () => {
  const { auth } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [loading, setIsLoading] = useState(false);

  const applicationService = new ApplicationService(auth?.accessToken);

  const fetchRecentApplications = async () => {
    setIsLoading(true);
    try {
      const response = await applicationService.getApplicationsForUser();
      setApplications(response);
      console.log('Recent Applications:', response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecentApplications();
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = e => {
    setStatusFilter(e.target.value);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || app.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalApps = applications.length;
  const shortlistedApps = applications.filter(app => app.status === 'SHORTLISTED').length;
  const pendingApps = applications.filter(app => app.status === 'PENDING').length;
  const responseRate =
    totalApps > 0 ? Math.round(((totalApps - pendingApps) / totalApps) * 100) : 0;

  const stats = [
    {
      title: 'Total Applications',
      value: totalApps.toString(),
      icon: <Briefcase className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      change: '+12%',
    },
    {
      title: 'Active Interviews',
      value: shortlistedApps,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      change: '+25%',
    },
    {
      title: 'Pending Offers',
      value: pendingApps,
      icon: <Target className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      change: '+100%',
    },
    {
      title: 'Response Rate',
      value: `${responseRate}%`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      change: '+8%',
    },
  ];

  const getStatusColor = status => {
    return STATUS_COLORS[status?.toLowerCase()] || STATUS_COLORS.default;
  };

  const getStatusIcon = status => {
    const IconComponent = STATUS_ICONS[status?.toLowerCase()] || STATUS_ICONS.default;
    return <IconComponent className="h-4 w-4" />;
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString(undefined, DATE_FORMAT_OPTIONS);
  };

  const viewApplicationDetails = application => {
    setSelectedApplication(application);
    setNoteText(application.notes || '');
  };

  const closeApplicationDetails = () => {
    setSelectedApplication(null);
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
                  <option value="PENDING">Pending</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="SELECTED">Selected</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredApplications.length > 0 ? (
            filteredApplications.map(application => (
              <ApplicationCard
                key={application.id}
                application={application}
                getStatusColor={getStatusColor}
                getStatusIcon={getStatusIcon}
                viewApplicationDetails={viewApplicationDetails}
              />
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

        {/* Application Details Modal */}
        {selectedApplication && (
          <ApplicationDetailsModal
            selectedApplication={selectedApplication}
            closeApplicationDetails={closeApplicationDetails}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            formatDate={formatDate}
          />
        )}

        {/* Note Modal */}
        {showNoteModal && (
          <NoteModal
            selectedApplication={selectedApplication}
            noteText={noteText}
            setNoteText={setNoteText}
            closeNoteModal={closeNoteModal}
            saveNote={saveNote}
          />
        )}
      </div>
    </div>
  );
};

export default MyApplications;
