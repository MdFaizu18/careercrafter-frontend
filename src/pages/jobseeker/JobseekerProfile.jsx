'use client';

import React, { useContext, useEffect } from 'react';

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
  X,
  Star,
  Target,
  CheckCircle,
  Camera,
  Save,
  Eye,
} from 'lucide-react';
import AuthContext from '../../context/AuthProvider';
import JobseekerProfileService from '../../service/JobseekerProfileService';
import EducationProfile from '../../components/stuffs/EducationProfile';
import ExperienceProfile from '../../components/stuffs/ExperienceProfile';
import SkillsProfile from '../../components/stuffs/SkillsProfile';
import EducationService from '../../service/EducationService';
import ExperienceService from '../../service/ExperienceService';
import SkillsService from '../../service/SkillsService';
import { toast } from 'react-toastify';

const JobseekerProfile = () => {
  const { auth } = useContext(AuthContext);
  const [educations, setEducations] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    location: '',
    portfolioUrl: '',
    profileImageUrl: '',
    professionalSummary: '',
    linkedinUrl: '',
    githubUrl: '',
    twitterUrl: '',
  });
  const educationService = new EducationService(auth?.accessToken);
  const experienceService = new ExperienceService(auth?.accessToken);
  const jobseekerProfileService = new JobseekerProfileService(auth?.accessToken);
  const skillsService = new SkillsService(auth?.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchExperience();
    fetchSkills();
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await educationService.getEducationsForUser();
      setEducations(response);
      console.log('response from fetchEducation', response);
    } catch (error) {
      console.log('Error fetching education:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await jobseekerProfileService.getJobseekerGetProfile();
      console.log(response);
      setProfile(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExperience = async () => {
    try {
      const response = await experienceService.getExperiencesForUser();
      console.log(response);
      setExperience(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await skillsService.getSkillsForUser();
      setSkills(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('personalInfo');

  const profileCompletion = 10;

  const handlePersonalInfoChange = e => {
    const { name, value } = e.target;

    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  const handleSocialLinksChange = e => {
    const { name, value } = e.target;

    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };

    setExperience([...experience, newExperience]);
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

    setEducations([...educations, newEducation]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await jobseekerProfileService.saveJobseekerProfile(profile);
      console.log('Saved Successfully', response.data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile.');
    }
  };

  const sectionIcons = {
    personalInfo: User,
    // experience: Briefcase,
    // education: GraduationCap,
    skills: Star,
    socialLinks: Globe,
  };

  const sectionTitles = {
    personalInfo: 'Personal Info',
    // experience: 'Experience',
    // education: 'Education',
    skills: 'Skills',
    socialLinks: 'Social Links',
  };

  const getCleanSkills = () => {
    return skills.map(skill => (typeof skill === 'string' ? skill : skill.skillName));
  };

  const submitSkills = async () => {
    try {
      await skillsService.saveSkills({ skills: getCleanSkills() });
      toast.success('Skills saved successfully');
    } catch (err) {
      toast.error('Failed to save skills');
      console.error(err);
    }
  };

  const deleteSkills = async skillId => {
    try {
      await skillsService.deleteSKill(skillId);
      toast.success('Skills deleted successfully');
      setSkills(skills.filter(skill => skill.skillId !== skillId));
    } catch (err) {
      toast.error('Failed to save skills');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Build Your Professional Profile
              </h1>
              <p className="text-gray-600">
                Create a compelling profile that stands out to employers
              </p>
            </div>
            <div className="flex items-center gap-3"></div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                {/* Profile Completion */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Profile Strength</span>
                    <span className="text-sm font-bold text-purple-600">{profileCompletion}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    {profileCompletion < 70
                      ? 'Complete your profile to attract more employers'
                      : 'Great! Your profile looks professional'}
                  </p>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                  {Object.entries(sectionTitles).map(([key, title]) => {
                    const Icon = sectionIcons[key];
                    const isActive = activeSection === key;

                    return (
                      <button
                        key={key}
                        onClick={() => setActiveSection(key)}
                        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{title}</span>
                        {isActive && <CheckCircle className="ml-auto h-4 w-4" />}
                      </button>
                    );
                  })}
                </nav>

                {/* Quick Stats */}
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">Quick Stats</h3>
                  <div className="space-y-2 text-sm">
                    {/* <div className="flex justify-between">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-medium text-gray-900">{experience.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Education</span>
                      <span className="font-medium text-gray-900">{educations.length}</span>
                    </div> */}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Skills</span>
                      <span className="font-medium text-gray-900">{skills.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-4">
                  <div className="flex items-center gap-3">
                    {React.createElement(sectionIcons[activeSection], {
                      className: 'w-6 h-6 text-white',
                    })}
                    <h2 className="text-xl font-semibold text-white">
                      {sectionTitles[activeSection]}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  {/* Personal Info Section */}
                  {activeSection === 'personalInfo' && (
                    <div className="space-y-6">
                      {/* Profile Photo Section */}
                      <div className="flex flex-col items-start gap-6 md:flex-row">
                        <div className="flex flex-col items-center">
                          <div className="group relative">
                            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-purple-100 to-indigo-100 shadow-lg">
                              <User className="h-full w-full p-6 text-purple-300" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                First Name <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                  type="text"
                                  name="firstName"
                                  value={profile.firstName}
                                  onChange={handlePersonalInfoChange}
                                  className={`w-full rounded-lg border py-3 pr-4 pl-10 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                                    errors.firstName ? 'border-red-300' : 'border-gray-300'
                                  }`}
                                  placeholder="Enter your first name"
                                />
                              </div>
                              {errors.firstName && (
                                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                              )}
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Last Name <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                  type="text"
                                  name="lastName"
                                  value={profile.lastName}
                                  onChange={handlePersonalInfoChange}
                                  className={`w-full rounded-lg border py-3 pr-4 pl-10 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                                    errors.lastName ? 'border-red-300' : 'border-gray-300'
                                  }`}
                                  placeholder="Enter your last name"
                                />
                              </div>
                              {errors.lastName && (
                                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                              <input
                                type="email"
                                name="email"
                                value={profile?.email || 'default@gmail'}
                                onChange={handlePersonalInfoChange}
                                className={`w-full rounded-lg border py-3 pr-4 pl-10 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                                  errors.email ? 'border-red-300' : 'border-gray-300'
                                }`}
                                placeholder="Enter your email address"
                              />
                            </div>
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Phone Number
                              </label>
                              <div className="relative">
                                <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                  type="tel"
                                  name="phoneNumber"
                                  value={profile.phoneNumber}
                                  onChange={handlePersonalInfoChange}
                                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                  placeholder="Enter your phone number"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Location
                              </label>
                              <div className="relative">
                                <MapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                  type="text"
                                  name="location"
                                  value={profile.location}
                                  onChange={handlePersonalInfoChange}
                                  className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                  placeholder="City, State"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Portfolio
                            </label>
                            <div className="relative">
                              <Globe className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                              <input
                                type="url"
                                name="portfolioUrl"
                                value={profile.portfolioUrl}
                                onChange={handlePersonalInfoChange}
                                className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                                placeholder="https://yourwebsite.com"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Professional Summary
                        </label>
                        <textarea
                          name="professionalSummary"
                          value={profile.professionalSummary}
                          onChange={handlePersonalInfoChange}
                          rows="4"
                          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                          placeholder="Write a compelling summary that highlights your key skills and experience..."
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          {/* {profile.professionalSummary.length}/500 characters */}
                        </p>
                      </div>
                    </div>
                  )}
                  {activeSection === 'personalInfo' && (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-white transition-all duration-200 hover:shadow-lg"
                    >
                      <Save className="h-4 w-4" />
                      Save Profile
                    </button>
                  )}

                  {/* Experience Section */}
                  {activeSection === 'experience' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                          <p className="text-gray-600">Add your professional experience</p>
                        </div>
                        <button
                          type="button"
                          onClick={addExperience}
                          className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
                        >
                          <Plus className="h-4 w-4" />
                          Add Experience
                        </button>
                      </div>

                      {experience.length === 0 ? (
                        <div className="py-12 text-center">
                          <Briefcase className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                          <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No experience added yet
                          </h3>
                          <p className="mb-4 text-gray-600">
                            Start building your professional timeline
                          </p>
                          <button
                            type="button"
                            onClick={addExperience}
                            className="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
                          >
                            Add Your First Experience
                          </button>
                        </div>
                      ) : (
                        <ExperienceProfile experience={experience} setExperience={setExperience} />
                      )}
                    </div>
                  )}

                  {/* Education Section */}
                  {activeSection === 'education' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                          <p className="text-gray-600">Add your educational background</p>
                        </div>
                        <button
                          type="button"
                          onClick={addEducation}
                          className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
                        >
                          <Plus className="h-4 w-4" />
                          Add Education
                        </button>
                      </div>

                      {educations.length === 0 ? (
                        <div className="py-12 text-center">
                          <GraduationCap className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                          <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No education added yet
                          </h3>
                          <p className="mb-4 text-gray-600">Add your educational qualifications</p>
                          <button
                            type="button"
                            onClick={addEducation}
                            className="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
                          >
                            Add Education
                          </button>
                        </div>
                      ) : (
                        <EducationProfile educations={educations} setEducations={setEducations} />
                      )}
                    </div>
                  )}

                  {/* Skills Section */}
                  {activeSection === 'skills' && (
                    <SkillsProfile
                      skills={skills}
                      setSkills={setSkills}
                      onSubmitSkills={submitSkills}
                      onDeleteSkills={deleteSkills}
                    />
                  )}

                  {/* Social Links Section */}
                  {activeSection === 'socialLinks' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                          Social & Professional Links
                        </h3>
                        <p className="text-gray-600">Connect your professional profiles</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            LinkedIn Profile
                          </label>
                          <div className="relative">
                            <div className="absolute top-1/2 left-3 -translate-y-1/2 transform">
                              <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-600">
                                <span className="text-xs font-bold text-white">in</span>
                              </div>
                            </div>
                            <input
                              type="url"
                              name="linkedin"
                              value={profile.linkedinUrl}
                              onChange={handleSocialLinksChange}
                              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-12 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                              placeholder="https://linkedin.com/in/username"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            GitHub Profile
                          </label>
                          <div className="relative">
                            <div className="absolute top-1/2 left-3 -translate-y-1/2 transform">
                              <div className="flex h-5 w-5 items-center justify-center rounded bg-gray-900">
                                <span className="text-xs font-bold text-white">GH</span>
                              </div>
                            </div>
                            <input
                              type="url"
                              name="github"
                              value={profile.githubUrl}
                              onChange={handleSocialLinksChange}
                              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-12 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                              placeholder="https://github.com/username"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Twitter Profile
                          </label>
                          <div className="relative">
                            <div className="absolute top-1/2 left-3 -translate-y-1/2 transform">
                              <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-400">
                                <span className="text-xs font-bold text-white">X</span>
                              </div>
                            </div>
                            <input
                              type="url"
                              name="twitter"
                              value={profile.twitterUrl}
                              onChange={handleSocialLinksChange}
                              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-12 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                              placeholder="https://twitter.com/username"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start gap-3">
                          <Target className="mt-0.5 h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="mb-1 font-medium text-blue-900">Pro Tip</h4>
                            <p className="text-sm text-blue-700">
                              Adding professional social links increases your profile visibility and
                              helps employers learn more about your work and expertise.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobseekerProfile;
