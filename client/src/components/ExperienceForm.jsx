

import { Briefcase, Plus, Trash2, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import api from "../configs/api";

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);

  const [loadingIndex, setLoadingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  // ⭐ AI ENHANCE
  const enhanceExperience = async (index) => {
    const exp = data[index];

    if (!exp.description) {
      return toast.error("Add description first");
    }

   
      setLoadingIndex(index);

      const prompt = `
Improve this work experience for a professional ATS resume:

Company: ${exp.company}
Position: ${exp.position}
Description: ${exp.description}

Make it strong, achievement-based, and impactful.
      `;
 try {
      const response = await api.post(
        "/api/ai/enhance-job-desc", // ✅ FIXED
        { userContent: prompt },
        {
          headers: {
             Authorization: `Bearer ${token}`, // ✅ consistent
          },
        }
      );

      const updated = [...data];
      updated[index] = {
        ...updated[index],
        description: response.data.enhancedContent,
      };

      onChange(updated);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Enhancement failed"
      );
    } finally {
      setLoadingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Work Experience
          </h3>

          <p className="text-sm text-gray-500">
            Add your professional work experience
          </p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* Empty state */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experiences added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">

          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >

              {/* Header row */}
              <div className="flex justify-between items-start">
                <h4 className="font-semibold">
                  Experience #{index + 1}
                </h4>

                <div className="flex gap-3 items-center">

                  {/* AI Button */}
                  <button
                    onClick={() => enhanceExperience(index)}
                    disabled={loadingIndex === index || !experience.position || !experience.company}
                    className="flex items-center gap-1 text-purple-600 text-sm hover:text-purple-800"
                  >
                    {loadingIndex === index ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Sparkles className="size-4" />
                    )}
                    AI Enhance
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              </div>

              {/* Company */}
              <input
                type="text"
                placeholder="Company Name"
                value={experience.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                className="w-full input-field"
              />

              {/* Position */}
              <input
                type="text"
                placeholder="Position"
                value={experience.position}
                onChange={(e) =>
                  updateExperience(index, "position", e.target.value)
                }
                className="w-full input-field"
              />

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="w-full input-field"
                />

                {!experience.is_current && (
                  <input
                    type="date"
                    value={experience.end_date}
                    onChange={(e) =>
                      updateExperience(index, "end_date", e.target.value)
                    }
                    className="w-full input-field"
                  />
                )}
              </div>

              {/* Current */}
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                />
                Currently Working Here
              </label>

              {/* Description */}
              <textarea
                placeholder="Description"
                value={experience.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                className="w-full input-field h-24"
              />

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;