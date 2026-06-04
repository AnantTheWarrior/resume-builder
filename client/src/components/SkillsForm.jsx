import { Plus, X } from "lucide-react";
import { useState } from "react";

const skillSuggestions = [
  "JavaScript",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "Redux",
  "TypeScript",
  "MongoDB",
  "Express",
  "Git",
];

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = (skillText) => {
    const skill = (skillText || newSkill).trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      {/* Heading */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">
          Add your technical and soft skills
        </p>
      </div>

      {/* Add input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill (e.g. JavaScript, Project Management)"
          className="flex-1 px-3 py-2 text-sm border rounded-lg"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          onClick={() => addSkill()}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {/* Suggested skills */}
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Suggested skills</p>
        <div className="flex flex-wrap gap-2">
          {skillSuggestions.map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill)}
              className="px-3 py-1 text-sm border rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              type="button"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Existing skills */}
      {data.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="hover:bg-blue-200 rounded-full p-1"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;