import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeft } from "lucide-react";
import api from "../configs/api";

export default function Preview() {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const loadResume = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/api/resumes/public/${resumeId}`);
        const resume = data?.resume || data;
        setResumeData(resume || null);
      } catch (error) {
        console.error(error.message);
        setResumeData(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (resumeId) {
      loadResume();
    } else {
      setIsLoading(false);
    }
  }, [resumeId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="p-6">
        <p className="mb-4">Resume not found</p>
        <Link
          to="/"
          className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Go to Home Page
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          className="py-4 bg-white"
        />
      </div>
    </div>
  );
}





