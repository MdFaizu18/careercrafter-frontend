'use client';

import { useState } from 'react';
import { Upload, Trash2, Check, X, Download, Edit, FileText } from 'lucide-react';

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
      // Extract filename without extension
      const fileName = file.name.split('.').slice(0, -1).join('.');

      setNewResume({
        ...newResume,
        file: file,
        name: fileName,
      });

      // Clear error when file is uploaded
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

    // Clear error when user types
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
      // In a real app, you would upload the file to your backend
      const newResumeObj = {
        id: Date.now(),
        name: `${newResume.name}.pdf`,
        size: `${Math.round(newResume.file.size / 1024)} KB`,
        lastModified: 'Just now',
        isDefault: resumes.length === 0, // Make default if it's the first resume
        tags: newResume.tags,
      };

      setResumes([...resumes, newResumeObj]);
      closeUploadModal();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:px-24">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume Manager</h1>
          <p className="text-gray-600">Upload and manage your resumes for job applications.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={openUploadModal}
            className="focus:ring-opacity-50 flex items-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload Resume
          </button>
        </div>
      </div>

      {/* Resume List */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">My Resumes</h2>

        {resumes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Resume
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Last Modified
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Tags
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Default
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {resumes.map(resume => (
                  <tr key={resume.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-purple-100">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{resume.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{resume.size}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{resume.lastModified}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {resume.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {resume.isDefault ? (
                        <span className="flex w-fit items-center rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          <Check className="mr-1 h-3 w-3" />
                          Default
                        </span>
                      ) : (
                        <button
                          onClick={() => setDefaultResume(resume.id)}
                          className="text-xs text-purple-600 hover:text-purple-900"
                        >
                          Set as Default
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-3">
                        <button className="text-blue-600 hover:text-blue-900" title="Download">
                          <Download className="h-5 w-5" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900" title="Edit">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => confirmDelete(resume)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <FileText className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">No resumes uploaded yet</h3>
            <p className="mb-6 text-gray-500">Upload your resume to apply for jobs more quickly.</p>
            <button onClick={openUploadModal} className="btn-primary">
              Upload Resume
            </button>
          </div>
        )}
      </div>

      {/* Resume Tips */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Resume Tips</h2>

        <div className="space-y-4">
          <div className="rounded-md bg-blue-50 p-4">
            <h3 className="mb-2 font-medium text-blue-800">Keep it concise</h3>
            <p className="text-sm text-blue-700">
              Limit your resume to 1-2 pages. Recruiters spend an average of 6 seconds scanning a
              resume.
            </p>
          </div>

          <div className="rounded-md bg-green-50 p-4">
            <h3 className="mb-2 font-medium text-green-800">Tailor for each job</h3>
            <p className="text-sm text-green-700">
              Customize your resume for each position by highlighting relevant skills and
              experience.
            </p>
          </div>

          <div className="rounded-md bg-purple-50 p-4">
            <h3 className="mb-2 font-medium text-purple-800">Use keywords</h3>
            <p className="text-sm text-purple-700">
              Include industry-specific keywords to pass through Applicant Tracking Systems (ATS).
            </p>
          </div>

          <div className="rounded-md bg-yellow-50 p-4">
            <h3 className="mb-2 font-medium text-yellow-800">Quantify achievements</h3>
            <p className="text-sm text-yellow-700">
              Use numbers and percentages to demonstrate your impact (e.g., "Increased sales by
              20%").
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-4 text-lg font-bold">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete{' '}
              <span className="font-medium">{resumeToDelete.name}</span>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteResume}
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Resume Modal */}
      {showUploadModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
          <div className="w-full max-w-lg rounded-lg bg-white">
            <div className="p-6">
              <div className="mb-6 flex items-start justify-between">
                <h2 className="text-xl font-bold text-gray-900">Upload Resume</h2>
                <button onClick={closeUploadModal} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="form-label">
                    Resume File <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-purple-600 focus-within:outline-none hover:text-purple-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </div>
                  {newResume.file && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {newResume.file.name}
                    </p>
                  )}
                  {errors.file && <p className="mt-1 text-xs text-red-500">{errors.file}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="resume-name" className="form-label">
                    Resume Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="resume-name"
                    value={newResume.name}
                    onChange={handleNameChange}
                    className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="e.g. Software Developer Resume"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div className="mb-6">
                  <label className="form-label">Tags (Optional)</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      className="form-input flex-grow rounded-r-none"
                      placeholder="e.g. Frontend, React, etc."
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="rounded-r-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                    >
                      Add
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Press "Add" after typing each tag</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {newResume.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center rounded-full bg-purple-100 px-3 py-1 text-purple-700"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-purple-700 hover:text-purple-900"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={closeUploadModal}
                    className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
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
