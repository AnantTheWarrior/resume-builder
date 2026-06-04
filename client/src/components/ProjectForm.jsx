import { Plus, Trash2 } from "lucide-react";

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      title: "",
      description: "",
      link: "",
      technologies: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500">Showcase your completed work and side projects.</p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-800">Project #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="size-5" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Project Title"
                value={project.title || ""}
                onChange={(e) => updateProject(index, "title", e.target.value)}
                className="w-full input-field"
              />

              <textarea
                placeholder="Project Description"
                value={project.description || ""}
                onChange={(e) => updateProject(index, "description", e.target.value)}
                className="w-full input-field h-24"
              />

              <input
                type="url"
                placeholder="Project Link (optional)"
                value={project.link || ""}
                onChange={(e) => updateProject(index, "link", e.target.value)}
                className="w-full input-field"
              />

              <input
                type="text"
                placeholder="Technologies / Tools"
                value={project.technologies || ""}
                onChange={(e) => updateProject(index, "technologies", e.target.value)}
                className="w-full input-field"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
