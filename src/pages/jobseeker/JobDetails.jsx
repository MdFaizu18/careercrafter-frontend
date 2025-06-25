import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Calendar,
  Share2,
  Flag,
  CheckCircle,
  XCircle,
  Send,
  Users,
  Building,
  Globe,
  Heart,
  ArrowRight,
  Award,
  Zap,
  IndianRupee,
} from 'lucide-react';
import AuthContext from '../../context/AuthProvider';
import JobService from '../../service/JobService';
import ResumeService from '../../service/ResumeService';
import JobseekerProfileService from '../../service/JobseekerProfileService';
import ApplicationService from '../../service/ApplicationService';
import { toast } from 'react-toastify';

const JobDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const jobService = new JobService(auth.accessToken);
  const resumeService = new ResumeService(auth?.accessToken);
  const jobseekerProfileService = new JobseekerProfileService(auth?.accessToken);
  const applicationService = new ApplicationService(auth?.accessToken);

  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState({});
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [profile, setProfile] = useState({});
  const [defaultResume, setDefaultResume] = useState({});

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    resumeId: '',
    jobId: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDefaultResume();
    fetchJobDetails();
    fetchUserProfile();
    fetchApplications();
  }, []);

  useEffect(() => {
    setFormData({
      jobId: job.jobId || '',
      fullName: profile.firstName || '',
      email: profile.user?.email || '',
      phoneNumber: profile?.phoneNumber || '',
      resumeId: defaultResume.resumeId || '',
    });
  }, [profile, defaultResume]);

  const fetchJobDetails = async () => {
    try {
      const response = await jobService.getJobById(id);
      console.log('Job details response:', response);
      if (response && response) {
        setJob(response);
      } else {
        console.error('Job details not found');
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
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
  const fetchUserProfile = async () => {
    try {
      const response = await jobseekerProfileService.getJobseekerProfile();
      console.log('from job details', response);
      setProfile(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await applicationService.getApplicationsForUser();
      console.log('Fetched jobs:', response);
      setApplications(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  console.log('Job details:', job);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await applicationService.AddApplicationForJob(formData);
        console.log('Application submitted:', formData);
        setApplicationSubmitted(true);
        // Refresh applications list after successful submission
        fetchApplications();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleApplyClick = () => {
    if (!profile?.seekerId) {
      toast.warning('Please complete your profile first.');
      navigate('/jobseeker/profile');
    } else {
      setShowApplyForm(true);
    }
  };

  if (!job) {
    return <div>Loading job details...</div>;
  }

  // Check if user has already applied to this job
  const hasApplied = applications.some(application => application.jobId === job.jobId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-500 transition-colors hover:text-purple-600">
                Home
              </Link>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <Link
                to="/jobseeker/find-jobs"
                className="text-gray-500 transition-colors hover:text-purple-600"
              >
                Jobs
              </Link>
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-900">{job.jobTitle}</span>
            </nav>
          </div>

          {/* Hero Section */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 px-8 py-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start space-x-6">
                  {/* Company Logo */}
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-3xl font-semibold text-purple-600">
                        {job.jobTitle?.charAt(0)?.toUpperCase() || ''}
                      </div>
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h1 className="text-3xl font-bold text-white">{job.jobTitle}</h1>
                    </div>
                    <div className="mb-4 flex items-center space-x-4 text-purple-100">
                      <span className="text-xl font-semibold">{job.company?.name}</span>
                    </div>

                    {/* Job Details */}
                    <div className="grid grid-cols-2 gap-4 text-purple-100 lg:grid-cols-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-purple-300" />
                        <span className="text-sm">{job.jobLocation}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-5 w-5 text-purple-300" />
                        <span className="text-sm">{job.jobType}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="h-5 w-5 text-purple-300" />
                        <span className="text-sm font-semibold">{job.salaryMin}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-purple-300" />
                        <span className="text-sm">EXP: {job.jobExperience} </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col space-y-3 lg:mt-0">
                  {!hasApplied ? (
                    <button
                      onClick={handleApplyClick}
                      className="flex transform items-center justify-center space-x-2 rounded-xl bg-white px-8 py-4 font-semibold text-purple-700 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <Send className="h-5 w-5" />
                      <span>Apply Now</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex transform cursor-not-allowed items-center justify-center space-x-2 rounded-xl bg-green-200 px-8 py-4 font-semibold text-green-700 shadow-lg"
                    >
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Applied
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="border-b border-gray-100 bg-gray-50 px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Posted {job?.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    Apply before: {job.applicationDeadline}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Job Details */}
            <div className="space-y-8 lg:col-span-2">
              {/* Job Description */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
                    <Briefcase className="h-5 w-5 text-purple-600" />
                  </div>
                  Job Description
                </h2>
                <div className="prose max-w-none leading-relaxed text-gray-700">
                  {job.jobDescription}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                    <Award className="h-5 w-5 text-blue-600" />
                  </div>
                  Key Responsibilities
                </h3>
                <div className="grid gap-4">
                  {job.responsibility &&
                    job.responsibility.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 rounded-xl bg-gray-50 p-4"
                      >
                        <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                          <span className="text-sm font-semibold text-purple-600">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  Requirements
                </h3>
                <div className="grid gap-3">
                  {job.requirements &&
                    job.requirements.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Company Info */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
                <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                    <Building className="h-5 w-5 text-indigo-600" />
                  </div>
                  About {job.company?.name}
                </h3>
                <p className="mb-6 leading-relaxed text-gray-700">{job.company?.description}</p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="rounded-xl bg-gray-50 p-4 text-center">
                    <Users className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                    <div className="text-sm text-gray-500">Company Size</div>
                    <div className="font-semibold text-gray-900">100+</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4 text-center">
                    <Building className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                    <div className="text-sm text-gray-500">Location</div>
                    <div className="font-semibold text-gray-900">{job.company?.location}</div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4 text-center">
                    <Globe className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                    <div className="text-sm text-gray-500">Website</div>
                    <a
                      href={job.company?.webiste}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer font-semibold text-purple-600 hover:text-purple-700"
                    >
                      Visit Site
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Apply Card */}
              <div className="top-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">Ready to Apply?</h3>
                </div>
                {!hasApplied ? (
                  <button
                    onClick={handleApplyClick}
                    className="mb-4 w-full transform rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  >
                    Apply Now
                  </button>
                ) : (
                  <button
                    disabled
                    className="mb-4 w-full transform cursor-not-allowed rounded-xl bg-green-500 py-4 font-semibold text-white opacity-80 shadow-lg"
                  >
                    Already Applied
                  </button>
                )}
              </div>

              {/* Job Summary */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Job Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-600">Position</span>
                    <span className="font-semibold text-gray-900">{job.jobTitle}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-600">Location</span>
                    <span className="font-semibold text-gray-900">{job.jobLocation}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-600">Type</span>
                    <span className="font-semibold text-gray-900">{job.jobType}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-600">Salary</span>
                    <span className="font-semibold text-green-600">
                      {job.salaryMin} - {job.salaryMax}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold text-gray-900">{job.jobExperience}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplyForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="p-8">
              {applicationSubmitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="mb-4 text-3xl font-bold text-gray-900">Application Submitted!</h2>
                  <p className="mb-8 text-lg text-gray-600">
                    Your application for{' '}
                    <span className="font-semibold text-purple-600">{job.jobTitle}</span> at{' '}
                    <span className="font-semibold text-purple-600">{job.company?.name}</span> has
                    been submitted successfully.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <button
                      onClick={() => {
                        setShowApplyForm(false);
                        setApplicationSubmitted(false);
                      }}
                      className="rounded-xl border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Close
                    </button>
                    <Link
                      to="/jobseeker/applications"
                      className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                    >
                      View My Applications
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold text-gray-900">
                        Apply for {job.jobTitle}
                      </h2>
                      <p className="text-gray-600">
                        {job.company?.name} • {job.jobLocation}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowApplyForm(false)}
                      className="text-gray-400 transition-colors hover:text-gray-600"
                    >
                      <XCircle className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-gray-900"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && (
                        <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-gray-900"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-semibold text-gray-900"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                          errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phoneNumber && (
                        <p className="mt-2 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="resume"
                        className="mb-2 block text-sm font-semibold text-gray-900"
                      >
                        Resume <span className="text-red-500">*</span>
                      </label>
                      <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-purple-400">
                        {formData.resumeId && (
                          <p className="mt-2 flex items-center text-sm text-green-600">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            {defaultResume.fileName}
                          </p>
                        )}
                      </div>
                      {errors.resume && (
                        <p className="mt-2 text-sm text-red-500">{errors.resume}</p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-4 pt-6">
                      <button
                        type="button"
                        onClick={() => setShowApplyForm(false)}
                        className="rounded-xl border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                      >
                        <Send className="h-4 w-4" />
                        <span>Submit Application</span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
