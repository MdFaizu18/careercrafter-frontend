'use client';

import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  Star,
  Heart,
  ArrowRight,
  Download,
  Eye,
  TrendingUp,
  Award,
  Zap,
} from 'lucide-react';
import AuthContext from '../../context/AuthProvider';
import JobService from '../../service/JobService';

const JobDetails = () => {
  const { auth } = useContext(AuthContext);
  const jobService = new JobService(auth.accessToken);

  const { id } = useParams();
  const [job, setJob] = useState({});
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    resume: null,
    coverLetter: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
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
    fetchJobDetails();
  }, []);
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

  const handleResumeChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        resume: file,
      });

      if (errors.resume) {
        setErrors({
          ...errors,
          resume: '',
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Application submitted:', formData);
      setApplicationSubmitted(true);
    }
  };

  const createMarkup = html => {
    return { __html: html };
  };

  if (!job) {
    return <div>Loading job details...</div>;
  }

  // Helper function to safely get company name
  const getCompanyName = () => {
    if (typeof job.company === 'string') {
      return job.company;
    }
    if (job.company && job.company.name) {
      return job.company.name;
    }
    return 'Company Name Not Available';
  };

  // Helper function to safely get company website
  const getCompanyWebsite = () => {
    if (job.company && job.company.website) {
      return job.company.website;
    }
    return '#';
  };

  // Helper function to safely get company location
  const getCompanyLocation = () => {
    if (job.company && job.company.location) {
      return job.company.location;
    }
    return job.jobLocation || 'Location Not Available';
  };

  // Helper function to safely get company description
  const getCompanyDescription = () => {
    if (job.company && job.company.description) {
      return job.company.description;
    }
    return `${getCompanyName()} is a leading company in their industry.`;
  };

  // Helper function to safely get company logo
  const getCompanyLogo = () => {
    if (job.company && job.company.logo) {
      return job.company.logo;
    }
    return job.companyLogo || null;
  };

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
                      {getCompanyLogo() ? (
                        <img
                          src={getCompanyLogo() || '/placeholder.svg'}
                          alt={getCompanyName()}
                          className="h-12 w-12 object-contain"
                        />
                      ) : (
                        <Briefcase className="h-10 w-10 text-purple-600" />
                      )}
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="mb-2 flex items-center space-x-3">
                      <h1 className="text-3xl font-bold text-white">{job.jobTitle}</h1>
                    </div>
                    <div className="mb-4 flex items-center space-x-4 text-purple-100">
                      <span className="text-xl font-semibold">{getCompanyName()}</span>
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
                        <DollarSign className="h-5 w-5 text-purple-300" />
                        <span className="text-sm font-semibold">{job.salaryMin}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-purple-300" />
                        <span className="text-sm">{job.jobExperience}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col space-y-3 lg:mt-0">
                  <button
                    onClick={() => setShowApplyForm(true)}
                    className="flex transform items-center justify-center space-x-2 rounded-xl bg-white px-8 py-4 font-semibold text-purple-700 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Send className="h-5 w-5" />
                    <span>Apply Now</span>
                  </button>
                  <div className="flex space-x-3">
                    <button className="flex flex-1 items-center justify-center space-x-2 rounded-lg border-2 border-white/20 px-4 py-2 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10">
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
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
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>120 applicants</span>
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
                <div
                  className="prose max-w-none leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={createMarkup(job.jobDescription)}
                ></div>
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
                      className="font-semibold text-purple-600 hover:text-purple-700"
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
              <div className="sticky top-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">Ready to Apply?</h3>
                  <p className="text-sm text-gray-600">
                    Join {job.applicants || 0} other candidates
                  </p>
                </div>

                <button
                  onClick={() => setShowApplyForm(true)}
                  className="mb-4 w-full transform rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  Apply Now
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center justify-center space-x-2 rounded-lg border py-3 transition-all duration-200 ${
                      isBookmarked
                        ? 'border-purple-200 bg-purple-50 text-purple-700'
                        : 'border-gray-200 text-gray-600 hover:border-purple-200 hover:text-purple-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span className="text-sm font-medium">Save</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 rounded-lg border border-gray-200 py-3 text-gray-600 transition-all duration-200 hover:border-purple-200 hover:text-purple-600">
                    <Flag className="h-4 w-4" />
                    <span className="text-sm font-medium">Report</span>
                  </button>
                </div>
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

              {/* Similar Jobs */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Similar Jobs</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Frontend Developer',
                      company: 'WebSolutions Inc.',
                      location: 'San Francisco, CA',
                    },
                    { title: 'React Developer', company: 'AppWorks', location: 'Remote' },
                    { title: 'UI Engineer', company: 'DesignHub', location: 'New York, NY' },
                  ].map((similarJob, index) => (
                    <div
                      key={index}
                      className="cursor-pointer rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-purple-200 hover:bg-purple-50"
                    >
                      <h4 className="mb-1 font-semibold text-gray-900">{similarJob.title}</h4>
                      <p className="mb-2 text-sm text-gray-600">{similarJob.company}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="mr-1 h-3 w-3" />
                        {similarJob.location}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/job-seeker/search-jobs"
                  className="mt-4 block text-center text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  View More Jobs →
                </Link>
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
                    <span className="font-semibold text-purple-600">{getCompanyName()}</span> has
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
                      to="/job-seeker/applications"
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
                        {getCompanyName()} • {job.jobLocation}
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
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
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
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
                    </div>

                    <div>
                      <label
                        htmlFor="resume"
                        className="mb-2 block text-sm font-semibold text-gray-900"
                      >
                        Resume <span className="text-red-500">*</span>
                      </label>
                      <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-purple-400">
                        <div className="space-y-4">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                            <Download className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <label
                              htmlFor="resume-upload"
                              className="cursor-pointer font-semibold text-purple-600 hover:text-purple-700"
                            >
                              Choose file
                              <input
                                id="resume-upload"
                                name="resume-upload"
                                type="file"
                                className="sr-only"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeChange}
                              />
                            </label>
                            <span className="text-gray-600"> or drag and drop</span>
                          </div>
                          <p className="text-sm text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                        </div>
                      </div>
                      {formData.resume && (
                        <p className="mt-2 flex items-center text-sm text-green-600">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          {formData.resume.name}
                        </p>
                      )}
                      {errors.resume && (
                        <p className="mt-2 text-sm text-red-500">{errors.resume}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="coverLetter"
                        className="mb-2 block text-sm font-semibold text-gray-900"
                      >
                        Cover Letter (Optional)
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        rows="4"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        placeholder="Tell us why you're perfect for this role..."
                      ></textarea>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the{' '}
                        <Link
                          to="/terms"
                          className="font-medium text-purple-600 hover:text-purple-700"
                        >
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link
                          to="/privacy"
                          className="font-medium text-purple-600 hover:text-purple-700"
                        >
                          Privacy Policy
                        </Link>
                      </label>
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
