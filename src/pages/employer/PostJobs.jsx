'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Info } from 'lucide-react';

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
    applicationUrl: '',
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
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
          <button
            type="button"
            onClick={togglePreview}
            className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            {previewMode ? 'Edit Job' : 'Preview Job'}
          </button>
        </div>

        {previewMode ? (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-6">
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
                    {formData.requirements.map((req, index) => req && <li key={index}>{req}</li>)}
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
                  className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  Publish Job
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border-[2px] border-indigo-200 bg-white p-6 shadow-lg"
          >
            <div className="mb-8">
              <h2 className="mb-4 border-b pb-2 text-xl font-semibold">Job Details</h2>

              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="title" className="form-label">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="e.g. Senior Frontend Developer"
                  />
                  {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="department" className="form-label">
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
                  <label htmlFor="location" className="form-label">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.location ? 'border-red-500' : ''}`}
                    placeholder="e.g. San Francisco, CA"
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-red-500">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="locationType" className="form-label">
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
                  <label htmlFor="type" className="form-label">
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
                  <label htmlFor="experience" className="form-label">
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
                  <label className="form-label">Salary Range</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showSalary"
                      name="salary.showSalary"
                      checked={formData.salary.showSalary}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor="showSalary" className="text-sm text-gray-600">
                      Display salary on job post
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <select
                      name="salary.currency"
                      value={formData.salary.currency}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    >
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
                <label htmlFor="description" className="form-label">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Describe the role, responsibilities, and ideal candidate..."
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-xs text-red-500">{errors.description}</p>
                )}
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="form-label">Requirements</label>
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
                  <p className="mt-1 mb-2 text-xs text-red-500">{errors.requirements}</p>
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
                  <label className="form-label">Responsibilities</label>
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
                  <p className="mt-1 mb-2 text-xs text-red-500">{errors.responsibilities}</p>
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

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="form-label">Benefits</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem('benefits')}
                    className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Benefit
                  </button>
                </div>
                {errors.benefits && (
                  <p className="mt-1 mb-2 text-xs text-red-500">{errors.benefits}</p>
                )}
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="mb-2 flex items-center">
                    <input
                      type="text"
                      value={benefit}
                      onChange={e => handleArrayChange(e, index, 'benefits')}
                      className="w-full flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder={`Benefit ${index + 1}`}
                    />
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'benefits')}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 border-b pb-2 text-xl font-semibold">Application Settings</h2>

              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="applicationDeadline" className="form-label">
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
                  <label htmlFor="applicationEmail" className="form-label">
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

              <div className="mb-6">
                <label htmlFor="applicationUrl" className="form-label">
                  External Application URL
                </label>
                <input
                  type="url"
                  id="applicationUrl"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="e.g. https://company.com/careers/job-title"
                />
                <p className="mt-1 flex items-center text-xs text-gray-500">
                  <Info className="mr-1 h-4 w-4" />
                  Leave blank to use CareerCrafter's application system
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-4 border-b pb-2 text-xl font-semibold">Company Information</h2>

              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="companyName" className="form-label">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="companyWebsite" className="form-label">
                    Company Website
                  </label>
                  <input
                    type="url"
                    id="companyWebsite"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="e.g. https://company.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="companyLogo" className="form-label">
                  Company Logo
                </label>
                <input
                  type="file"
                  id="companyLogo"
                  name="companyLogo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Recommended size: 400x400px. Max file size: 2MB.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/employer/dashboard')}
                className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                Post Job
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostJob;
