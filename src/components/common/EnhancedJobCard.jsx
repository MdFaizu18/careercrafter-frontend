import React from 'react';
import { MapPin, Briefcase, CheckCircle, Clock, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedJobCard = ({ job }) => {
  return (
    <div>
      <div
        className={
          'group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl'
        }
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={job.companyLogo || '/placeholder.svg'}
                alt={`${job.company} logo`}
                className="h-14 w-14 rounded-lg object-cover shadow-sm"
              />
              <div className="absolute -right-1 -bottom-1 rounded-full bg-green-500 p-1">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-purple-600">
                {job.jobTitle}
              </h3>
              <p className="mb-2 text-base font-medium text-gray-700">{job.company.name}</p>

              <div className="mb-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="mr-1 h-3.5 w-3.5" />
                  <span className="text-sm">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="mr-1 h-3.5 w-3.5" />
                  <span className="text-sm">{job.jobType}</span>
                </div>
                <div className="flex items-center text-green-600">
                  <DollarSign className="mr-1 h-3.5 w-3.5" />
                  <span className="text-sm font-medium">{job.salaryMin} - </span>
                  <span className="text-sm font-medium">
                    {'  '} {job.salaryMax}
                  </span>
                </div>
              </div>

              <p className="mb-4 line-clamp-2 text-sm text-gray-600">{job.jobDescription}</p>

              <div className="mb-4 flex flex-wrap gap-2">
                {/* {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
                >
                  {tag}
                </span>
              ))} */}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2"></div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center text-gray-500">
              <Clock className="mr-1 h-3.5 w-3.5" />
              <span className="text-xs">{job.postedDate}</span>
            </div>
            <div className="mt-1 flex items-center text-gray-500">
              <Users className="mr-1 h-3.5 w-3.5" />
              <span className="text-xs">690 applicants</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Link
              to={`/jobseeker/job/${job.jobId}`}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              View Details
            </Link>
            <Link
              to={`/jobseeker/job/${job.jobId}`}
              className="rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm text-white transition-all hover:shadow-md"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedJobCard;
