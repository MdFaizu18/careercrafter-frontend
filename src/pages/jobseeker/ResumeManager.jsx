'use client';

import { useState } from 'react';
import {
  Upload,
  Trash2,
  X,
  Download,
  Edit,
  FileText,
  Star,
  Eye,
  Calendar,
  Tag,
  Award,
  TrendingUp,
} from 'lucide-react';

const ResumeManager = () => {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      name: 'MyResume_2023.pdf',
      size: '1.2 MB',
      lastModified: '2 weeks ago',
      isDefault: true,
      tags: ['General', 'Software Development'],
    },
    {
      id: 2,
      name: 'Frontend_Developer_Resume.pdf',
      size: '980 KB',
      lastModified: '1 month ago',
      isDefault: false,
      tags: ['Frontend', 'React', 'UI/UX'],
    },
    {
      id: 3,
      name: 'Product_Manager_Resume.pdf',
      size: '1.1 MB',
      lastModified: '2 months ago',
      isDefault: false,
      tags: ['Product Management', 'Agile'],
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newResume, setNewResume] = useState({
    file: null,
    name: '',
    tags: [],
  });
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState({});

  const confirmDelete = resume => {
    setResumeToDelete(resume);
    setShowDeleteModal(true);
  };

  const deleteResume = () => {
    setResumes(resumes.filter(resume => resume.id !== resumeToDelete.id));
    setShowDeleteModal(false);
    setResumeToDelete(null);
  };

  const setDefaultResume = id => {
    setResumes(
      resumes.map(resume => ({
        ...resume,
        isDefault: resume.id === id,
      }))
    );
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
    setNewResume({
      file: null,
      name: '',
      tags: [],
    });
    setErrors({});
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name.split('.').slice(0, -1).join('.');
      setNewResume({
        ...newResume,
        file: file,
        name: fileName,
      });
      if (errors.file) {
        setErrors({
          ...errors,
          file: '',
        });
      }
    }
  };

  const handleNameChange = e => {
    setNewResume({
      ...newResume,
      name: e.target.value,
    });
    if (errors.name) {
      setErrors({
        ...errors,
        name: '',
      });
    }
  };

  const addTag = () => {
    if (newTag.trim() && !newResume.tags.includes(newTag.trim())) {
      setNewResume({
        ...newResume,
        tags: [...newResume.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const removeTag = tag => {
    setNewResume({
      ...newResume,
      tags: newResume.tags.filter(t => t !== tag),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newResume.file) newErrors.file = 'Please upload a resume file';
    if (!newResume.name.trim()) newErrors.name = 'Resume name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      const newResumeObj = {
        id: Date.now(),
        name: `${newResume.name}.pdf`,
        size: `${Math.round(newResume.file.size / 1024)} KB`,
        lastModified: 'Just now',
        isDefault: resumes.length === 0,
        tags: newResume.tags,
        views: 0,
        downloads: 0,
        applications: 0,
      };
      setResumes([...resumes, newResumeObj]);
      closeUploadModal();
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
                onClick={openUploadModal}
                className="flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-purple-600 shadow-lg transition-all duration-200 hover:bg-purple-50 hover:shadow-xl"
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
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Your Resumes</h2>

          {resumes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {resumes.map(resume => (
                <div
                  key={resume.id}
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
                          <h3 className="text-lg font-semibold text-gray-900">{resume.name}</h3>
                          <p className="text-sm text-gray-500">
                            {resume.size} • {resume.lastModified}
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
                      {resume.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Stats */}
                  <div className="bg-gray-50 p-6">
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </button>
                      <button className="rounded-lg bg-gray-200 px-3 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-300">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete(resume)}
                        className="rounded-lg bg-red-100 px-3 py-2 text-red-600 transition-colors duration-200 hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {!resume.isDefault && (
                      <button
                        onClick={() => setDefaultResume(resume.id)}
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
                onClick={openUploadModal}
                className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
              >
                Upload Your First Resume
              </button>
            </div>
          )}
        </div>

        {/* Resume Tips */}
        <div className="rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center">
            <div className="mr-4 rounded-lg bg-yellow-100 p-3">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Resume Optimization Tips</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
              <h3 className="mb-3 flex items-center font-semibold text-blue-800">
                <Calendar className="mr-2 h-5 w-5" />
                Keep it Current
              </h3>
              <p className="text-sm text-blue-700">
                Update your resume regularly and tailor it for each job application to increase your
                chances.
              </p>
            </div>

            <div className="rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-6">
              <h3 className="mb-3 flex items-center font-semibold text-green-800">
                <TrendingUp className="mr-2 h-5 w-5" />
                Quantify Results
              </h3>
              <p className="text-sm text-green-700">
                Use numbers and percentages to showcase your achievements and impact in previous
                roles.
              </p>
            </div>

            <div className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6">
              <h3 className="mb-3 flex items-center font-semibold text-purple-800">
                <Tag className="mr-2 h-5 w-5" />
                Use Keywords
              </h3>
              <p className="text-sm text-purple-700">
                Include industry-specific keywords to pass through Applicant Tracking Systems (ATS).
              </p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-6">
              <h3 className="mb-3 flex items-center font-semibold text-orange-800">
                <FileText className="mr-2 h-5 w-5" />
                Format Matters
              </h3>
              <p className="text-sm text-orange-700">
                Use a clean, professional format with consistent fonts and spacing for better
                readability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Confirm Deletion</h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete{' '}
              <span className="font-semibold">{resumeToDelete?.name}</span>? This action cannot be
              undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={deleteResume}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Resume Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Upload New Resume</h2>
                <button
                  onClick={closeUploadModal}
                  className="text-gray-500 transition-colors duration-200 hover:text-gray-700"
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
                        htmlFor="file-upload"
                        className="cursor-pointer font-medium text-purple-600 hover:text-purple-700"
                      >
                        Click to upload
                      </label>
                      <span> or drag and drop</span>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
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
                    htmlFor="resume-name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Resume Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="resume-name"
                    value={newResume.name}
                    onChange={handleNameChange}
                    className={`w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. Software Developer Resume"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tags (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g. Frontend, React, etc."
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-purple-700"
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
                          className="ml-2 text-purple-600 hover:text-purple-800"
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
                    className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:from-purple-700 hover:to-indigo-700"
                  >
                    Upload Resume
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
