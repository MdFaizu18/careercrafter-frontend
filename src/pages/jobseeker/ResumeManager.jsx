'use client';

import { useContext, useEffect, useState } from 'react';
import { Upload, Trash2, X, Download, Edit, FileText, Star, EyeIcon } from 'lucide-react';
import AuthContext from '../../context/AuthProvider';
import ResumeService from '../../service/ResumeService';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ResumeTips from '../../components/additional/ResumeTips';
import JobseekerProfileService from '../../service/JobseekerProfileService';

const ResumeManager = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const resumeService = new ResumeService(auth?.accessToken);
  const jobseekerProfileService = new JobseekerProfileService(auth?.accessToken);

  const [profileExits, setProfileExits] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newResume, setNewResume] = useState({
    file: null,
    name: '',
    tags: [],
  });
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch resumes on component mount
  useEffect(() => {
    fetchResumes();
  }, [uploadLoading, profileExits]);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const response = await resumeService.getAllResume();
      console.log('Fetched resumes:', response);
      const profile = await jobseekerProfileService.getJobseekerProfile();
      const seekerId = profile?.seekerId;

      if (seekerId) {
        setProfileExits(true);
      }
      console.log(profileExits);
      // Process the resumes to ensure consistent data structure
      const processedResumes = response.map(resume => ({
        ...resume,
        tags: processResumeTags(resume.tags),
        updatedAt: formatDate(resume.updatedAt || resume.createdAt),
        size: resume.size || 'Unknown size',
      }));

      setResumes(processedResumes);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to process tags - made more robust
  const processResumeTags = tags => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags.filter(tag => tag && tag.toString().trim());
    if (typeof tags === 'string') {
      return tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
    }
    // If it's neither array nor string, return empty array
    return [];
  };

  // Helper function to format date
  const formatDate = dateString => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Unknown date';
    }
  };

  const handleDeleteConfirmation = async resumeId => {
    const isConfirmed = window.confirm('Are you sure you want to delete this resume?');
    if (!isConfirmed) return;

    try {
      await resumeService.deleteResume(resumeId);
      setResumes(prevResumes => prevResumes.filter(resume => resume.resumeId !== resumeId));
      toast.success('Resume deleted successfully');
    } catch (error) {
      console.error('Error deleting resume:', error);
      const errorMsg = error?.response?.data?.message || 'Failed to delete resume.';
      toast.error(errorMsg);
    }
  };

  const setDefaultResume = async resumeId => {
    try {
      // Find the resume that needs to be set as default
      const resumeToUpdate = resumes.find(resume => resume.resumeId === resumeId);

      if (!resumeToUpdate) {
        toast.error('Resume not found');
        return;
      }

      // Prepare the request body with existing data + isDefault: true
      const updateData = {
        fileName: resumeToUpdate.fileName,
        tags:
          typeof resumeToUpdate.tags === 'string'
            ? resumeToUpdate.tags
            : resumeToUpdate.tags.join(','),
        isDefault: true,
      };

      // Update the resume via API
      await resumeService.updateResume(resumeId, updateData);

      // Update local state - set all resumes to not default, then set the selected one as default
      setResumes(prevResumes =>
        prevResumes.map(resume => ({
          ...resume,
          isDefault: resume.resumeId === resumeId,
        }))
      );

      toast.success('Default resume updated');
    } catch (error) {
      console.error('Error setting default resume:', error);
      toast.error('Failed to set default resume');
    }
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
    setNewResume({
      file: null,
      name: '',
      tags: [],
    });
    setErrors({});
    setNewTag('');
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setNewResume({
      file: null,
      name: '',
      tags: [],
    });
    setErrors({});
    setNewTag('');
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name.split('.').slice(0, -1).join('.');
      setNewResume(prev => ({
        ...prev,
        file: file,
        name: fileName,
      }));

      // Clear file error if it exists
      if (errors.file) {
        setErrors(prev => ({
          ...prev,
          file: '',
        }));
      }
    }
  };

  const handleNameChange = e => {
    setNewResume(prev => ({
      ...prev,
      name: e.target.value,
    }));

    // Clear name error if it exists
    if (errors.name) {
      setErrors(prev => ({
        ...prev,
        name: '',
      }));
    }
  };

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !newResume.tags.includes(trimmedTag)) {
      setNewResume(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setNewTag('');
    }
  };

  const removeTag = tagToRemove => {
    setNewResume(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newResume.file) newErrors.file = 'Please upload a resume file';
    if (!newResume.name.trim()) newErrors.name = 'Resume name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setUploadLoading(true);
    const formData = new FormData();
    formData.append('file', newResume.file);
    formData.append('fileName', newResume.name);
    formData.append('tags', newResume.tags.join(','));
    formData.append('isDefault', resumes.length === 0);

    try {
      const response = await resumeService.uploadResume(formData);
      console.log('Full Upload response:', response);
      console.log('Response data:', response.data);
      console.log('Response structure:', JSON.stringify(response, null, 2));

      // Handle different possible response structures
      let uploadedResumeData = null;

      // Check if data is nested in response.data
      if (response.data) {
        uploadedResumeData = response.data;
      } else if (response) {
        // Sometimes the data might be directly in response
        uploadedResumeData = response;
      }

      console.log('Processed upload data:', uploadedResumeData);

      if (uploadedResumeData) {
        // Create a new resume object with the data we have
        const uploadedResume = {
          // Use the data from response or create temporary data
          resumeId: uploadedResumeData.resumeId || uploadedResumeData.id || Date.now().toString(),
          fileName: uploadedResumeData.fileName || newResume.name,
          fileUrl: uploadedResumeData.fileUrl || uploadedResumeData.url || '#',
          tags: processResumeTags(uploadedResumeData.tags || newResume.tags),
          size: uploadedResumeData.size || `${(newResume.file.size / 1024).toFixed(1)} KB`,
          updatedAt: formatDate(
            uploadedResumeData.updatedAt || uploadedResumeData.createdAt || new Date()
          ),
          createdAt: uploadedResumeData.createdAt || new Date().toISOString(),
          isDefault: uploadedResumeData.isDefault || resumes.length === 0,
          ...uploadedResumeData,
        };

        console.log('Final processed resume:', uploadedResume);

        // Add the new resume to the list
        setResumes(prev => [...prev, uploadedResume]);
        toast.success('Resume uploaded successfully');
        closeUploadModal();
      } else {
        // If we can't get the data from response, refetch all resumes
        console.warn('Could not process upload response, refetching all resumes');
        await fetchResumes();
        toast.success('Resume uploaded successfully');
        closeUploadModal();
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(
        error?.response?.data?.message || error?.message || 'Upload failed. Please try again.'
      );
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-8 sm:px-24">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="mb-2 text-3xl font-bold">Resume Manager</h1>
              <p className="text-lg text-purple-100">
                Organize, optimize, and track your resume performance
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => {
                  if (!profileExits) {
                    toast.warning('Please complete your profile before uploading a resume');
                    return;
                  }
                  setShowUploadModal(true);
                }}
                className="flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-purple-600 shadow-lg transition-all duration-200 hover:bg-purple-50 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload New Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:px-24">
        {/* Resume Cards */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Your Resumes</h2>
            {loading && <div className="text-sm text-gray-500">Loading resumes...</div>}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
            </div>
          ) : resumes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {resumes.map(resume => (
                <div
                  key={resume.resumeId}
                  className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  {/* Card Header */}
                  <div className="border-b border-gray-100 p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 p-3">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <div className="text-base font-medium text-gray-800">
                            {resume.fileName || 'Untitled Resume'}
                          </div>
                          <p className="text-sm text-gray-500">
                            {resume.size} • {resume.updatedAt}
                          </p>
                        </div>
                      </div>
                      {resume.isDefault && (
                        <div className="flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                          <Star className="mr-1 h-3 w-3" />
                          Default
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {Array.isArray(resume.tags) && resume.tags.length > 0 ? (
                        resume.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400 italic">No tags</span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="bg-gray-50 p-6">
                    <div className="flex gap-2">
                      <a
                        href={resume?.fileUrl}
                        download
                        className="flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                      >
                        <Download className="pointer-events-none mr-2 h-4 w-4" />
                        Download
                      </a>

                      <button
                        onClick={() =>
                          resume?.fileUrl
                            ? window.open(resume.fileUrl, '_blank', 'noopener,noreferrer')
                            : toast.error('Resume file URL is missing.')
                        }
                        className="flex items-center rounded-lg bg-gray-200 px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-300"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteConfirmation(resume.resumeId)}
                        className="rounded-lg bg-red-100 px-3 py-2 text-red-600 transition-colors duration-200 hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {!resume.isDefault && (
                      <button
                        onClick={() => setDefaultResume(resume.resumeId)}
                        className="mt-3 w-full text-sm font-medium text-purple-600 hover:text-purple-700"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-12 text-center shadow-lg">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <FileText className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">No resumes uploaded yet</h3>
              <p className="mb-6 text-gray-500">
                Upload your first resume to get started with job applications.
              </p>
              <button
                onClick={() => {
                  if (!profileExits) {
                    toast.warning('Please complete your profile before uploading a resume');
                    return;
                  }
                  setShowUploadModal(true);
                }}
                className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
              >
                Upload Your First Resume
              </button>
            </div>
          )}
        </div>

        {/* Resume Tips */}
        <ResumeTips />
      </div>

      {/* Upload Resume Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Upload New Resume</h2>
                <button
                  onClick={closeUploadModal}
                  disabled={uploadLoading}
                  className="text-gray-500 transition-colors duration-200 hover:text-gray-700 disabled:opacity-50"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Resume File <span className="text-red-500">*</span>
                  </label>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors duration-200 hover:border-purple-400">
                    <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label
                        htmlFor="file"
                        className="cursor-pointer font-medium text-purple-600 hover:text-purple-700"
                      >
                        Click to upload
                      </label>
                      <span> or drag and drop</span>
                      <input
                        id="file"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={uploadLoading}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                  {newResume.file && (
                    <p className="mt-2 text-sm font-medium text-green-600">
                      ✓ Selected: {newResume.file.name}
                    </p>
                  )}
                  {errors.file && <p className="mt-2 text-sm text-red-600">{errors.file}</p>}
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="fileName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Resume Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fileName"
                    value={newResume.name}
                    onChange={handleNameChange}
                    disabled={uploadLoading}
                    className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 disabled:opacity-50 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. Software Developer Resume"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">Tags</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      disabled={uploadLoading}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                      placeholder="e.g. Frontend, React, etc."
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      disabled={uploadLoading}
                      className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-purple-700 disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {newResume.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          disabled={uploadLoading}
                          className="ml-2 text-purple-600 hover:text-purple-800 disabled:opacity-50"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={closeUploadModal}
                    disabled={uploadLoading}
                    className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadLoading}
                    className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50"
                  >
                    {uploadLoading ? 'Uploading...' : 'Upload Resume'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeManager;
