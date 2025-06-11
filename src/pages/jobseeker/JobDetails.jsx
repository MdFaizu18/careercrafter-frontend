'use client';

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Calendar,
  Share2,
  Bookmark,
  Flag,
  CheckCircle,
  XCircle,
  Send,
} from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    resume: null,
    coverLetter: '',
  });
  const [errors, setErrors] = useState({});

  // Sample job data (in a real app, this would be fetched from an API)
  const job = {
    id: parseInt(id),
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    companyLogo: '/placeholder.svg?height=80&width=80',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120K - $150K',
    experience: '5+ years',
    postedDate: '2 days ago',
    applicationDeadline: '30 days left',
    description: `
      <p>TechCorp Inc. is looking for a Senior Frontend Developer to join our growing team. You will be responsible for building beautiful, responsive web applications that provide exceptional user experiences.</p>
      
      <p>As a Senior Frontend Developer, you will work closely with our design and backend teams to implement new features and improve existing ones. You will have the opportunity to contribute to the architecture and technical direction of our frontend codebase.</p>
    `,
    responsibilities: [
      'Develop new user-facing features using React.js and related technologies',
      'Build reusable components and libraries for future use',
      'Translate designs and wireframes into high-quality code',
      'Optimize applications for maximum speed and scalability',
      'Collaborate with backend developers to integrate frontend and backend systems',
      'Implement responsive design and ensure cross-browser compatibility',
      'Participate in code reviews and mentor junior developers',
    ],
    requirements: [
      '5+ years of experience in frontend development',
      'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model',
      'Thorough understanding of React.js and its core principles',
      'Experience with popular React.js workflows such as Redux or Context API',
      'Familiarity with newer specifications of ECMAScript',
      'Experience with data structure libraries (e.g., Immutable.js)',
      'Knowledge of isomorphic React is a plus',
      'Understanding of RESTful APIs and GraphQL',
      'Familiarity with modern frontend build pipelines and tools',
      'Experience with common frontend development tools such as Babel, Webpack, NPM, etc.',
      'Good understanding of asynchronous request handling, partial page updates, and AJAX',
    ],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      '401(k) with company match',
      'Flexible work hours and remote work options',
      'Unlimited PTO policy',
      'Professional development budget',
      'Weekly team lunches and snacks',
      'Modern office in downtown San Francisco',
    ],
    companyDescription:
      "TechCorp Inc. is a leading technology company specializing in building innovative web and mobile applications for businesses of all sizes. Founded in 2010, we have grown to a team of over 100 talented individuals across engineering, design, and product management. Our mission is to create software that makes people's lives easier and more productive.",
    companyWebsite: 'https://techcorp-example.com',
    companySize: '51-200 employees',
    companyIndustry: 'Software Development',
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
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

      // Clear error when user uploads a file
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
      // In a real app, you would send this data to your backend
      console.log('Application submitted:', formData);

      // Show success message
      setApplicationSubmitted(true);
    }
  };

  // Function to create HTML from string (for job description)
  const createMarkup = html => {
    return { __html: html };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-sm text-gray-600 hover:text-purple-600">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link
                    to="/job-seeker/search-jobs"
                    className="text-sm text-gray-600 hover:text-purple-600"
                  >
                    Jobs
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm text-gray-500">{job.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Job Header */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="mb-4 md:mr-6 md:mb-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-purple-100">
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo || '/placeholder.svg'}
                    alt={job.company}
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <Briefcase className="h-8 w-8 text-purple-600" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="mb-1 text-2xl font-bold text-gray-900">{job.title}</h1>
              <p className="mb-4 text-lg text-gray-600">{job.company}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4 text-gray-400" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-1 h-4 w-4 text-gray-400" />
                  {job.type}
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-gray-400" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-gray-400" />
                  {job.experience}
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col space-y-2 md:mt-0">
              <button
                className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                onClick={() => setShowApplyForm(true)}
              >
                Apply Now
              </button>
              <div className="flex space-x-2">
                {/* <button className="flex flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50">
                  <Bookmark className="mr-1 h-4 w-4" />
                  Save
                </button> */}
                {/* <button className="flex flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </button> */}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="mr-1 h-4 w-4 text-gray-400" />
              Posted {job.postedDate}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="mr-1 h-4 w-4 text-gray-400" />
              Apply before: {job.applicationDeadline}
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold">Job Description</h2>
              <div
                className="prose mb-6 max-w-none"
                dangerouslySetInnerHTML={createMarkup(job.description)}
              ></div>

              <h3 className="mb-3 text-lg font-semibold">Responsibilities</h3>
              <ul className="mb-6 list-disc space-y-2 pl-5">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mb-3 text-lg font-semibold">Requirements</h3>
              <ul className="mb-6 list-disc space-y-2 pl-5">
                {job.requirements.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mb-3 text-lg font-semibold">Benefits</h3>
              <ul className="mb-6 list-disc space-y-2 pl-5">
                {job.benefits.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold">About {job.company}</h2>
              <p className="mb-4 text-gray-700">{job.companyDescription}</p>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company Size</h3>
                  <p className="text-gray-700">{job.companySize}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                  <p className="text-gray-700">{job.companyIndustry}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Website</h3>
                  <a
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    {job.companyWebsite.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Job Summary</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Job Title</h3>
                  <p className="text-gray-700">{job.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-gray-700">{job.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Job Type</h3>
                  <p className="text-gray-700">{job.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Salary Range</h3>
                  <p className="text-gray-700">{job.salary}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Experience</h3>
                  <p className="text-gray-700">{job.experience}</p>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <button
                  className="focus:ring-opacity-50 mb-3 w-full rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  onClick={() => setShowApplyForm(true)}
                >
                  Apply Now
                </button>
                <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
                  <Flag className="mr-2 h-4 w-4" />
                  Report Job
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Similar Jobs</h2>

              <div className="space-y-4">
                <div className="rounded-md border border-gray-200 p-4 transition-colors hover:border-purple-300">
                  <h3 className="font-medium text-gray-900">Frontend Developer</h3>
                  <p className="mb-2 text-sm text-gray-600">WebSolutions Inc.</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="mr-1 h-3 w-3" />
                    San Francisco, CA
                  </div>
                </div>

                <div className="rounded-md border border-gray-200 p-4 transition-colors hover:border-purple-300">
                  <h3 className="font-medium text-gray-900">React Developer</h3>
                  <p className="mb-2 text-sm text-gray-600">AppWorks</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="mr-1 h-3 w-3" />
                    Remote
                  </div>
                </div>

                <div className="rounded-md border border-gray-200 p-4 transition-colors hover:border-purple-300">
                  <h3 className="font-medium text-gray-900">UI Engineer</h3>
                  <p className="mb-2 text-sm text-gray-600">DesignHub</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="mr-1 h-3 w-3" />
                    New York, NY
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/job-seeker/search-jobs"
                  className="text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  View More Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {/* <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"> */}
      {showApplyForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white">
            <div className="p-6">
              {applicationSubmitted ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">Application Submitted!</h2>
                  <p className="mb-6 text-gray-600">
                    Your application for <span className="font-medium">{job.title}</span> at{' '}
                    <span className="font-medium">{job.company}</span> has been submitted
                    successfully.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <button
                      onClick={() => {
                        setShowApplyForm(false);
                        setApplicationSubmitted(false);
                      }}
                      className="btn-secondary"
                    >
                      Close
                    </button>
                    <Link
                      to="/job-seeker/applications"
                      className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
                      View My Applications
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Apply for {job.title}</h2>
                      <p className="text-gray-600">
                        {job.company} - {job.location}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowApplyForm(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XCircle className="h-6 w-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label htmlFor="name" className="form-label">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                    </div>

                    <div className="mb-6">
                      <label htmlFor="resume" className="form-label">
                        Resume <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="resume-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-purple-600 focus-within:outline-none hover:text-purple-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="resume-upload"
                                name="resume-upload"
                                type="file"
                                className="sr-only"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                        </div>
                      </div>
                      {formData.resume && (
                        <p className="mt-2 text-sm text-gray-600">
                          Selected file: {formData.resume.name}
                        </p>
                      )}
                      {errors.resume && (
                        <p className="mt-1 text-xs text-red-500">{errors.resume}</p>
                      )}
                    </div>

                    <div className="mb-6 flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                        I agree to the{' '}
                        <Link to="/terms" className="text-purple-600 hover:text-purple-500">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-purple-600 hover:text-purple-500">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowApplyForm(false)}
                        className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="focus:ring-opacity-50 flex items-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Submit Application
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
