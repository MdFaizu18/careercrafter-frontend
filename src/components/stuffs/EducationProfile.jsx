import { GraduationCap, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

const EducationProfile = ({ formData, setFormData }) => {
  const removeEducation = id => {
    setFormData({
      ...formData,
      education: formData.education.filter(edu => edu.id !== id),
    });
  };

  const handleEducationChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const newEducation = [...formData.education];

    if (type === 'checkbox') {
      newEducation[index] = {
        ...newEducation[index],
        [name]: checked,
        endDate: checked ? '' : newEducation[index].endDate,
      };
    } else {
      newEducation[index] = {
        ...newEducation[index],
        [name]: value,
      };
    }

    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const [errors, setErrors] = useState({});
  return (
    <div>
      <div className="space-y-6">
        {formData.education.map((edu, index) => (
          <div key={edu.id} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                  <GraduationCap className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {edu.degree || `Education ${index + 1}`}
                  </h4>
                  <p className="text-sm text-gray-600">{edu.school}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Degree <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={e => handleEducationChange(e, index)}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                    errors[`education_${index}_degree`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g. Bachelor of Science in Computer Science"
                />
                {errors[`education_${index}_degree`] && (
                  <p className="mt-1 text-sm text-red-500">{errors[`education_${index}_degree`]}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  School <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="school"
                  value={edu.school}
                  onChange={e => handleEducationChange(e, index)}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                    errors[`education_${index}_school`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g. Stanford University"
                />
                {errors[`education_${index}_school`] && (
                  <p className="mt-1 text-sm text-red-500">{errors[`education_${index}_school`]}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={edu.location}
                onChange={e => handleEducationChange(e, index)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                placeholder="City, State"
              />
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="month"
                  name="startDate"
                  value={edu.startDate}
                  onChange={e => handleEducationChange(e, index)}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                    errors[`education_${index}_startDate`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[`education_${index}_startDate`] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors[`education_${index}_startDate`]}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  End Date {!edu.current && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="month"
                  name="endDate"
                  value={edu.endDate}
                  onChange={e => handleEducationChange(e, index)}
                  disabled={edu.current}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                    edu.current ? 'bg-gray-100' : ''
                  } ${errors[`education_${index}_endDate`] ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors[`education_${index}_endDate`] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors[`education_${index}_endDate`]}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="current"
                  checked={edu.current}
                  onChange={e => handleEducationChange(e, index)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">I'm currently studying here</span>
              </label>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={edu.description}
                onChange={e => handleEducationChange(e, index)}
                rows="3"
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your studies, achievements, etc..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationProfile;
