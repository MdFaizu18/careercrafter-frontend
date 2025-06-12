'use client';

import { useState } from 'react';
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
} from 'lucide-react';

const EmployerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Real Hexaware and Hari K data
  const [employerData, setEmployerData] = useState({
    // Personal Information
    firstName: 'Hari',
    lastName: 'K',
    email: 'ravi.kumar@company.com',
    phone: '+91-9876543210',
    position: 'HR Manager',
    avatar: 'https://example.com/images/ravi.jpg',
    linkedinUrl: 'https://linkedin.com/in/ravi-kumar',
    about: 'Experienced HR with a decade of hiring excellence.',

    // Company Information
    companyName: 'Hexaware',
    companyLogo: 'https://cdn.hexaware.com/logo.png',
    industry: 'Information Technology Services',
    companySize: '10,000+ employees',
    founded: '1990',
    headquarters: 'Mumbai, India',
    website: 'https://www.hexaware.com',
    companyEmail: 'contact@hexaware.com',
    description: 'Hexaware is a global IT services company delivering automation-led solutions.',

    stats: {
      totalJobs: 45,
      activeJobs: 18,
      totalHires: 234,
      avgRating: 4.6,
    },
  });

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
            <div className="relative">
              <img
                src={employerData.avatar || '/placeholder.svg?height=120&width=120'}
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-purple-100 object-cover shadow-lg"
              />
              {isEditing && (
                <button className="absolute right-2 bottom-2 rounded-full bg-purple-600 p-3 text-white shadow-lg transition-all hover:scale-110 hover:bg-purple-700">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900">
                {employerData.firstName} {employerData.lastName}
              </h2>
              <p className="mt-1 text-lg text-gray-600">{employerData.position}</p>
              <p className="font-medium text-purple-600">{employerData.companyName}</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-center">
              <div className="rounded-xl bg-purple-50 p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {employerData.stats.activeJobs}
                </div>
                <div className="text-sm font-medium text-gray-600">Active Jobs</div>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <div className="text-2xl font-bold text-green-600">
                  {employerData.stats.totalHires}
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
                    value={employerData.email}
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
                    value={employerData.phone}
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
                    value={employerData.position}
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
              <img
                src={employerData.companyLogo || '/placeholder.svg?height=80&width=80'}
                alt="Company Logo"
                className="h-20 w-20 rounded-xl border-2 border-gray-200 object-cover shadow-sm"
              />
              <div>
                <h4 className="text-lg font-bold text-gray-900">{employerData.companyName}</h4>
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
                  value={employerData.companyName}
                  onChange={e => setEmployerData({ ...employerData, companyName: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Industry</label>
                <input
                  type="text"
                  value={employerData.industry}
                  onChange={e => setEmployerData({ ...employerData, industry: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="Enter industry"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Company Size
                  </label>
                  <input
                    type="text"
                    value={employerData.companySize}
                    onChange={e =>
                      setEmployerData({ ...employerData, companySize: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="e.g., 10,000+ employees"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Founded</label>
                  <input
                    type="text"
                    value={employerData.founded}
                    onChange={e => setEmployerData({ ...employerData, founded: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter founding year"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Headquarters
                </label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={employerData.headquarters}
                    onChange={e =>
                      setEmployerData({ ...employerData, headquarters: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter headquarters location"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Website</label>
                <div className="relative">
                  <Globe className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={employerData.website}
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
                  value={employerData.description}
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

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
            <div className="text-3xl font-bold text-purple-600">{employerData.stats.totalJobs}</div>
            <div className="mt-1 text-sm font-medium text-gray-600">Total Jobs Posted</div>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
            <div className="text-3xl font-bold text-blue-600">{employerData.stats.activeJobs}</div>
            <div className="mt-1 text-sm font-medium text-gray-600">Active Jobs</div>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm transition-all hover:shadow-md">
            <div className="text-3xl font-bold text-green-600">{employerData.stats.totalHires}</div>
            <div className="mt-1 text-sm font-medium text-gray-600">Successful Hires</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfile;
