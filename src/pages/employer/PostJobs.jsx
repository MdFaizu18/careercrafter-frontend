import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Minus, CheckCircle, Star, Briefcase } from 'lucide-react';
import JobService from '../../service/JobService';
import AuthContext from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import EmployerProfileService from '../../service/EmployerProfileService';
import CompanyService from '../../service/CompanyService';

const PostJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const jobService = new JobService(auth?.accessToken);
  const profileService = new EmployerProfileService(auth?.accessToken);
  const companyService = new CompanyService(auth?.accessToken);

  const [employerData, setEmployerData] = useState({});
  const [company, setCompany] = useState({});

  useEffect(() => {
    fetchEmployerProfile();
    fetchCompany();
  }, []);

  const fetchEmployerProfile = async () => {
    try {
      const response = await profileService.getEmployerProfile();
      console.log(response);
      setEmployerData(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCompany = async () => {
    try {
      const response = await companyService.getCompany();
      console.log(response);
      setCompany(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDepartment: '',
    jobLocation: '',
    locationType: 'ON_SITE',
    jobType: 'FULL_TIME',
    jobExperience: '',
    salaryMin: '',
    salaryMax: '',
    salaryCurrency: 'INR',
    jobDescription: '',
    skillsRequired: [''],
    applicationDeadline: '',
    applicationEmail: '',
    requirements: [''],
    responsibility: [''],
    companyId:  0,
  });

useEffect(() => {
  if (company?.companyId) {
    setFormData(prev => ({
      ...prev,
      companyId: company.companyId,
    }));
  }
}, [company]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      if (id) {
        setIsUpdateMode(true);
        setLoading(true);
        try {
          const response = await jobService.getJobById(id);
          console.log('Job data fetched for update:', response);
          const jobData = response;

          setFormData({
            jobTitle: jobData.jobTitle || '',
            jobDepartment: jobData.jobDepartment || '',
            jobLocation: jobData.jobLocation || '',
            locationType: jobData.locationType || 'ON_SITE',
            jobType: jobData.jobType || 'FULL_TIME',
            jobExperience: jobData.jobExperience || '',
            salaryMin: jobData.salaryMin ? jobData.salaryMin.toString() : '',
            salaryMax: jobData.salaryMax ? jobData.salaryMax.toString() : '',
            salaryCurrency: jobData.salaryCurrency || 'INR',
            jobDescription: jobData.jobDescription || '',
            // Handle arrays properly - ensure they're arrays with at least one empty string
            skillsRequired:
              Array.isArray(jobData.skillsRequired) && jobData.skillsRequired.length > 0
                ? jobData.skillsRequired
                : [''],
            applicationDeadline: jobData.applicationDeadline
              ? jobData.applicationDeadline.split('T')[0]
              : '',
            applicationEmail: jobData.applicationEmail || '',
            requirements:
              Array.isArray(jobData.requirements) && jobData.requirements.length > 0
                ? jobData.requirements
                : [''],
            responsibility:
              Array.isArray(jobData.responsibility) && jobData.responsibility.length > 0
                ? jobData.responsibility
                : [''],
            companyId: jobData.companyId || jobData.company?.companyId || 1,
          });
        } catch (error) {
          console.error('Error fetching job data:', error);
          toast.error('Failed to fetch job data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJobData();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.jobLocation.trim()) {
      newErrors.jobLocation = 'Job location is required';
    }

    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = 'Job description is required';
    }

    // Validate that at least one skill is provided
    const validSkills = formData.skillsRequired.filter(skill => skill.trim() !== '');
    if (validSkills.length === 0) {
      newErrors.skillsRequired = 'At least one skill is required';
    }

    // Validate that at least one requirement is provided
    const validRequirements = formData.requirements.filter(req => req.trim() !== '');
    if (validRequirements.length === 0) {
      newErrors.requirements = 'At least one requirement is required';
    }

    // Validate that at least one responsibility is provided
    const validResponsibilities = formData.responsibility.filter(resp => resp.trim() !== '');
    if (validResponsibilities.length === 0) {
      newErrors.responsibility = 'At least one responsibility is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
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

  // Function to prepare data for submission
  const prepareSubmissionData = () => {
    return {
      ...formData,
      skillsRequired: formData.skillsRequired.filter(skill => skill.trim() !== ''),
      requirements: formData.requirements.filter(req => req.trim() !== ''),
      responsibility: formData.responsibility.filter(resp => resp.trim() !== ''),
      salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : null,
      salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : null,
    };
  };

  const getTodayDate = () => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // adjust timezone
    return today.toISOString().slice(0, 10); // "YYYY-MM-DD"
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    let response;

    try {
      const submissionData = prepareSubmissionData();
      console.log('Submitting job:', submissionData);

      if (isUpdateMode && id) {
        // Update existing job
        response = await jobService.updateJobById(id, submissionData);
        if (response) {
          toast.success('Job updated successfully!');
          navigate('/employer/dashboard');
        } else {
          toast.error('Failed to update job. Please try again.');
        }
      } else {
        // Create new job
        response = await jobService.saveJob(submissionData);
        if (response) {
          toast.success('Job posted successfully!');
          navigate('/employer/dashboard');
        } else {
          toast.error('Failed to post job. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting job:', error);

      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        console.error('Server error:', error.response.data);
        toast.error(
          `Failed to ${isUpdateMode ? 'update' : 'post'} job: ${error.response.data.message || 'Server error'}`
        );
      } else if (error.request) {
        // Request was made but no response
        console.error('Network error:', error.request);
        toast.error('Network error. Please check your connection.');
      } else {
        // Something else happened
        console.error('Error:', error.message);
        toast.error(`Failed to ${isUpdateMode ? 'update' : 'post'} job. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && isUpdateMode) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading job data...</p>
        </div>
      </div>
    );
  }

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
                <h2 className="mb-3 text-3xl font-bold">
                  {isUpdateMode ? 'Update Job Posting' : 'Find Your Perfect Candidate'}
                </h2>
                <p className="text-lg leading-relaxed text-purple-100">
                  {isUpdateMode
                    ? 'Make changes to your job posting to attract the right candidates.'
                    : 'Post your job and connect with talented professionals ready to make an impact at your company.'}
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
                    <h1 className="text-2xl font-bold text-white">
                      {isUpdateMode ? 'Update Job' : 'Post a New Job'}
                    </h1>
                    <p className="text-purple-100">
                      {isUpdateMode
                        ? 'Edit the job details to keep your posting up to date'
                        : 'Fill out the details to attract the best candidates'}
                    </p>
                  </div>
                </div>
              </div>

              {company.companyId ? (
                <div className="p-8">
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
                            htmlFor="jobTitle"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Job Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                              errors.jobTitle ? 'border-red-500' : ''
                            }`}
                            placeholder="e.g. Senior Frontend Developer"
                          />
                          {errors.jobTitle && (
                            <p className="mt-1 text-xs text-red-500">{errors.jobTitle}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="jobDepartment"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Department
                          </label>
                          <input
                            type="text"
                            id="jobDepartment"
                            name="jobDepartment"
                            value={formData.jobDepartment}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            placeholder="e.g. Engineering"
                          />
                        </div>
                      </div>

                      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="jobLocation"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Location <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="jobLocation"
                            name="jobLocation"
                            value={formData.jobLocation}
                            onChange={handleChange}
                            className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                              errors.jobLocation ? 'border-red-500' : ''
                            }`}
                            placeholder="e.g. San Francisco, CA"
                          />
                          {errors.jobLocation && (
                            <p className="mt-1 text-xs text-red-500">{errors.jobLocation}</p>
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
                            <option value="ON_SITE">On-site</option>
                            <option value="REMOTE">Remote</option>
                            <option value="HYBRID">Hybrid</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="jobType"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Job Type
                          </label>
                          <select
                            id="jobType"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          >
                            <option value="FULL_TIME">Full-time</option>
                            <option value="PART_TIME">Part-time</option>
                            <option value="INTERNSHIP">Internship</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="jobExperience"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Experience Level
                          </label>
                          <select
                            id="jobExperience"
                            name="jobExperience"
                            value={formData.jobExperience}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          >
                            <option value="">Select experience level</option>
                            <option value="ZERO_TO_TWO">0 to 2 Years</option>
                            <option value="THREE_TO_FOUR">2 to 4 Years</option>
                            <option value="FIVE_TO_SIX">4 to 6 Years</option>
                            <option value="MORE_THAN_SIX_YEARS">6++ Years</option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="mb-1 flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-700">
                            Salary Range
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                          <div>
                            <select
                              name="salaryCurrency"
                              value={formData.salaryCurrency}
                              onChange={handleChange}
                              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            >
                              <option value="INR">INR</option>
                              <option value="USD">USD</option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                              <option value="CAD">CAD</option>
                              <option value="AUD">AUD</option>
                            </select>
                          </div>
                          <div>
                            <input
                              type="number"
                              name="salaryMin"
                              value={formData.salaryMin}
                              onChange={handleChange}
                              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              placeholder="Min"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              name="salaryMax"
                              value={formData.salaryMax}
                              onChange={handleChange}
                              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              placeholder="Max"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label
                          htmlFor="jobDescription"
                          className="mb-1 block text-sm font-medium text-gray-700"
                        >
                          Job Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="jobDescription"
                          name="jobDescription"
                          value={formData.jobDescription}
                          onChange={handleChange}
                          rows="6"
                          className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                            errors.jobDescription ? 'border-red-500' : ''
                          }`}
                          placeholder="Describe the role, responsibilities, and ideal candidate..."
                        ></textarea>
                        {errors.jobDescription && (
                          <p className="mt-1 text-xs text-red-500">{errors.jobDescription}</p>
                        )}
                      </div>

                      {/* Skills Section */}
                      <div className="mb-6">
                        <div className="mb-2 flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-700">
                            Skills Required <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => addArrayItem('skillsRequired')}
                            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Add Skill
                          </button>
                        </div>
                        {errors.skillsRequired && (
                          <p className="mb-2 text-xs text-red-500">{errors.skillsRequired}</p>
                        )}
                        {formData.skillsRequired.map((skill, index) => (
                          <div key={index} className="mb-2 flex items-center">
                            <input
                              type="text"
                              value={skill}
                              onChange={e => handleArrayChange(e, index, 'skillsRequired')}
                              className="w-full flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              placeholder={`Skill ${index + 1}`}
                            />
                            {formData.skillsRequired.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem(index, 'skillsRequired')}
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
                            Requirements <span className="text-red-500">*</span>
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
                            Responsibilities <span className="text-red-500">*</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => addArrayItem('responsibility')}
                            className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Add Responsibility
                          </button>
                        </div>
                        {errors.responsibility && (
                          <p className="mb-2 text-xs text-red-500">{errors.responsibility}</p>
                        )}
                        {formData.responsibility.map((responsibilitys, index) => (
                          <div key={index} className="mb-2 flex items-center">
                            <input
                              type="text"
                              value={responsibilitys}
                              onChange={e => handleArrayChange(e, index, 'responsibility')}
                              className="w-full flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                              placeholder={`Responsibility ${index + 1}`}
                            />
                            {formData.responsibility.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem(index, 'responsibility')}
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
                            min={getTodayDate()}
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
                </div>
              ) : (
                <>
                  <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-6 text-center shadow-sm">
                    <p className="mb-2 text-lg font-semibold text-yellow-800">
                      You need to complete your profile first!
                    </p>
                    <p className="mb-4 text-sm text-yellow-700">
                      Please add your company details to proceed.
                    </p>
                    <button
                      onClick={() => navigate('/employer/profile')}
                      className="rounded-lg bg-yellow-600 px-4 py-2 text-white transition duration-200 hover:bg-yellow-700"
                    >
                      Go to Employer Profile
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
