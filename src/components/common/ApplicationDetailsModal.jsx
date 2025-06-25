import { Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ApplicationDetailsModal = ({
  selectedApplication,
  closeApplicationDetails,
  getStatusColor,
  getStatusIcon,
  formatDate,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
      <div className="p-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900">
              {selectedApplication.position}
            </h2>
            <p className="text-xl text-gray-600">
              {selectedApplication.company} • {selectedApplication.location}
            </p>
            <p className="mt-1 text-lg font-semibold text-green-600">
              {selectedApplication.salary}
            </p>
          </div>
          <button
            onClick={closeApplicationDetails}
            className="rounded-lg p-2 text-gray-400 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                Applied Date
              </h3>
              <p className="mt-1 text-lg text-gray-900">{selectedApplication.appliedDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">Status</h3>
              <span
                className={`mt-1 inline-flex items-center space-x-2 rounded-full border px-3 py-1 text-sm font-medium ${getStatusColor(selectedApplication.status)}`}
              >
                {getStatusIcon(selectedApplication.status)}
                <span>{selectedApplication.status}</span>
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div></div>
          </div>
        </div>

        <div className="mb-8"></div>

        {selectedApplication.interviews?.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-6 text-xl font-bold text-gray-900">Interview Timeline</h3>
            <div className="space-y-6">
              {selectedApplication.interviews.map((interview, index) => (
                <div key={index} className="relative">
                  {index !== selectedApplication.interviews.length - 1 && (
                    <div className="absolute top-12 left-6 h-16 w-0.5 bg-gray-200"></div>
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1 rounded-xl bg-gray-50 p-6">
                      <div className="mb-3 flex items-start justify-between">
                        <h4 className="text-lg font-bold text-gray-900">{interview.mode}</h4>
                        <span className="rounded-full bg-white px-3 py-1 text-sm text-gray-500">
                          {formatDate(interview.interviewDateTime)}
                        </span>
                      </div>
                      <p className="mb-3 text-gray-600">
                        <span className="font-medium">With:</span> {interview.interviewerNames}
                      </p>
                      {interview.notes && (
                        <div>
                          <h5 className="mb-2 text-sm font-medium tracking-wide text-gray-500 uppercase">
                            Notes
                          </h5>
                          <p className="text-gray-700">{interview.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            onClick={closeApplicationDetails}
            className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors duration-200 hover:bg-gray-50"
          >
            Close
          </button>
          <Link
            to={`/jobseeker/job/${selectedApplication.jobId}`}
            className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:shadow-lg"
          >
            <Eye className="h-5 w-5" />
            <span>View Job Posting</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
