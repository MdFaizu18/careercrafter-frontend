import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  Clock,
  BarChart2,
  Eye,
  Plus,
  ChevronRight,
  Search,
  Bell,
  Filter,
  MapPin,
} from 'lucide-react';

const DashboardEmployer = () => {
  // Sample data
  const stats = [
    {
      title: 'Active Jobs',
      value: '12',
      icon: <Briefcase className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
    },
    {
      title: 'Applications',
      value: '143',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    },
    {
      title: 'Interviews',
      value: '28',
      icon: <Clock className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-green-500 to-green-700',
    },
    {
      title: 'Profile Views',
      value: '1,254',
      icon: <Eye className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-orange-500 to-orange-700',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      position: 'Senior Frontend Developer',
      applicant: 'John Smith',
      date: '2 days ago',
      status: 'New',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 2,
      position: 'UX Designer',
      applicant: 'Emily Johnson',
      date: '3 days ago',
      status: 'Reviewed',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 3,
      position: 'Product Manager',
      applicant: 'Michael Brown',
      date: '1 week ago',
      status: 'Interview',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 4,
      position: 'Backend Developer',
      applicant: 'Sarah Wilson',
      date: '1 week ago',
      status: 'Rejected',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      applications: 24,
      posted: '2 weeks ago',
      expires: '2 weeks left',
      location: 'San Francisco, CA',
      type: 'Full-time',
    },
    {
      id: 2,
      title: 'UX Designer',
      applications: 18,
      posted: '1 week ago',
      expires: '3 weeks left',
      location: 'Remote',
      type: 'Contract',
    },
    {
      id: 3,
      title: 'Product Manager',
      applications: 32,
      posted: '3 days ago',
      expires: '27 days left',
      location: 'New York, NY',
      type: 'Full-time',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">Employer Dashboard</h1>
              <p className="mt-1 text-purple-100">
                Welcome back! Here's your recruitment overview.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 cursor-pointer text-purple-100 hover:text-white" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                  3
                </span>
              </div>

              <Link
                to="/employer/post-job"
                className="flex items-center rounded-full bg-white px-6 py-2 font-medium text-purple-700 shadow-md transition-all hover:bg-purple-50"
              >
                <Plus className="mr-2 h-5 w-5" />
                Post Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search and filter bar */}
        <div className="mb-8 flex flex-col items-stretch justify-between gap-4 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center">
          <div className="relative flex-grow">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications, candidates or jobs..."
              className="w-full rounded-lg border-0 bg-gray-50 py-2 pr-4 pl-10 text-gray-900 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </button>

            <select className="rounded-lg border-0 bg-gray-50 px-4 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-purple-500">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Stats Cards - Simplified and more stylish */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="mt-1 text-2xl font-bold">{stat.value}</h3>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} shadow-sm transition-transform group-hover:scale-110`}
                >
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-green-600">
                <span>↑ 12% from last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column - Active Jobs */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Active Jobs</h2>
              <Link
                to="/employer/manage-jobs"
                className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
              >
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {activeJobs.map(job => (
                <div
                  key={job.id}
                  className="overflow-hidden rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-800">
                      {job.applications} apps
                    </span>
                  </div>

                  <div className="mb-3 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span>{job.location}</span>
                    <span className="mx-2">•</span>
                    <span>{job.type}</span>
                  </div>

                  <div className="mb-4 flex justify-between text-xs">
                    <span className="text-gray-500">Posted {job.posted}</span>
                    <span className="font-medium text-amber-600">Expires in {job.expires}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/employer/applications?job=${job.id}`}
                      className="flex-1 rounded-lg bg-purple-50 py-2 text-center text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100"
                    >
                      View Applications
                    </Link>
                    <Link
                      to={`/employer/manage-jobs/${job.id}`}
                      className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Applications and Chart */}
          <div className="lg:col-span-2">
            {/* Recent Applications - Redesigned */}
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                <Link
                  to="/employer/applications"
                  className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
                >
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                {recentApplications.map((application, index) => (
                  <div
                    key={application.id}
                    className={`flex items-center justify-between p-4 hover:bg-gray-50 ${
                      index !== recentApplications.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={application.avatar || '/placeholder.svg'}
                        alt={application.applicant}
                        className="h-10 w-10 rounded-full bg-gray-200"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{application.applicant}</h4>
                        <p className="text-sm text-gray-500">{application.position}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{application.date}</span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          application.status === 'New'
                            ? 'bg-blue-100 text-blue-800'
                            : application.status === 'Reviewed'
                              ? 'bg-purple-100 text-purple-800'
                              : application.status === 'Interview'
                                ? 'bg-amber-100 text-amber-800'
                                : application.status === 'Rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {application.status}
                      </span>
                      <Link
                        to={`/employer/applications/${application.id}`}
                        className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart - Simplified and more stylish */}
            <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Applications Trend</h2>
                <select className="rounded-lg border-0 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 focus:ring-2 focus:ring-purple-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>

              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
                <div className="text-center">
                  <BarChart2 className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2 text-gray-500">Applications chart would render here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployer;
