import { Calendar, DollarSign, Eye, MapPin, Users } from 'lucide-react';

export const ApplicationCard = ({
  application,
  getStatusColor,
  getStatusIcon,
  viewApplicationDetails,
}) => (
  <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-purple-200 hover:shadow-lg">
    {/* Header */}
    <div className="mb-4 flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50">
          {application.companyLogo ? (
            <img
              src={application.companyLogo || '/placeholder.svg'}
              alt={application.company}
              className="h-8 w-8 rounded-lg object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-purple-600">
              {application?.companyName?.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 truncate text-lg font-semibold text-gray-900">
            {application?.jobTitle}
          </h3>
          <p className="mb-1 font-medium text-gray-600">{application.company}</p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {application.location}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              {application.salary}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(application.status)}`}
        >
          {getStatusIcon(application.status)}
          {application.status}
        </span>
      </div>
    </div>

    {/* Horizontal */}
    <div className="mb-4">
      <div className="mb-2 flex items-center justify-between"></div>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {application.appliedAt}
        </span>
        {application.interviews?.length > 0 && (
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {application.interviews.length} interview(s)
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => viewApplicationDetails(application)}
          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-50"
        >
          <Eye className="h-4 w-4" />
          Details
        </button>
      </div>
    </div>
  </div>
);
