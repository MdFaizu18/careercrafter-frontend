'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Minus,
  Info,
  Users,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Briefcase,
  Globe,
} from 'lucide-react';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    locationType: 'on-site',
    type: 'full-time',
    experience: '',
    salary: {
      min: '',
      max: '',
      period: 'yearly',
      currency: 'USD',
      showSalary: true,
    },
    description: '',
    requirements: [''],
    responsibilities: [''],
    benefits: [''],
    applicationDeadline: '',
    applicationEmail: '',
    skillsRequired: '',
    companyName: 'Your Company',
    companyWebsite: '',
    companyLogo: null,
  });

  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;

    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const addArrayItem = field => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ''],
    });
  };

  const removeArrayItem = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);

    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const handleLogoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        companyLogo: file,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Job description is required';

    // Validate requirements
    if (formData.requirements.some(req => !req.trim())) {
      newErrors.requirements = 'All requirements must be filled or removed';
    }

    // Validate responsibilities
    if (formData.responsibilities.some(resp => !resp.trim())) {
      newErrors.responsibilities = 'All responsibilities must be filled or removed';
    }

    // Validate benefits
    if (formData.benefits.some(benefit => !benefit.trim())) {
      newErrors.benefits = 'All benefits must be filled or removed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, you would send this data to your backend
      console.log('Job posting submitted:', formData);

      // Redirect to manage jobs page
      navigate('/employer/manage-jobs');
    }
  };

  const togglePreview = () => {
    if (!previewMode && !validateForm()) {
      return;
    }
    setPreviewMode(!previewMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 sm:px-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Creative Left Sidebar */}
          <div className="space-y-6 lg:col-span-4">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 p-8 text-white">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
              <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10"></div>

              <div className="relative z-10">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h1 className="text-2xl font-bold">CareerCrafter</h1>
                </div>
                <h2 className="mb-3 text-3xl font-bold">Find Your Perfect Candidate</h2>
                <p className="text-lg leading-relaxed text-purple-100">
                  Post your job and connect with talented professionals ready to make an impact at
                  your company.
                </p>
              </div>
            </div>

            {/* Tips Section */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
              <h3 className="mb-4 flex items-center text-xl font-bold text-gray-900">
                <Star className="mr-2 h-5 w-5 text-yellow-500" />
                Pro Tips for Better Results
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Write Clear Job Titles</h4>
                    <p className="text-sm text-gray-600">
                      Use specific, searchable titles that candidates understand
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Include Salary Range</h4>
                    <p className="text-sm text-gray-600">
                      Jobs with salary info get 3x more applications
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Highlight Benefits</h4>
                    <p className="text-sm text-gray-600">Showcase what makes your company unique</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Be Specific</h4>
                    <p className="text-sm text-gray-600">
                      Detailed requirements attract better matches
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white">Post a New Job</h1>
                    <p className="text-purple-100">
                      Fill out the details to attract the best candidates
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={togglePreview}
                    className="rounded-lg bg-white/20 px-4 py-2 text-white transition-colors hover:bg-white/30"
                  >
                    {previewMode ? 'Edit Job' : 'Preview Job'}
                  </button>
                </div>
              </div>

              <div className="p-8">
                {previewMode ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold text-gray-900">{formData.title}</h2>
                      <div className="mb-4 flex flex-wrap gap-3">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                          {formData.type}
                        </span>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                          {formData.locationType}
                        </span>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          {formData.location}
                        </span>
                        {formData.experience && (
                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                            {formData.experience} experience
                          </span>
                        )}
                      </div>

                      {formData.salary.showSalary && formData.salary.min && formData.salary.max && (
                        <div className="mb-4">
                          <h3 className="mb-1 text-lg font-semibold">Salary</h3>
                          <p className="text-gray-700">
                            {formData.salary.currency} {formData.salary.min} - {formData.salary.max}{' '}
                            {formData.salary.period}
                          </p>
                        </div>
                      )}

                      <div className="mb-4">
                        <h3 className="mb-1 text-lg font-semibold">Job Description</h3>
                        <p className="whitespace-pre-line text-gray-700">{formData.description}</p>
                      </div>

                      {formData.requirements.length > 0 && formData.requirements[0] && (
                        <div className="mb-4">
                          <h3 className="mb-1 text-lg font-semibold">Requirements</h3>
                          <ul className="list-disc pl-5 text-gray-700">
                            {formData.requirements.map(
                              (req, index) => req && <li key={index}>{req}</li>
                            )}
                          </ul>
                        </div>
                      )}

                      {formData.responsibilities.length > 0 && formData.responsibilities[0] && (
                        <div className="mb-4">
                          <h3 className="mb-1 text-lg font-semibold">Responsibilities</h3>
                          <ul className="list-disc pl-5 text-gray-700">
                            {formData.responsibilities.map(
                              (resp, index) => resp && <li key={index}>{resp}</li>
                            )}
                          </ul>
                        </div>
                      )}

                      {formData.benefits.length > 0 && formData.benefits[0] && (
                        <div className="mb-4">
                          <h3 className="mb-1 text-lg font-semibold">Benefits</h3>
                          <ul className="list-disc pl-5 text-gray-700">
                            {formData.benefits.map(
                              (benefit, index) => benefit && <li key={index}>{benefit}</li>
                            )}
                          </ul>
                        </div>
                      )}

                      <div className="mt-8 flex justify-end">
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                        >
                          Publish Job
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Job Details Section */}
                    <div>
                      <h2 className="mb-6 flex items-center border-b border-gray-200 pb-2 text-xl font-semibold">
                        <Briefcase className="mr-2 h-5 w-5 text-purple-600" />
                        Job Details
                      </h2>

                      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="title"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Job Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                              errors.title ? 'border-red-500' : ''
                            }`}
                            placeholder="e.g. Senior Frontend Developer"
                          />
                          {errors.title && (
                            <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="department"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Department
                          </label>
                          <input
                            type="text"
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            placeholder="e.g. Engineering"
                          />
                        </div>
                      </div>

                      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="location"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Location <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                              errors.location ? 'border-red-500' : ''
                            }`}
                            placeholder="e.g. San Francisco, CA"
                          />
                          {errors.location && (
                            <p className="mt-1 text-xs text-red-500">{errors.location}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="locationType"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Location Type
                          </label>
                          <select
                            id="locationType"
                            name="locationType"
                            value={formData.locationType}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          >
                            <option value="on-site">On-site</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="type"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Job Type
                          </label>
                          <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          >
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                            <option value="temporary">Temporary</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="experience"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Experience Level
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          >
                            <option value="">Select experience level</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Mid Level">Mid Level</option>
                            <option value="Senior Level">Senior Level</option>
                            <option value="Executive">Executive</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="mb-1 flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-700">
                            Salary Range
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                          <div>
                            <select
                              name="salary.currency"
                              value={formData.salary.currency}
                              onChange={handleChange}
                              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            >
                              <option value="USD">INR</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                              <option value="CAD">CAD</option>
                              <option value="AUD">AUD</option>
                            </select>
                          </div>
                          <div>
                            <input
                              type="text"
                              name="salary.min"
                              value={formData.salary.min}
                              onChange={handleChange}
                              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              placeholder="Min"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              name="salary.max"
                              value={formData.salary.max}
                              onChange={handleChange}
                              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              placeholder="Max"
                            />
                          </div>
                          <div>
                            <select
                              name="salary.period"
                              value={formData.salary.period}
                              onChange={handleChange}
                              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            >
                              <option value="yearly">per year</option>
                              <option value="monthly">per month</option>
                              <option value="hourly">per hour</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="description"
                          className="mb-1 block text-sm font-medium text-gray-700"
                        >
                          Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="6"
                          className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                            errors.description ? 'border-red-500' : ''
                          }`}
                          placeholder="Describe the role, responsibilities, and ideal candidate..."
                        ></textarea>
                        {errors.description && (
                          <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                        )}
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="skillsRequired"
                          className="mb-1 block text-sm font-medium text-gray-700"
                        >
                          Skills Required
                        </label>
                        <input
                          type="text"
                          id="skillsRequired"
                          name="skillsRequired"
                          value={formData.skillsRequired}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          placeholder="e.g. React, Node.js, MongoDB"
                        />
                      </div>

                      <div className="mb-6">
                        <div className="mb-2 flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-700">
                            Requirements
                          </label>
                          <button
                            type="button"
                            onClick={() => addArrayItem('requirements')}
                            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Add Requirement
                          </button>
                        </div>
                        {errors.requirements && (
                          <p className="mb-2 text-xs text-red-500">{errors.requirements}</p>
                        )}
                        {formData.requirements.map((requirement, index) => (
                          <div key={index} className="mb-2 flex items-center">
                            <input
                              type="text"
                              value={requirement}
                              onChange={e => handleArrayChange(e, index, 'requirements')}
                              className="w-full flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              placeholder={`Requirement ${index + 1}`}
                            />
                            {formData.requirements.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem(index, 'requirements')}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                <Minus className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mb-6">
                        <div className="mb-2 flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-700">
                            Responsibilities
                          </label>
                          <button
                            type="button"
                            onClick={() => addArrayItem('responsibilities')}
                            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Add Responsibility
                          </button>
                        </div>
                        {errors.responsibilities && (
                          <p className="mb-2 text-xs text-red-500">{errors.responsibilities}</p>
                        )}
                        {formData.responsibilities.map((responsibility, index) => (
                          <div key={index} className="mb-2 flex items-center">
                            <input
                              type="text"
                              value={responsibility}
                              onChange={e => handleArrayChange(e, index, 'responsibilities')}
                              className="w-full flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              placeholder={`Responsibility ${index + 1}`}
                            />
                            {formData.responsibilities.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem(index, 'responsibilities')}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                <Minus className="h-5 w-5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Application Settings Section */}
                    <div>
                      <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-semibold">
                        Application Settings
                      </h2>

                      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="applicationDeadline"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Application Deadline
                          </label>
                          <input
                            type="date"
                            id="applicationDeadline"
                            name="applicationDeadline"
                            value={formData.applicationDeadline}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="applicationEmail"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Application Email
                          </label>
                          <input
                            type="email"
                            id="applicationEmail"
                            name="applicationEmail"
                            value={formData.applicationEmail}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            placeholder="e.g. careers@company.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company Information Section */}
                    <div>
                      <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-semibold">
                        Company Information
                      </h2>
                    </div>

                    <div className="flex justify-end space-x-4 border-t border-gray-200 pt-6">
                      <button
                        type="button"
                        onClick={() => navigate('/employer/dashboard')}
                        className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl"
                      >
                        Post Job
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
