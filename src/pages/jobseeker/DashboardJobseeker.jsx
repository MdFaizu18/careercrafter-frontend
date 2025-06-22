import { Link, useNavigate } from 'react-router-dom';
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
  Plus,
  Upload,
  ChartScatter,
  BookUserIcon,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import QuickAdviceBox from '../../components/common/QuickAdviceBox';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthProvider';
import JobseekerProfileService from '../../service/JobseekerProfileService';
import UserService from '../../service/UserService';
import ResumeService from '../../service/ResumeService';
import SkillsService from '../../service/SkillsService';
import ApplicationService from '../../service/ApplicationService';
import JobService from '../../service/JobService';
import EnhancedJobCard from '../../components/common/EnhancedJobCard';

const DashboardJobSeeker = () => {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);
  const jobseekerProfileService = new JobseekerProfileService(auth?.accessToken);
  const jobService = new JobService(auth?.accessToken);
  const userService = new UserService(auth?.accessToken);
  const resumeService = new ResumeService(auth?.accessToken);
  const skillsService = new SkillsService(auth?.accessToken);
  const applicationService = new ApplicationService(auth?.accessToken);

  const [profileCompletion, SetProfileCompletion] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [defaultResume, setDefaultResume] = useState({});
  const [skills, setSkills] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [jobs, setJobs] = useState([]);

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

  useEffect(() => {
    fetchProfileCompletion();
    fetchCurrentUser();
    fetchDefaultResume();
    fetchSkillsForUser();
    fetchRecentApplications();
    fetchJobs();
  }, []);

  const fetchProfileCompletion = async () => {
    try {
      const response = await jobseekerProfileService.getProfileCompletion();
      console.log(response);
      SetProfileCompletion(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCurrentUser = async () => {
    try {
      const response = await userService.getCurrentUser();
      console.log(response);
      setCurrentUser(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDefaultResume = async () => {
    try {
      const response = await resumeService.getDefaultResume();
      console.log(response);
      setDefaultResume(response || 'No Resume');
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSkillsForUser = async () => {
    try {
      const response = await skillsService.getSkillsForUser();
      console.log(response);
      setSkills(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRecentApplications = async () => {
    try {
      const response = await applicationService.getApplicationsForUser();
      console.log(response);
      setRecentApplications(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await jobService.getAllJobs();
      console.log('Fetched jobs:', response);
      setJobs(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  const profileCompleteness = profileCompletion.profileCompletion;

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
              <h1 className="mb-2 text-3xl font-bold">Welcome back, {currentUser.userName} </h1>
              <p className="text-purple-100">Ready to find your next opportunity?</p>
            </div>
            <div className="mt-6 flex items-center space-x-4 md:mt-0">
              <Link
                to="/jobseeker/find-jobs"
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
                to="/jobseeker/applications"
                className="flex items-center space-x-1 text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                <span>View All</span>
                <TrendingUp className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentApplications.length > 0 ? (
                recentApplications.slice(0, 3).map(application => (
                  <div
                    key={application.applicationId}
                    className="rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-purple-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                          {application.companyName.slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="mb-1 font-semibold text-gray-900">
                            {application.jobTitle}
                          </h3>
                          <p className="mb-2 text-sm text-gray-600">{application.companyName}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{application.location || 'Location not specified'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-3 w-3" />
                              <span>{application.salary || 'N/A'}</span>
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
                        <span className="text-xs text-gray-500">{application.appliedAt}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-20 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center shadow-sm transition hover:border-purple-300 hover:bg-white">
                  <BookUserIcon />
                  <p className="text-xl font-semibold text-gray-800">No Applications Found</p>
                  <p className="mt-2 text-sm text-gray-500">
                    You haven’t applied to any jobs yet. Start your journey today!
                  </p>
                  <button
                    onClick={() => navigate('/jobseeker/find-jobs')}
                    className="mt-5 inline-flex items-center gap-2 rounded-md bg-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-purple-700"
                  >
                    <Upload className="h-4 w-4" />
                    Browse Jobs
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-bold text-gray-900">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                to="/jobseeker/find-jobs"
                className="flex w-full items-center space-x-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-white transition-all duration-200 hover:shadow-lg"
              >
                <Search className="h-5 w-5" />
                <span className="font-semibold">Search Jobs</span>
              </Link>
              <Link
                to="/jobseeker/resume"
                className="flex w-full items-center space-x-3 rounded-xl bg-gray-50 p-4 text-gray-700 transition-all duration-200 hover:bg-gray-100"
              >
                <FileText className="h-5 w-5" />
                <span className="font-semibold">Update Resume</span>
              </Link>
              <Link
                to="/jobseeker/profile"
                className="flex w-full items-center space-x-3 rounded-xl bg-gray-50 p-4 text-gray-700 transition-all duration-200 hover:bg-gray-100"
              >
                <User className="h-5 w-5" />
                <span className="font-semibold">Edit Profile</span>
              </Link>
            </div>

            {/* Resume Status */}
            {defaultResume.fileName != null ? (
              <Link to={`${defaultResume.fileUrl}`} target="_blank" rel="noopener noreferrer">
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 transition-shadow hover:shadow-md">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-900">Resume Active</h3>
                      <p className="text-sm text-green-700">{defaultResume.fileName}.pdf</p>
                      <p className="text-xs text-green-600">Updated 2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 p-6 text-center shadow-sm">
                <FileText className="mb-2 h-8 w-8 text-indigo-500" />
                <p className="mb-2 text-sm font-medium text-purple-800">No default resume found</p>
                <Link
                  to="/jobseeker/resume"
                  className="inline-flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Resume
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="mb-8">
          <QuickAdviceBox />
        </div>

        {/* Skills Section */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Your Skills</h2>
            {skills.length > 0 && (
              <Link
                to="/jobseeker/profile"
                className="text-sm font-semibold text-purple-600 hover:text-purple-700"
              >
                Manage Skills
              </Link>
            )}
          </div>

          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <span
                  key={skill.skillId}
                  className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 text-sm font-medium text-purple-700"
                >
                  {skill.skillName}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-purple-50 p-6 text-center">
              <p className="text-sm text-gray-600">No skills added yet.</p>
              <Link
                to="/jobseeker/profile"
                className="inline-flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-purple-700"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <Plus />
                </svg>
                Add Your Skills
              </Link>
            </div>
          )}
        </div>

        {/* Recommended Jobs */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
            <Link
              to="/jobseeker/search-jobs"
              className="flex items-center space-x-1 font-semibold text-purple-600 hover:text-purple-700"
            >
              <span>View All</span>
              <TrendingUp className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {jobs.length > 0 &&
              jobs
                .slice(0, 2)
                .map(job => (
                  <EnhancedJobCard key={job.id} job={job} applications={recentApplications} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardJobSeeker;
