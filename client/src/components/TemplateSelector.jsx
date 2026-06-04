import { Check, Layout } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview: "Balanced layout with clear headings and sections.",
    },
    {
      id: "modern",
      name: "Modern",
      preview: "Bold headers and a structured, polished design.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Clean, compact layout with a strong emphasis on content.",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal layout with a profile image and modern styling.",
    },
  ];

  useEffect(() => {
    const handleOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      {/* Toggle Button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((s) => !s)}
        className="flex items-center gap-2 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-1 ring-blue-300 hover:ring-2 transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} />
        <span className="font-medium">
          {templates.find((template) => template.id === selectedTemplate)?.name || "Template"}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-64 p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-md">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={selectedTemplate === template.id}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              {/* Checkmark */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <div className="mt-1 p-2 bg-blue-50 rounded text-xs text-gray-600 italic">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;