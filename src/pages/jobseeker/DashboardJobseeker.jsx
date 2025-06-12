import { Link } from 'react-router-dom';
import {
  Briefcase,
  FileText,
  User,
  MapPin,
  DollarSign,
  TrendingUp,
  Bell,
  Search,
  Calendar,
  Eye,
  Heart,
  LightbulbIcon,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import QuickAdviceBox from '../../components/common/QuickAdviceBox';

const DashboardJobSeeker = () => {
  // Sample data
  const stats = [
    {
      title: 'Applications',
      value: '12',
      change: '+3 this week',
      icon: <Briefcase className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      title: 'Skills Added',
      value: '5',
      change: '+12 this week',
      icon: <Eye className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      title: 'Interviews',
      value: '3',
      change: '+1 this week',
      icon: <Calendar className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      title: 'Resume Uploaded',
      value: '1',
      change: '+5 this week',
      icon: <Heart className="h-6 w-6 text-white" />,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    },
  ];

  const recentApplications = [
    {
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      logo: '/placeholder.svg?height=40&width=40',
      date: '2 days ago',
      status: 'Applied',
      salary: '$120K - $150K',
      location: 'Remote',
    },
    {
      id: 2,
      position: 'UX Designer',
      company: 'DesignHub',
      logo: '/placeholder.svg?height=40&width=40',
      date: '1 week ago',
      status: 'Interview',
      salary: '$90K - $110K',
      location: 'New York, NY',
    },
    {
      id: 3,
      position: 'Product Manager',
      company: 'InnovateTech',
      logo: '/placeholder.svg?height=40&width=40',
      date: '2 weeks ago',
      status: 'Rejected',
      salary: '$130K - $160K',
      location: 'San Francisco, CA',
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'WebSolutions Inc.',
      logo: '/placeholder.svg?height=48&width=48',
      location: 'Remote',
      salary: '$90K - $110K',
      match: '95%',
      type: 'Full-time',
      posted: '2 days ago',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'CreativeMinds',
      logo: '/placeholder.svg?height=48&width=48',
      location: 'New York, NY',
      salary: '$85K - $105K',
      match: '90%',
      type: 'Full-time',
      posted: '1 week ago',
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'AppWorks',
      logo: '/placeholder.svg?height=48&width=48',
      location: 'San Francisco, CA',
      salary: '$100K - $130K',
      match: '85%',
      type: 'Contract',
      posted: '3 days ago',
    },
  ];

  const profileCompleteness = 75;

  const getStatusColor = status => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Interview':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Helmet>
        <title>Dashboard - Job Seeker | CareerCrafter</title>
      </Helmet>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12 sm:px-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">Welcome back, Mohammed! </h1>
              <p className="text-purple-100">Ready to find your next opportunity?</p>
            </div>
            <div className="mt-6 flex items-center space-x-4 md:mt-0">
              <Link
                to="/job-seeker/search-jobs"
                className="flex items-center space-x-2 rounded-xl bg-white px-6 py-3 font-semibold text-purple-600 shadow-lg transition-all duration-200 hover:bg-purple-50 hover:shadow-xl"
              >
                <Search className="h-5 w-5" />
                <span>Find Jobs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-24">
        {/* Profile Completeness Card */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">Complete Your Profile</h2>
              <p className="text-gray-600">
                A complete profile increases your chances of getting hired by 3x
              </p>
            </div>
            <Link
              to="/jobseeker/profile"
              className="mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg md:mt-0"
            >
              Complete Profile
            </Link>
          </div>
          <div className="relative">
            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${profileCompleteness}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm font-medium text-gray-700">
                {profileCompleteness}% Complete
              </span>
              <span className="text-sm text-gray-500">Almost there!</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center space-x-4">
                <div className={`rounded-lg p-2 ${stat.color}`}>{stat.icon}</div>
                <div className="flex-1 text-right">
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-xl font-semibold text-gray-800">{stat.value}</h3>
                </div>
              </div>
              {/* Optional: Change indicator */}
              {/* <p className="text-xs text-green-500">{stat.change}</p> */}
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Applications */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
              <Link
                to="/job-seeker/applications"
                className="flex items-center space-x-1 text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                <span>View All</span>
                <TrendingUp className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentApplications.map(application => (
                <div
                  key={application.id}
                  className="rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-purple-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={application.logo || '/placeholder.svg'}
                        alt={`${application.company} logo`}
                        className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                      />
                      <div>
                        <h3 className="mb-1 font-semibold text-gray-900">{application.position}</h3>
                        <p className="mb-2 text-sm text-gray-600">{application.company}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{application.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span>{application.salary}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(application.status)}`}
                      >
                        {application.status}
                      </span>
                      <span className="text-xs text-gray-500">{application.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                to="/job-seeker/search-jobs"
                className="flex w-full items-center space-x-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-white transition-all duration-200 hover:shadow-lg"
              >
                <Search className="h-5 w-5" />
                <span className="font-semibold">Search Jobs</span>
              </Link>
              <Link
                to="/job-seeker/resume"
                className="flex w-full items-center space-x-3 rounded-xl bg-gray-50 p-4 text-gray-700 transition-all duration-200 hover:bg-gray-100"
              >
                <FileText className="h-5 w-5" />
                <span className="font-semibold">Update Resume</span>
              </Link>
              <Link
                to="/job-seeker/profile"
                className="flex w-full items-center space-x-3 rounded-xl bg-gray-50 p-4 text-gray-700 transition-all duration-200 hover:bg-gray-100"
              >
                <User className="h-5 w-5" />
                <span className="font-semibold">Edit Profile</span>
              </Link>
            </div>

            {/* Resume Status */}
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-900">Resume Active</h3>
                  <p className="text-sm text-green-700">MyResume_2023.pdf</p>
                  <p className="text-xs text-green-600">Updated 2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <QuickAdviceBox />
        </div>

        {/* Skills Section */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Your Skills</h2>
            <Link
              to="/job-seeker/profile"
              className="text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              Manage Skills
            </Link>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              'React',
              'JavaScript',
              'TypeScript',
              'HTML/CSS',
              'UI/UX Design',
              'Figma',
              'Node.js',
              'Python',
            ].map(skill => (
              <span
                key={skill}
                className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 text-sm font-medium text-purple-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
            <Link
              to="/job-seeker/search-jobs"
              className="flex items-center space-x-1 font-semibold text-purple-600 hover:text-purple-700"
            >
              <span>View All</span>
              <TrendingUp className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedJobs.map(job => (
              <div
                key={job.id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-200 hover:border-purple-200 hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <img
                      src={job.logo || '/placeholder.svg'}
                      alt={`${job.company} logo`}
                      className="h-12 w-12 rounded-xl border border-gray-200 object-cover"
                    />
                    <div>
                      <h3 className="mb-1 font-bold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 px-3 py-1 text-xs font-bold text-white">
                    {job.match}
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="rounded-full bg-gray-100 px-2 py-1">{job.type}</span>
                    <span>Posted {job.posted}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/job-seeker/job/${job.id}`}
                    className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-center font-semibold text-white transition-all duration-200 hover:shadow-lg"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardJobSeeker;
