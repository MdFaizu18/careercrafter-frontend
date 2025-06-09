'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

const JobseekerProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      location: 'San Francisco, CA',
      website: 'https://johndoe.com',
      bio: 'Experienced frontend developer with a passion for creating beautiful and functional user interfaces.',
      profileImage: null,
    },
    experience: [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        startDate: '2020-01',
        endDate: '',
        current: true,
        description:
          'Lead frontend development for multiple web applications using React, TypeScript, and GraphQL.',
      },
      {
        id: 2,
        title: 'Frontend Developer',
        company: 'WebSolutions',
        location: 'New York, NY',
        startDate: '2017-03',
        endDate: '2019-12',
        current: false,
        description: 'Developed responsive web applications and implemented UI/UX designs.',
      },
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        startDate: '2013-09',
        endDate: '2017-05',
        current: false,
        description: 'Graduated with honors. Focused on web development and user interface design.',
      },
    ],
    skills: [
      'React',
      'JavaScript',
      'TypeScript',
      'HTML/CSS',
      'Node.js',
      'GraphQL',
      'UI/UX Design',
      'Figma',
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
    },
  });

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [newSkill, setNewSkill] = useState('');

  const handlePersonalInfoChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSocialLinksChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [name]: value,
      },
    });
  };

  const handleProfileImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          profileImage: file,
        },
      });
    }
  };

  const handleExperienceChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const newExperience = [...formData.experience];

    if (type === 'checkbox') {
      newExperience[index] = {
        ...newExperience[index],
        [name]: checked,
        endDate: checked ? '' : newExperience[index].endDate,
      };
    } else {
      newExperience[index] = {
        ...newExperience[index],
        [name]: value,
      };
    }

    setFormData({
      ...formData,
      experience: newExperience,
    });
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };

    setFormData({
      ...formData,
      experience: [...formData.experience, newExperience],
    });
  };

  const removeExperience = id => {
    setFormData({
      ...formData,
      experience: formData.experience.filter(exp => exp.id !== id),
    });
  };

  const handleEducationChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const newEducation = [...formData.education];

    if (type === 'checkbox') {
      newEducation[index] = {
        ...newEducation[index],
        [name]: checked,
        endDate: checked ? '' : newEducation[index].endDate,
      };
    } else {
      newEducation[index] = {
        ...newEducation[index],
        [name]: value,
      };
    }

    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };

    setFormData({
      ...formData,
      education: [...formData.education, newEducation],
    });
  };

  const removeEducation = id => {
    setFormData({
      ...formData,
      education: formData.education.filter(edu => edu.id !== id),
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = skill => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill),
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate personal info
    if (!formData.personalInfo.firstName) newErrors.firstName = 'First name is required';
    if (!formData.personalInfo.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.personalInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.personalInfo.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Validate experience
    formData.experience.forEach((exp, index) => {
      if (!exp.title) newErrors[`experience_${index}_title`] = 'Job title is required';
      if (!exp.company) newErrors[`experience_${index}_company`] = 'Company name is required';
      if (!exp.startDate) newErrors[`experience_${index}_startDate`] = 'Start date is required';
      if (!exp.current && !exp.endDate)
        newErrors[`experience_${index}_endDate`] = 'End date is required';
    });

    // Validate education
    formData.education.forEach((edu, index) => {
      if (!edu.degree) newErrors[`education_${index}_degree`] = 'Degree is required';
      if (!edu.school) newErrors[`education_${index}_school`] = 'School name is required';
      if (!edu.startDate) newErrors[`education_${index}_startDate`] = 'Start date is required';
      if (!edu.current && !edu.endDate)
        newErrors[`education_${index}_endDate`] = 'End date is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, you would send this data to your backend
      console.log('Profile data submitted:', formData);

      // Redirect to dashboard
      navigate('/job-seeker/dashboard');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <button
            type="button"
            onClick={handleSubmit}
            className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            Save Changes
          </button>
        </div>

        {/* Profile Navigation */}
        <div className="mb-6 overflow-x-auto rounded-lg bg-white shadow-md">
          <div className="flex p-1">
            <button
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                activeSection === 'personalInfo'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection('personalInfo')}
            >
              Personal Info
            </button>
            <button
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                activeSection === 'experience'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection('experience')}
            >
              Experience
            </button>
            <button
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                activeSection === 'education'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection('education')}
            >
              Education
            </button>
            <button
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                activeSection === 'skills'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection('skills')}
            >
              Skills
            </button>
            <button
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                activeSection === 'socialLinks'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveSection('socialLinks')}
            >
              Social Links
            </button>
          </div>
        </div>

        <form className="rounded-lg bg-white p-6 shadow-md">
          {/* Personal Info Section */}
          {activeSection === 'personalInfo' && (
            <div>
              <h2 className="mb-6 text-xl font-semibold">Personal Information</h2>

              <div className="mb-6 flex flex-col gap-6 md:flex-row">
                <div className="flex flex-col items-center md:w-1/3">
                  <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full bg-gray-200">
                    {formData.personalInfo.profileImage ? (
                      <img
                        src={
                          URL.createObjectURL(formData.personalInfo.profileImage) ||
                          '/placeholder.svg'
                        }
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-full w-full p-8 text-gray-400" />
                    )}
                  </div>
                  <label className="btn-secondary flex cursor-pointer items-center">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                    />
                  </label>
                </div>

                <div className="md:w-2/3">
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.personalInfo.firstName}
                          onChange={handlePersonalInfoChange}
                          className={`w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="form-label">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.personalInfo.lastName}
                          onChange={handlePersonalInfoChange}
                          className={`w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        className={`w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="location" className="form-label">
                        Location
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.personalInfo.location}
                          onChange={handlePersonalInfoChange}
                          className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="website" className="form-label">
                      Website
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.personalInfo.website}
                        onChange={handlePersonalInfoChange}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="bio" className="form-label">
                  Professional Summary
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.personalInfo.bio}
                  onChange={handlePersonalInfoChange}
                  rows="4"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Write a short summary about yourself..."
                ></textarea>
              </div>
            </div>
          )}

          {/* Experience Section */}
          {activeSection === 'experience' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Work Experience</h2>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Experience
                </button>
              </div>

              {formData.experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className="mb-8 border-b border-gray-200 pb-8 last:border-0 last:pb-0"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-lg font-medium">
                      {exp.title ? exp.title : `Experience ${index + 1}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor={`title-${index}`} className="form-label">
                        Job Title <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id={`title-${index}`}
                          name="title"
                          value={exp.title}
                          onChange={e => handleExperienceChange(e, index)}
                          className={`w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[`experience_${index}_title`] ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors[`experience_${index}_title`] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[`experience_${index}_title`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`company-${index}`} className="form-label">
                        Company <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id={`company-${index}`}
                        name="company"
                        value={exp.company}
                        onChange={e => handleExperienceChange(e, index)}
                        className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[`experience_${index}_company`] ? 'border-red-500' : ''}`}
                      />
                      {errors[`experience_${index}_company`] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[`experience_${index}_company`]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor={`location-${index}`} className="form-label">
                      Location
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id={`location-${index}`}
                        name="location"
                        value={exp.location}
                        onChange={e => handleExperienceChange(e, index)}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="City, State or Remote"
                      />
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor={`startDate-${index}`} className="form-label">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="month"
                        id={`startDate-${index}`}
                        name="startDate"
                        value={exp.startDate}
                        onChange={e => handleExperienceChange(e, index)}
                        className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[`experience_${index}_startDate`] ? 'border-red-500' : ''}`}
                      />
                      {errors[`experience_${index}_startDate`] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[`experience_${index}_startDate`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`endDate-${index}`} className="form-label">
                        End Date {!exp.current && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="month"
                        id={`endDate-${index}`}
                        name="endDate"
                        value={exp.endDate}
                        onChange={e => handleExperienceChange(e, index)}
                        disabled={exp.current}
                        className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[`experience_${index}_endDate`] ? 'border-red-500' : ''}`}
                      />
                      {errors[`experience_${index}_endDate`] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[`experience_${index}_endDate`]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`current-${index}`}
                        name="current"
                        checked={exp.current}
                        onChange={e => handleExperienceChange(e, index)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label
                        htmlFor={`current-${index}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        I currently work here
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor={`description-${index}`} className="form-label">
                      Job Description
                    </label>
                    <textarea
                      id={`description-${index}`}
                      name="description"
                      value={exp.description}
                      onChange={e => handleExperienceChange(e, index)}
                      rows="4"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Describe your responsibilities and achievements..."
                    ></textarea>
                  </div>
                </div>
              ))}

              {formData.experience.length === 0 && (
                <div className="py-8 text-center">
                  <Briefcase className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                  <p className="mb-4 text-gray-500">No work experience added yet.</p>
                  <button
                    type="button"
                    onClick={addExperience}
                    className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    Add Experience
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Education Section */}
          {activeSection === 'education' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Education</h2>
                <button
                  type="button"
                  onClick={addEducation}
                  className="flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Education
                </button>
              </div>

              {formData.education.map((edu, index) => (
                <div
                  key={edu.id}
                  className="mb-8 border-b border-gray-200 pb-8 last:border-0 last:pb-0"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-lg font-medium">
                      {edu.degree ? edu.degree : `Education ${index + 1}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor={`degree-${index}`} className="form-label">
                        Degree <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <GraduationCap className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id={`degree-${index}`}
                          name="degree"
                          value={edu.degree}
                          onChange={e => handleEducationChange(e, index)}
                          className={`w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[`education_${index}_degree`] ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors[`education_${index}_degree`] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[`education_${index}_degree`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`school-${index}`} className="form-label">
                        School <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id={`school-${index}`}
                        name="school"
                        value={edu.school}
                        onChange={e => handleEducationChange(e, index)}
                        className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[`education_${index}_school`] ? 'border-red-500' : ''}`}
                      />
                      {errors[`education_${index}_school`] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[`education_${index}_school`]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor={`location-${index}`} className="form-label">
                      Location
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id={`location-${index}`}
                        name="location"
                        value={edu.location}
                        onChange={e => handleEducationChange(e, index)}
                        className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor={`startDate-${index}`} className="form-label">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="month"
                        id={`startDate-${index}`}
                        name="startDate"
                        value={edu.startDate}
                        onChange={e => handleEducationChange(e, index)}
                        className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[`education_${index}_startDate`] ? 'border-red-500' : ''}`}
                      />
                      {errors[`education_${index}_startDate`] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[`education_${index}_startDate`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`endDate-${index}`} className="form-label">
                        End Date {!edu.current && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="month"
                        id={`endDate-${index}`}
                        name="endDate"
                        value={edu.endDate}
                        onChange={e => handleEducationChange(e, index)}
                        disabled={edu.current}
                        className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none ${errors[`education_${index}_endDate`] ? 'border-red-500' : ''}`}
                      />
                      {errors[`education_${index}_endDate`] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[`education_${index}_endDate`]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`current-${index}`}
                        name="current"
                        checked={edu.current}
                        onChange={e => handleEducationChange(e, index)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <label
                        htmlFor={`current-${index}`}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        I'm currently studying here
                      </label>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor={`description-${index}`} className="form-label">
                      Description
                    </label>
                    <textarea
                      id={`description-${index}`}
                      name="description"
                      value={edu.description}
                      onChange={e => handleEducationChange(e, index)}
                      rows="4"
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Describe your studies, achievements, etc..."
                    ></textarea>
                  </div>
                </div>
              ))}

              {formData.education.length === 0 && (
                <div className="py-8 text-center">
                  <GraduationCap className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                  <p className="mb-4 text-gray-500">No education added yet.</p>
                  <button
                    type="button"
                    onClick={addEducation}
                    className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    Add Education
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <div>
              <h2 className="mb-6 text-xl font-semibold">Skills</h2>

              <div className="mb-6">
                <label htmlFor="skills" className="form-label">
                  Add Skills
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="skills"
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    className="w-full flex-grow rounded-md rounded-r-none border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="e.g. JavaScript, Project Management, etc."
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="rounded-r-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                  >
                    Add
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">Press "Add" after typing each skill</p>
              </div>

              <div className="mb-6">
                <label className="form-label">Your Skills</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.skills.length > 0 ? (
                    formData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center rounded-full bg-purple-100 px-3 py-1 text-purple-700"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-purple-700 hover:text-purple-900"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills added yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Social Links Section */}
          {activeSection === 'socialLinks' && (
            <div>
              <h2 className="mb-6 text-xl font-semibold">Social Links</h2>

              <div className="mb-6">
                <label htmlFor="linkedin" className="form-label">
                  LinkedIn
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.socialLinks.linkedin}
                  onChange={handleSocialLinksChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="github" className="form-label">
                  GitHub
                </label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={formData.socialLinks.github}
                  onChange={handleSocialLinksChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="twitter" className="form-label">
                  Twitter
                </label>
                <input
                  type="url"
                  id="twitter"
                  name="twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleSocialLinksChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="focus:ring-opacity-50 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobseekerProfile;
