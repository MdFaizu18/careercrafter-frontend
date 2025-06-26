import { Link } from 'react-router-dom';
import { Briefcase, Users, Clock, Eye, Plus, ChevronRight, MapPin } from 'lucide-react';
import ApplicationService from '../../service/ApplicationService';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthProvider';
import JobService from '../../service/JobService';

const DashboardEmployer = () => {
  const { auth } = useContext(AuthContext);
  const applicationService = new ApplicationService(auth?.accessToken);
  const jobService = new JobService(auth?.accessToken);
  const [activeJobs, setActiveJobs] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);

  useEffect(() => {
    fetchRecentApplications();
    fetchJobs();
  }, []);

  const fetchRecentApplications = async () => {
    try {
      const response = await applicationService.getApplicationsForEmployer();
      console.log(response);
      setRecentApplications(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchJobs = async () => {
    try {
      const response = await jobService.getJobsForEmployer();
      console.log(response);
      setActiveJobs(response);
    } catch (error) {
      console.log(error);
    }
  };

  const stats = [
    {
      title: 'Active Jobs',
      value: activeJobs.length > 0 ? activeJobs.length : '0',
      icon: <Briefcase className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
    },
    {
      title: 'Applications',
      value: recentApplications.length > 0 ? recentApplications.length : '0',
      icon: <Users className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    },
    {
      title: 'Interviews',
      value:
        recentApplications.length > 0
          ? recentApplications.filter(app => app.status === 'SHORTLISTED').length.toString()
          : '0',
      icon: <Clock className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-green-500 to-green-700',
    },
    {
      title: 'Selected',
      value:
        recentApplications.length > 0
          ? recentApplications.filter(app => app.status === 'SELECTED').length.toString()
          : '0',
      icon: <Eye className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-orange-500 to-orange-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-white sm:px-24">
        <div className="container mx-auto">
          <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">Employer Dashboard</h1>
              <p className="mt-1 text-purple-100">
                Welcome back! Here's your recruitment overview.
              </p>
            </div>

            <div className="flex items-center space-x-4">
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

      <div className="container mx-auto px-6 py-8 sm:px-24">
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
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left column - Active Jobs */}
          <div className="lg:col-span-1">
            {/* Tips Section */}
            <div className="mb-4 flex items-center justify-between pt-8">
              <h2 className="text-xl font-bold text-gray-900">Posted Jobs</h2>
              <Link
                to="/employer/manage-jobs"
                className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
              >
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {activeJobs.slice(0, 3).map(job => (
                <div
                  key={job.jobId}
                  className="overflow-hidden rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900">{job.jobTitle}</h3>
                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-800">
                      {job.applications.length} applications
                    </span>
                  </div>

                  <div className="mb-3 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span>{job.location}</span>
                    <span className="mx-2">•</span>
                    <span>{job.jobType}</span>
                  </div>

                  <div className="mb-4 flex justify-between text-xs">
                    <span className="text-gray-500">Posted {job.createdAt}</span>
                    <span className="font-medium text-amber-600">
                      Expires in {job.applicationDeadline}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/employer/applications/${job.jobId}`}
                      className="flex-1 rounded-lg bg-purple-50 py-2 text-center text-sm font-medium text-purple-700 transition-colors hover:bg-purple-100"
                    >
                      View Applications
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right column - Applications and Chart */}
          <div className="lg:col-span-2">
            {/* Recent Applications - Redesigned */}
            <div className="mt-8 mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                <Link
                  to="/employer/view-applications"
                  className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-800"
                >
                  View all
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                {recentApplications.slice(0, 7).map((application, index) => (
                  <div
                    key={application.applicationId}
                    className={`flex items-center justify-between p-4 hover:bg-gray-50 ${
                      index !== recentApplications.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-200">
                        {application.fullName.slice(0, 1).toUpperCase()}
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900">{application.fullName}</h4>
                        <p className="text-sm text-gray-500">{application.jobTitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{application.appliedAt}</span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          application.status === 'PENDING'
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
                        to={`/employer/applications/${application.jobId}`}
                        className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployer;
