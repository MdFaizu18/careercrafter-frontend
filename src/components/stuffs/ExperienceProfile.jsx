import { Briefcase, Trash2 } from 'lucide-react';
import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthProvider';
import SupportService from '../../service/SupportService';
import ExperienceService from '../../service/ExperienceService';
import { toast } from 'react-toastify';

const ExperienceProfile = ({ setExperience, experience }) => {
  const { auth } = useContext(AuthContext);
  const expService = new ExperienceService(auth?.accessToken);
  console.log('from exprience', experience);

  const [errors, setErrors] = useState({});

  const handleExperienceChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedExperience = [...experience];

    updatedExperience[index] = {
      ...updatedExperience[index],
      [name]: type === 'checkbox' ? checked : value,
    };

    // If checkbox is checked, clear endDate
    if (type === 'checkbox' && checked) {
      updatedExperience[index].endDate = '';
    }

    setExperience(updatedExperience);
  };

  const removeExperience = id => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const handleSubmit = async () => {
    console.log('Submitting experience data:', experience);
    try {
      const respone = await expService.addExperience(experience);
      toast.success('Experience saved successfully!');
      console.log('Experience saved:', respone);
      setExperience(respone);
    } catch (error) {
      console.error('Error saving experience:', error);
      toast.error('Failed to save experience. Please try again.');
    }
  };

  return (
    <div>
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.index} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {exp.jobTitle || `Experience ${index + 1}`}
                  </h4>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeExperience(exp.experienceId)}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={exp.title}
                  onChange={e => handleExperienceChange(e, index)}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                    errors[`experience_${index}_title`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g. Senior Software Engineer"
                />
                {errors[`experience_${index}_title`] && (
                  <p className="mt-1 text-sm text-red-500">{errors[`experience_${index}_title`]}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={exp.company}
                  onChange={e => handleExperienceChange(e, index)}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                    errors[`experience_${index}_company`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g. Google"
                />
                {errors[`experience_${index}_company`] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors[`experience_${index}_company`]}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={exp.location}
                onChange={e => handleExperienceChange(e, index)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                placeholder="City, State or Remote"
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
                  value={exp.startDate}
                  onChange={e => handleExperienceChange(e, index)}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                    errors[`experience_${index}_startDate`] ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors[`experience_${index}_startDate`] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors[`experience_${index}_startDate`]}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  End Date {!exp.current && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="month"
                  name="endDate"
                  value={exp.endDate}
                  onChange={e => handleExperienceChange(e, index)}
                  disabled={exp.current}
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500 ${
                    exp.current ? 'bg-gray-100' : ''
                  } ${errors[`experience_${index}_endDate`] ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors[`experience_${index}_endDate`] && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors[`experience_${index}_endDate`]}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="current"
                  checked={exp.current}
                  onChange={e => handleExperienceChange(e, index)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">I currently work here</span>
              </label>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={exp.description}
                onChange={e => handleExperienceChange(e, index)}
                rows="4"
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your key responsibilities and achievements..."
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pt-6 text-right">
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
        >
          Save Skills
        </button>
      </div>
    </div>
  );
};

export default ExperienceProfile;
