import { Star, X } from 'lucide-react';
import React, { useState } from 'react';

const SkillsProfile = ({ formData, setFormData }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = skill => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill),
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Skills & Expertise</h3>
          <p className="text-gray-600">Add skills that showcase your expertise</p>
        </div>

        <div className="rounded-lg border border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
          <div className="mb-4 flex items-center gap-3">
            <Star className="h-6 w-6 text-purple-600" />
            <h4 className="font-medium text-gray-900">Add New Skill</h4>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleAddSkill()}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. JavaScript, Project Management, Adobe Photoshop"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="rounded-lg bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
            >
              Add
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Press Enter or click Add to include the skill
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-medium text-gray-900">Your Skills ({formData.skills.length})</h4>
          {formData.skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-purple-700 transition-colors hover:bg-purple-50"
                >
                  <span className="font-medium">{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-purple-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-purple-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <Star className="mx-auto mb-3 h-12 w-12 text-gray-300" />
              <p className="text-gray-500">
                No skills added yet. Start by adding your key skills above.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SkillsProfile;
