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
  Briefcase,
  Linkedin,
  User2,
} from 'lucide-react';
import EmployerProfileService from '../../service/EmployerProfileService';
import CompanyService from '../../service/CompanyService';
import AuthContext from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import JobService from '../../service/JobService';

const EmployerProfile = () => {
  const { auth } = useContext(AuthContext);
  const profileService = new EmployerProfileService(auth?.accessToken);
  const companyService = new CompanyService(auth?.accessToken);
  const jobService = new JobService(auth?.accessToken);

  const [jobs, setJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const [employerData, setEmployerData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    phoneNumber: '',
    workEmail: '',
    linkedinUrl: '',
    profileImageUrl: 'normalimga.png',
    about: '',
  });

  const [company, setCompany] = useState({
    name: '',
    website: '',
    email: '',
    logo: '',
    description: '',
    location: '',
  });

  // const [originalEmployerData, setOriginalEmployerData] = useState({});
  // const [originalCompanyData, setOriginalCompanyData] = useState({});

  useEffect(() => {
    fetchEmployerProfile();
    fetchCompany();
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobService.getJobsForEmployer();
      console.log(response);
      setJobs(response);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEmployerProfile = async () => {
    try {
      const response = await profileService.getEmployerProfile();
      console.log('Employer profile response:', response);

      if (response && Object.keys(response).length > 0) {
        setEmployerData(response);
        // setOriginalEmployerData(response);
      } else {
        // If no data exists, keep the empty initial state
        console.log('No employer profile data found, will create new profile on save');
      }
    } catch (error) {
      console.log('Error fetching employer profile:', error);
    }
  };

  const fetchCompany = async () => {
    try {
      const response = await companyService.getCompany();
      console.log('Company response:', response);

      if (response && Object.keys(response).length > 0) {
        setCompany(response);
        // setOriginalCompanyData(response);
      } else {
        console.log('No company data found, will create new company on save');
      }
    } catch (error) {
      console.log('Error fetching company:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Save employer profile
      const profileResponse = await profileService.saveEmployerProfile(employerData);
      console.log('Profile saved:', profileResponse);

      // Save company data
      const companyResponse = await companyService.saveCompany(company);
      console.log('Company saved:', companyResponse);

      // Update original data to reflect saved state
      // setOriginalEmployerData(employerData);
      // setOriginalCompanyData(company);

      setIsEditing(false);
      toast.success('Profile and company information saved successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      setSaveMessage('Error saving data. Please try again.');

      // Clear error message after 5 seconds
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEmployerData(originalEmployerData);
    setCompany(originalCompanyData);
    setIsEditing(false);
    setSaveMessage('');
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
                    disabled={isSaving}
                    className="flex items-center rounded-lg bg-green-600 px-6 py-2 font-medium text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-green-400"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex items-center rounded-lg bg-gray-600 px-6 py-2 font-medium text-white shadow-md transition-all hover:bg-gray-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400"
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

          {/* Save Message */}
          {saveMessage && (
            <div
              className={`mt-4 rounded-lg p-3 ${
                saveMessage.includes('Error')
                  ? 'border border-red-400 bg-red-100 text-red-700'
                  : 'border border-green-400 bg-green-100 text-green-700'
              }`}
            >
              {saveMessage}
            </div>
          )}
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
              <p className="mt-1 text-lg text-gray-600">{employerData.jobTitle}</p>
              <p className="font-medium text-purple-600">{company.name}</p>
            </div>
            <div className="grid grid-cols-1 gap-8 text-center">
              <div className="rounded-xl bg-purple-50 p-4">
                <div className="text-2xl font-bold text-purple-600">{jobs.length}</div>
                <div className="text-sm font-medium text-gray-600">Active Jobs</div>
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
                    value={employerData.firstName || ''}
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
                    value={employerData.lastName || ''}
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
                    value={employerData.workEmail || ''}
                    onChange={e => setEmployerData({ ...employerData, workEmail: e.target.value })}
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
                    value={employerData.phoneNumber || ''}
                    onChange={e =>
                      setEmployerData({ ...employerData, phoneNumber: e.target.value })
                    }
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
                    value={employerData.jobTitle || ''}
                    onChange={e => setEmployerData({ ...employerData, jobTitle: e.target.value })}
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
                    value={employerData.linkedinUrl || ''}
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
                  value={employerData.about || ''}
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-gray-200 bg-blue-50 font-bold text-blue-600 shadow-sm">
                {company.name ? company.name.charAt(0).toUpperCase() : 'C'}
              </div>

              <div>
                <h4 className="text-lg font-bold text-gray-900">
                  {company.name || 'Company Name'}
                </h4>
                <p className="text-gray-600">{company.location || 'Location'}</p>
                <p className="text-sm text-gray-500">{company.email || 'Email'}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={company.name || ''}
                  onChange={e => setCompany({ ...company, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Location</label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={company.location || ''}
                    onChange={e => setCompany({ ...company, location: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter company location"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Company Email
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={company.email || ''}
                    onChange={e => setCompany({ ...company, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full rounded-lg border border-gray-200 py-3 pr-4 pl-12 text-gray-900 placeholder-gray-500 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-50 disabled:text-gray-600"
                    placeholder="Enter company email"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Website</label>
                <div className="relative">
                  <Globe className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={company.website || ''}
                    onChange={e => setCompany({ ...company, website: e.target.value })}
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
                  value={company.description || ''}
                  onChange={e => setCompany({ ...company, description: e.target.value })}
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
