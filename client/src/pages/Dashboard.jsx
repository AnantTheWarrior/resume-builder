import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";

import {
  FilePen,
  LoaderCircleIcon,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";



const Dashboard = () => {

   const {user,token}=useSelector((state)=>state.auth)




  const colors = [
    "#9333ea",
    "#d97706",
    "#dc2626",
    "#0284c7",
    "#16a34a",
  ];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const [isLoading,setIsLoading]=useState(false)


  const navigate = useNavigate();



const loadAllResumes = async () => {
  if (!token) return;

  try {
    const { data } = await api.get(
      "/api/users/resumes",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setAllResumes(data.resumes || []);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.message
    );
  }
};


  const createResume = async (event) => {
  event.preventDefault();

  try {
    const { data } = await api.post(
      "/api/resumes/create",
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllResumes((prev) => [...prev, data.resume]);
    setTitle("");
    setShowCreateResume(false);

    navigate(`/app/builder/${data.resume._id}`);
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.message
    );
  }
};

  const uploadResume = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a resume title.");
      return;
    }

    if (!resume) {
      toast.error("Please select a PDF file.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', resume);

      const { data } = await api.post('/api/resumes/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Let the browser set Content-Type with boundary
        },
      });
      console.log('upload response', data);
      // refresh list from server to make sure data is consistent
      await loadAllResumes();
      toast.success(data.message || 'Resume uploaded');
      setTitle('');
      setResume(null);
      setShowUploadResume(false);
      // navigate to builder if resume id present
      if (data?.resume?._id) navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const editTitle = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a resume title.");
      return;
    }

    try {
      const { data } = await api.put(
        `/api/resumes/update/${editResumeId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllResumes((prev) =>
        prev.map((item) =>
          item._id === editResumeId ? data.resume : item
        )
      );
      toast.success(data.message);
      setEditResumeId("");
      setTitle("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    }
  };
const deleteResume = async (resumeId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this resume?"
  );

  if (!confirmDelete) return;

  try {
    const { data } = await api.delete(
      `/api/resumes/delete/${resumeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllResumes((prev) =>
      prev.filter((item) => item._id !== resumeId)
    );

    toast.success(data.message);
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error.message
    );
  }
};

const togglePrivacy = async (id, isPublic) => {
  try {
    const { data } = await api.put(
      `/api/resumes/update/${id}`,
      { public: isPublic },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAllResumes((prev) =>
      prev.map((resume) =>
        resume._id === id
          ? data.resume
          : resume
      )
    );

    toast.success(
      isPublic
        ? "Resume is now Public 🌍"
        : "Resume is now Private 🔒"
    );
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
      "Failed to update privacy"
    );
  }
};


  const getResumeDateTime = (resume) => {
    const dateValue = resume.createdAt || resume.updatedAt || resume.UpdatedAt;
    const parsedDate = new Date(dateValue);

    if (!dateValue || Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    const fetchResumes = async () => {
      await loadAllResumes();
    };
    fetchResumes();
  }, [token]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
           Welcome, {user?.name}        </p>

        {/* Top Buttons */}
        <div className="flex gap-6 flex-wrap ml-10">
          {/* Create Resume */}
          <button
            onClick={() => {
              setShowCreateResume(true);
            }}
            className="group w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
          >
            <Plus className="size-11 p-2.5 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-full transition-all duration-300" />

            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => {
              setShowUploadResume(true);
            }}
            className="group w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
          >
            <UploadCloud className="size-11 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full transition-all duration-300" />

            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 ml-9">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={resume._id || index}
                onClick={() => {
                  navigate(`/app/builder/${resume._id}`);
                }}
                className="relative group w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: `${baseColor}40`,
                }}
              >
                <FilePen
                  className="size-7 group-hover:scale-105 transition-all duration-300"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm group-hover:scale-105 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                {resume.personal_info?.image && (
                  <a
                    href={resume.personal_info.image}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-slate-500 mt-1 underline"
                  >
                    View PDF
                  </a>
                )}

                <p className="absolute bottom-1 text-[11px] text-slate-500 px-2 text-center">
                  Created on {getResumeDateTime(resume)}
                </p>

                {/* Action Icons */}
              <div
  onClick={(e) => e.stopPropagation()}
  className="absolute top-1 right-1 hidden group-hover:flex items-center gap-1"
>
  <button
    onClick={(e) => {
      e.stopPropagation();
      togglePrivacy(resume._id, !resume.public);
    }}
    className="text-[10px] px-2 py-1 rounded bg-white/70 hover:bg-white"
  >
    {resume.public ? "🌍" : "🔒"}
  </button>

  <Trash2
    onClick={() => deleteResume(resume._id)}
    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors duration-200"
  />

  <Sparkles
    onClick={(e) => {
      e.stopPropagation();
      navigate(`/app/skills/${resume._id}`);
    }}
    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors duration-200"
  />

  <Pencil
    onClick={(e) => {
      e.stopPropagation();
      setEditResumeId(resume._id);
      setTitle(resume.title);
    }}
    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors duration-200"
  />
</div>

</button>   

);
})}
</div>     {/* CLOSE GRID */}

        {/* Create Resume Modal */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                Create a Resume
              </h2>

              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>

              <X
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                Upload Resume
              </h2>

              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />

              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select resume file

                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-green-700">
                        {resume.name}
                      </p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Upload resume</p>
                      </>
                    )}
                  </div>
                </label>

                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => {
                    setResume(e.target.files[0]);
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 text-white rounded transition-colors ${isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  'Upload Resume'
                )}
              </button>

              <X
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResume(null);
                }}
              />
            </div>
          </form>
        )}

        {/* Edit Resume Modal */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                Edit Resume Title
              </h2>

              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update
              </button>

              <X
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

