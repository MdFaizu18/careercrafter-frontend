import { Link } from 'react-router-dom';
import { Briefcase, FileText, Clock, CheckCircle, User, BarChart2, Award } from 'lucide-react';
import StatsCard from '../../components/common/StatsCard';
import { Helmet } from 'react-helmet-async';

const DashboardJobseeker = () => {
  // Sample data
  const stats = [
    {
      title: 'Applications',
      value: '12',
      icon: <Briefcase className="h-6 w-6 text-white" />,
      color: 'bg-purple-600',
    },
    {
      title: 'Profile Views',
      value: '48',
      icon: <User className="h-6 w-6 text-white" />,
      color: 'bg-blue-600',
    },
    {
      title: 'Interviews',
      value: '3',
      icon: <Clock className="h-6 w-6 text-white" />,
      color: 'bg-green-600',
    },
    {
      title: 'Saved Jobs',
      value: '15',
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      color: 'bg-orange-600',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      date: '2 days ago',
      status: 'Applied',
    },
    {
      id: 2,
      position: 'UX Designer',
      company: 'DesignHub',
      date: '1 week ago',
      status: 'Interview',
    },
    {
      id: 3,
      position: 'Product Manager',
      company: 'InnovateTech',
      date: '2 weeks ago',
      status: 'Rejected',
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'WebSolutions Inc.',
      location: 'Remote',
      salary: '$90K - $110K',
      match: '95%',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'CreativeMinds',
      location: 'New York, NY',
      salary: '$85K - $105K',
      match: '90%',
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'AppWorks',
      location: 'San Francisco, CA',
      salary: '$100K - $130K',
      match: '85%',
    },
  ];

  // Calculate profile completeness
  const profileCompleteness = 75;

  return (
    <div className="">
      {/* Hero Section */}
      <Helmet>
        <title>Dashboard - Jobseeker for CareerCrafter </title>
      </Helmet>
      <div className="container mx-auto px-4 py-8 sm:px-24">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Seeker Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's an overview of your job search.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/jobseeker/find-jobs"
              className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Find Jobs
            </Link>
          </div>
        </div>

        {/* Profile Completeness */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-2 text-lg font-semibold">Profile Completeness</h2>
              <p className="mb-4 text-gray-600 md:mb-0">
                Complete your profile to increase your chances of getting hired.
              </p>
            </div>
            <Link
              to="/job-seeker/profile"
              className="font-medium text-purple-600 hover:text-purple-700"
            >
              Complete Profile
            </Link>
          </div>
          <div className="mt-4">
            <div className="h-2.5 w-full rounded-full bg-gray-200">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
                style={{ width: `${profileCompleteness}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm text-gray-600">{profileCompleteness}% Complete</span>
              <span className="text-sm text-gray-600">100%</span>
            </div>
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

        {/* Recent Applications */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Applications</h2>
              <Link
                to="/jobseeker/applications"
                className="font-medium text-purple-600 hover:text-purple-700"
              >
                View All
              </Link>
            </div>
            {recentApplications.length > 0 ? (
              <div className="space-y-4">
                {recentApplications.map(application => (
                  <div
                    key={application.id}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{application.position}</h3>
                        <p className="text-sm text-gray-600">{application.company}</p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          application.status === 'Applied'
                            ? 'bg-blue-100 text-blue-800'
                            : application.status === 'Interview'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-xs text-gray-500">Applied {application.date}</span>
                      <Link
                        to={`/job-seeker/applications/${application.id}`}
                        className="text-xs text-purple-600 hover:text-purple-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <Briefcase className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                <Link
                  to="/job-seeker/search-jobs"
                  className="mt-2 inline-block text-purple-600 hover:text-purple-700"
                >
                  Start applying
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Activity Overview</h2>
              <select className="form-input w-auto px-3 py-1">
                <option>Last 30 days</option>
                <option>Last 60 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
              <div className="text-center">
                <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-500">Activity chart would render here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Recommended Jobs</h2>
            <Link
              to="/jobseeker/find-jobs"
              className="font-medium text-purple-600 hover:text-purple-700"
            >
              View More
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedJobs.map(job => (
              <div
                key={job.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all duration-200 hover:border-purple-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <div className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                    {job.match} Match
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="mr-1 h-4 w-4 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Award className="mr-1 h-4 w-4 text-gray-400" />
                    {job.salary}
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/jobseeker/job/${job.id}`}
                    className="rounded-md bg-purple-100 px-4 py-2 text-purple-700 transition-colors hover:bg-purple-200"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume and Skills */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Resume</h2>
              <Link
                to="/jobseeker/resume"
                className="font-medium text-purple-600 hover:text-purple-700"
              >
                Manage
              </Link>
            </div>
            <div className="flex items-center rounded-lg bg-gray-50 p-4">
              <FileText className="mr-4 h-10 w-10 text-gray-400" />
              <div>
                <h3 className="font-medium">MyResume_2023.pdf</h3>
                <p className="text-sm text-gray-500">Uploaded 2 weeks ago</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Skills</h2>
              <Link
                to="/jobseeker/profile"
                className="font-medium text-purple-600 hover:text-purple-700"
              >
                Edit
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                React
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                JavaScript
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                TypeScript
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                HTML/CSS
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                UI/UX Design
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                Figma
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                Node.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardJobseeker;
