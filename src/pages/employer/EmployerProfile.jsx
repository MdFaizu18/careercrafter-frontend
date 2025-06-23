'use client';

import { useContext, useEffect, useState } from 'react';
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Edit3,
  Save,
  X,
  Camera,
  Briefcase,
  Star,
  Linkedin,
  User2,
} from 'lucide-react';
import EmployerProfileService from '../../service/EmployerProfileService';
import CompanyService from '../../service/CompanyService';
import AuthContext from '../../context/AuthProvider';

const EmployerProfile = () => {
  const { auth } = useContext(AuthContext);
  const profileService = new EmployerProfileService(auth?.accessToken);
  const companyService = new CompanyService(auth?.accessToken);

  const [isEditing, setIsEditing] = useState(false);

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

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saving employer data:', employerData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-white sm:px-24">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="mt-1 text-purple-100">Manage your profile information</p>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center rounded-lg bg-green-600 px-6 py-2 font-medium text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center rounded-lg bg-gray-600 px-6 py-2 font-medium text-white shadow-md transition-all hover:bg-gray-700 hover:shadow-lg"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center rounded-lg bg-white px-6 py-2 font-medium text-purple-700 shadow-md transition-all hover:bg-purple-50 hover:shadow-lg"
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 sm:px-24">
        {/* Profile Overview */}
        <div className="mb-8 overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-col items-center space-y-6 md:flex-row md:items-center md:space-y-0 md:space-x-8">
            <div className="relative"></div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center space-x-2">
                <User2 />
                <h2 className="text-3xl font-bold text-gray-900">
                  {employerData.firstName} {employerData.lastName}
                </h2>
              </div>
              <p className="mt-1 text-lg text-gray-600">{employerData.position}</p>
              <p className="font-medium text-purple-600">{employerData.companyName}</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-center">
              <div className="rounded-xl bg-purple-50 p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {/* {employerData.stats.activeJobs} */}
                </div>
                <div className="text-sm font-medium text-gray-600">Active Jobs</div>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <div className="text-2xl font-bold text-green-600">
                  {/* {employerData.stats.totalHires} */}
                </div>
                <div className="text-sm font-medium text-gray-600">Total Hires</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Personal Information */}
          <div className="rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-8 flex items-center space-x-3">
              <div className="rounded-xl bg-purple-100 p-3">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={employerData.firstName}
                    onChange={e => setEmployerData({ ...employerData, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={employerData.lastName}
                    onChange={e => setEmployerData({ ...employerData, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={employerData.workEmail}
                    onChange={e => setEmployerData({ ...employerData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={employerData.phoneNumber}
                    onChange={e => setEmployerData({ ...employerData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Job Title</label>
                <div className="relative">
                  <Briefcase className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={employerData.jobTitle}
                    onChange={e => setEmployerData({ ...employerData, position: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter your job title"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  LinkedIn Profile
                </label>
                <div className="relative">
                  <Linkedin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={employerData.linkedinUrl}
                    onChange={e =>
                      setEmployerData({ ...employerData, linkedinUrl: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter your LinkedIn URL"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">About</label>
                <textarea
                  value={employerData.about}
                  onChange={e => setEmployerData({ ...employerData, about: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="Tell us about your experience and expertise..."
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-8 flex items-center space-x-3">
              <div className="rounded-xl bg-blue-100 p-3">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Company Information</h3>
            </div>

            <div className="mb-8 flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-gray-200 object-cover shadow-sm">
                {company.name.slice(0, 1).toUpperCase()}
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900">{company.name}</h4>
                <p className="text-gray-600">{employerData.industry}</p>
                <p className="text-sm text-gray-500">{employerData.headquarters}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={company.name}
                  onChange={e => setEmployerData({ ...employerData, companyName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Location</label>
                <input
                  type="text"
                  value={company.location}
                  onChange={e => setEmployerData({ ...employerData, industry: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="Enter industry"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="text"
                    value={company.email}
                    onChange={e =>
                      setEmployerData({ ...employerData, companySize: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="e.g., 10,000+ employees"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Website</label>
                <div className="relative">
                  <Globe className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={company.website}
                    onChange={e => setEmployerData({ ...employerData, website: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter company website"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Company Description
                </label>
                <textarea
                  value={company.description}
                  onChange={e => setEmployerData({ ...employerData, description: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="Describe your company and what makes it unique..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
