import { Award, Calendar, FileText, Tag, TrendingUp } from 'lucide-react';
import React from 'react';

const ResumeTips = () => {
  return (
    <div>
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
  );
};

export default ResumeTips;
