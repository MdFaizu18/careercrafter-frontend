import { Link } from 'react-router-dom';
import { MapPin, Clock, Briefcase, BookmarkPlus, IndianRupee } from 'lucide-react';

const JobCard = ({ job, showActions = true }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all transition-shadow duration-200 hover:border-purple-300 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-purple-100">
            <Briefcase className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{job.jobTitle}</h3>
            <p className="text-gray-600">{job.company?.name}</p>
          </div>
        </div>
        {showActions && (
          <button className="text-gray-400 hover:text-purple-600" title="Save Job">
            <BookmarkPlus className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4 text-gray-400" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-1 h-4 w-4 text-gray-400" />
          {job.type}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <IndianRupee className="mr-1 h-4 w-4 text-gray-400" />
          {job.salaryMin} to {job.salaryMax}
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-gray-600">{job.description}</p>

      {showActions && (
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-500">Posted {job.postedDate}</span>
          <Link
            to={`/jobseeker/job/${job.jobId}`}
            className="rounded-md bg-indigo-100 px-4 py-2 text-indigo-700 transition-colors hover:bg-purple-200"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobCard;
