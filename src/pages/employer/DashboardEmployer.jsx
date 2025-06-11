import { Link } from 'react-router-dom';
import { Briefcase, Users, Clock, BarChart2, TrendingUp, Eye, Plus } from 'lucide-react';
import StatsCard from '../../components/common/StatsCard';

const DashboardEmployer = () => {
  // Sample data
  const stats = [
    {
      title: 'Active Jobs',
      value: '12',
      icon: <Briefcase className="h-6 w-6 text-white" />,
      color: 'bg-purple-600',
    },
    {
      title: 'Total Applications',
      value: '143',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-blue-600',
    },
    {
      title: 'Interviews Scheduled',
      value: '28',
      icon: <Clock className="h-6 w-6 text-white" />,
      color: 'bg-green-600',
    },
    {
      title: 'Profile Views',
      value: '1,254',
      icon: <Eye className="h-6 w-6 text-white" />,
      color: 'bg-orange-600',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      position: 'Senior Frontend Developer',
      applicant: 'John Smith',
      date: '2 days ago',
      status: 'New',
    },
    {
      id: 2,
      position: 'UX Designer',
      applicant: 'Emily Johnson',
      date: '3 days ago',
      status: 'Reviewed',
    },
    {
      id: 3,
      position: 'Product Manager',
      applicant: 'Michael Brown',
      date: '1 week ago',
      status: 'Interview',
    },
    {
      id: 4,
      position: 'Backend Developer',
      applicant: 'Sarah Wilson',
      date: '1 week ago',
      status: 'Rejected',
    },
    {
      id: 5,
      position: 'Marketing Specialist',
      applicant: 'David Lee',
      date: '2 weeks ago',
      status: 'Hired',
    },
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      applications: 24,
      posted: '2 weeks ago',
      expires: '2 weeks left',
    },
    {
      id: 2,
      title: 'UX Designer',
      applications: 18,
      posted: '1 week ago',
      expires: '3 weeks left',
    },
    {
      id: 3,
      title: 'Product Manager',
      applications: 32,
      posted: '3 days ago',
      expires: '27 days left',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-24">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your job postings.
          </p>
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

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Applications Trend</h2>
            <select className="w-auto w-full rounded-md border border-gray-300 px-3 px-4 py-1 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
            <div className="text-center">
              <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">Applications chart would render here</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Job Performance</h2>
            <select className="w-auto w-full rounded-md border border-gray-300 px-3 px-4 py-1 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option>All Jobs</option>
              <option>Active Jobs</option>
              <option>Closed Jobs</option>
            </select>
          </div>
          <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
            <div className="text-center">
              <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-gray-500">Performance chart would render here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Applications</h2>
          <Link
            to="/employer/applications"
            className="font-medium text-purple-600 hover:text-purple-700"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full overflow-hidden rounded-lg bg-white shadow">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Position</th>
                <th className="px-4 py-3 text-left font-medium">Applicant</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentApplications.map(application => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{application.position}</td>
                  <td className="px-4 py-3">{application.applicant}</td>
                  <td className="px-4 py-3 text-gray-500">{application.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        application.status === 'New'
                          ? 'bg-blue-100 text-blue-800'
                          : application.status === 'Reviewed'
                            ? 'bg-purple-100 text-purple-800'
                            : application.status === 'Interview'
                              ? 'bg-yellow-100 text-yellow-800'
                              : application.status === 'Rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/employer/applications/${application.id}`}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Jobs */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Active Job Listings</h2>
          <Link
            to="/employer/manage-jobs"
            className="font-medium text-purple-600 hover:text-purple-700"
          >
            Manage Jobs
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeJobs.map(job => (
            <div
              key={job.id}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <h3 className="mb-2 text-lg font-semibold">{job.title}</h3>
              <div className="mb-4 flex items-center text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                <span className="text-sm">Posted {job.posted}</span>
              </div>
              <div className="mb-4 flex justify-between">
                <div className="text-sm">
                  <span className="text-gray-500">Applications:</span>
                  <span className="ml-1 font-medium">{job.applications}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Expires:</span>
                  <span className="ml-1 font-medium">{job.expires}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/employer/applications?job=${job.id}`}
                  className="rounded bg-purple-100 px-3 py-1 text-sm text-purple-700 hover:bg-purple-200"
                >
                  View Applications
                </Link>
                <Link
                  to={`/employer/manage-jobs/${job.id}`}
                  className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployer;
