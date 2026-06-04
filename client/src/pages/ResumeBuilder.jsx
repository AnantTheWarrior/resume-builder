import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Folder,
  Sparkles,
  CheckCircle,
  Share2,
  Eye,
  EyeOff,
  Download,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ColorPicker from "../components/ColorPicker";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import {useSelector} from 'react-redux'
import toast from 'react-hot-toast'

import TemplateSelector from "../components/TemplateSelector";
import ResumePreview from "../components/ResumePreview";
import api from "../configs/api";

const ResumeBuilder = () => {
  // In ResumeBuilder.jsx
  const { resumeId } = useParams();
  const navigate = useNavigate();
  // must match the :param name in App.jsx

  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    userId: "",
    title: "",

    personal_info: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      profession: "",
      image: "",
    },

    public: false,

    professional_summary: "",

    skills: [],

    experience: [],

    education: [],

    project: [],

    template: "minimal-image",

    accent_color: "#3B82F6",

    updatedAt: "",

    createdAt: "",
  });

 const loadExistingResume = async () => {
  try {
    const { data } = await api.get(
      `/api/resumes/get/${resumeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const resume = data?.resume || data;
    if (!resume) {
      return;
    }

    setResumeData({
      ...resume,
      project: resume.project || [],
    });
    document.title = resume.title || "Resume Builder";
  } catch (error) {
    console.error(error.message);
  }
};
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Information", icon: User },
    { id: "summary", name: "Professional Summary", icon: FileText },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: Folder },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "experience", name: "Work Experience", icon: Briefcase },
    { id: "submit", name: "Submit", icon: CheckCircle },
  ];

  const activeSection = sections[activeSectionIndex] ?? sections[0];

  // useEffect(() => {
  //   if (!resumeId) return;

  //   const resume = dummyResumeData.find((resume) => resume._id === resumeId);

  //   if (resume) {
  //     setResumeData({
  //       ...resume,
  //       projects: resume.projects || [],
  //     });

  //     document.title = resume.title || "Resume Builder";
  //   }
  // }, [resumeId]);


useEffect(() => {
  if (!resumeId || !token) return;
  loadExistingResume();
}, [resumeId, token]);


const changeResumeVisibility = async () => {
  try {
    const formData = new FormData();

    formData.append("resumeId", resumeId);
    formData.append(
      "resumeData",
      JSON.stringify({
        public: !resumeData.public,
      })
    );

    const { data } = await api.put(
      `/api/resumes/update/${resumeId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setResumeData({
      ...resumeData,
      public: !resumeData.public,
    });

    toast.success(data.message);
  } catch (error) {
    console.error(
      "Error saving resume:",
      error
    );

    toast.error(
      error?.response?.data?.message ||
      "Failed to update visibility"
    );
  }
};

  const handleShare = () => {
    if (!resumeId) {
      alert("Resume ID is missing.");
      return;
    }

    const resumeUrl = `${window.location.origin}/view/${resumeId}`;

    if (navigator.share) {
      navigator.share({
        url: resumeUrl,
        text: "My Resume",
      });
    } else {
      alert("Share is not supported on this browser.");
    }
  };

  const downloadResume = () => {
    window.print();
  };


 const saveResume = async () => {
  try {
    let updatedResumeData = structuredClone(resumeData);

    // Remove image from JSON data if it's a File object
    if (
      typeof resumeData.personal_info.image === "object"
    ) {
      delete updatedResumeData.personal_info.image;
    }

    const formData = new FormData();

    formData.append("resumeId", resumeId);
    formData.append(
      "resumeData",
      JSON.stringify(updatedResumeData)
    );

    // Remove background flag
    if (removeBackground) {
      formData.append("removeBackground", "yes");
    }

    // Append image if user selected a new image
    if (
      typeof resumeData.personal_info.image === "object"
    ) {
      formData.append(
        "image",
        resumeData.personal_info.image
      );
    }

    const { data } = await api.put(
      `/api/resumes/update/${resumeId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setResumeData(data.resume);

    toast.success(
      data.message || "Resume saved successfully"
    );
  } catch (error) {
    console.error(
      "Error saving resume:",
      error
    );

    toast.error(
      error?.response?.data?.message ||
        "Failed to save resume"
    );
  }
};


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
          to={"/app"}
        >
                  <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />

              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />

              <div className="flex flex-col gap-4 mb-6 border-b border-gray-300 py-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm text-slate-500">
                      Step {activeSectionIndex + 1} of {sections.length}
                    </p>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {activeSection.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeSectionIndex !== 0 && (
                      <button
                        onClick={() =>
                          setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                        }
                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      >
                        <ChevronLeft size={16} />
                        Previous
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) =>
                          Math.min(prev + 1, sections.length - 1)
                        )
                      }
                      disabled={activeSectionIndex === sections.length - 1}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                        activeSectionIndex === sections.length - 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSectionIndex(index)}
                      className={`rounded-full border px-3 py-1 text-sm transition ${
                        index === activeSectionIndex
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">

  {/* Template Selector */}
<TemplateSelector
  selectedTemplate={resumeData.template}
  onChange={(template) => {
    console.log("Selected Template:", template);

    setResumeData((prev) => ({
      ...prev,
      template,
    }));
  }}
/>

{/* Color Picker */}
<ColorPicker
  color={resumeData.accent_color}
  onChange={(color) => {
    console.log("Selected Color:", color);

    setResumeData((prev) => ({
      ...prev,
      accent_color: color,
    }));
  }}
/>

                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, personal_info: data }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, education: data }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, experience: data }))
                    }
                  />
                )}
{/* 
                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )} */}

                {activeSection.id === "submit" && (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                    <h2 className="text-xl font-semibold text-slate-900">
                      Submit Your Resume
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Your resume is ready to save. Click the button below to update your resume data in MongoDB.
                    </p>
                    <button
                      onClick={saveResume}
                      className="mt-6 rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={saveResume}
                  className="bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring-green-400 transition-all rounded-md px-6 py-2 text-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => navigate(`/app/skills/${resumeId}`)}
                  className="bg-slate-100 text-slate-700 rounded-md px-6 py-2 text-sm hover:bg-slate-200 transition"
                >
                  Open Skills Page
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                <button
                  onClick={handleShare}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors"
                >
                  <Share2 size={16} />
                  Share
                </button>

                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg hover:ring transition-colors"
                >
                  {resumeData.public ? <Eye size={16} /> : <EyeOff size={16} />}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;