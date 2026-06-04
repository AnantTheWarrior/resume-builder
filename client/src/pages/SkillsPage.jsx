import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SkillsForm from "../components/SkillsForm";
import api from "../configs/api";

const SkillsPage = () => {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [skills, setSkills] = useState([]);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadResume = async () => {
      if (!resumeId || !token) return;
      try {
        const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resume = data?.resume || data;
        setSkills(resume.skills || []);
        setResumeTitle(resume.title || "Untitled Resume");
      } catch (error) {
        console.error("Error loading resume:", error);
        toast.error(error?.response?.data?.message || "Failed to load resume.");
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [resumeId, token]);

  const saveSkills = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ skills })
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

      setSkills(data.resume?.skills || skills);
      toast.success(data.message || "Skills updated successfully");
    } catch (error) {
      console.error("Error saving skills:", error);
      toast.error(error?.response?.data?.message || "Failed to update skills.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm text-gray-600">Loading skills editor…</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">
            Update Skills
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Edit the skill list for "{resumeTitle}" and save changes directly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={saveSkills}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            Save Skills
          </button>

          <button
            type="button"
            onClick={() => navigate(`/app/builder/${resumeId}`)}
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            Open Builder
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <SkillsForm data={skills} onChange={setSkills} />
      </div>
    </div>
  );
};

export default SkillsPage;
