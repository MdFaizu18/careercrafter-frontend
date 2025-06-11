'use client';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';

const ViewApplications = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get('job');

  // Sample data
  const jobs = [
    { id: '1', title: 'Senior Frontend Developer' },
    { id: '2', title: 'UX Designer' },
    { id: '3', title: 'Product Manager' },
  ];

  const initialApplications = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      position: 'Senior Frontend Developer',
      jobId: '1',
      appliedDate: '2 days ago',
      experience: '5 years',
      status: 'new',
      resume: '/path/to/resume.pdf',
      coverLetter: 'I am excited to apply for this position...',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      starred: false,
    },
    {
      id: 2,
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      position: 'UX Designer',
      jobId: '2',
      appliedDate: '3 days ago',
      experience: '4 years',
      status: 'reviewed',
      resume: '/path/to/resume.pdf',
      coverLetter: 'With my background in user experience design...',
      skills: ['Figma', 'UI Design', 'User Research', 'Prototyping'],
      starred: true,
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      position: 'Product Manager',
      jobId: '3',
      appliedDate: '1 week ago',
      experience: '7 years',
      status: 'interview',
      resume: '/path/to/resume.pdf',
      coverLetter: 'I am writing to express my interest in the Product Manager position...',
      skills: ['Product Strategy', 'Agile', 'Market Research', 'Roadmapping'],
      starred: false,
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      position: 'Senior Frontend Developer',
      jobId: '1',
      appliedDate: '1 week ago',
      experience: '6 years',
      status: 'rejected',
      resume: '/path/to/resume.pdf',
      coverLetter: 'I believe my skills and experience make me a strong candidate...',
      skills: ['React', 'Vue.js', 'JavaScript', 'CSS'],
      starred: false,
    },
    {
      id: 5,
      name: 'David Lee',
      email: 'david.lee@example.com',
      position: 'UX Designer',
      jobId: '2',
      appliedDate: '2 weeks ago',
      experience: '3 years',
      status: 'hired',
      resume: '/path/to/resume.pdf',
      coverLetter: 'I am excited about the opportunity to join your team...',
      skills: ['Adobe XD', 'Sketch', 'User Testing', 'Wireframing'],
      starred: true,
    },
  ];

  const [applications, setApplications] = useState(initialApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState(jobId || 'all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = e => {
    setStatusFilter(e.target.value);
  };

  const handleJobFilter = e => {
    setSelectedJob(e.target.value);
  };

  const toggleStar = id => {
    setApplications(
      applications.map(app => (app.id === id ? { ...app, starred: !app.starred } : app))
    );
  };

  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => (app.id === id ? { ...app, status: newStatus } : app)));
  };

  const viewApplication = application => {
    setSelectedApplication(application);
  };

  const closeApplicationView = () => {
    setSelectedApplication(null);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesJob = selectedJob === 'all' || app.jobId === selectedJob;

    return matchesSearch && matchesStatus && matchesJob;
  });

  return (
    <div className="container mx-auto px-4 py-8 sm:px-24">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">View Applications</h1>
          <p className="text-gray-600">Review and manage candidate applications.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <div className="relative">
              <Search className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Filter className="absolute top-3 left-3 text-gray-400" />
              <select
                value={statusFilter}
                onChange={handleStatusFilter}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>
          </div>
          <div>
            <div className="relative">
              <Filter className="absolute top-3 left-3 text-gray-400" />
              <select
                value={selectedJob}
                onChange={handleJobFilter}
                className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="all">All Jobs</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          {filteredApplications.map(application => (
            <div key={application.id} className="mb-4 rounded-lg bg-white p-4 shadow-md">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{application.name}</h2>
                <button onClick={() => toggleStar(application.id)}>
                  {application.starred ? '★' : '☆'}
                </button>
              </div>
              <p className="text-gray-600">{application.position}</p>
              <p className="text-gray-500">{application.appliedDate}</p>
              <button
                onClick={() => viewApplication(application)}
                className="mt-2 text-purple-600 hover:text-purple-500"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        <div className="col-span-1 lg:col-span-1">
          <h2 className="mb-4 text-lg font-semibold">Starred Applications</h2>
          {filteredApplications
            .filter(app => app.starred)
            .map(application => (
              <div key={application.id} className="mb-4 rounded-lg bg-white p-4 shadow-md">
                <h2 className="text-lg font-semibold">{application.name}</h2>
                <p className="text-gray-600">{application.position}</p>
                <p className="text-gray-500">{application.appliedDate}</p>
              </div>
            ))}
        </div>
      </div>
      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">{selectedApplication.name}</h2>
            <p className="mb-2 text-gray-600">Email: {selectedApplication.email}</p>
            <p className="mb-2 text-gray-600">Position: {selectedApplication.position}</p>
            <p className="mb-2 text-gray-600">Applied Date: {selectedApplication.appliedDate}</p>
            <p className="mb-2 text-gray-600">Experience: {selectedApplication.experience}</p>
            <p className="mb-2 text-gray-600">Status: {selectedApplication.status}</p>
            <button
              onClick={() => updateStatus(selectedApplication.id, 'interview')}
              className="focus:ring-opacity-50 mr-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Schedule Interview
            </button>
            <button
              onClick={() => updateStatus(selectedApplication.id, 'rejected')}
              className="btn-secondary"
            >
              Reject
            </button>
            <button
              onClick={closeApplicationView}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewApplications;
