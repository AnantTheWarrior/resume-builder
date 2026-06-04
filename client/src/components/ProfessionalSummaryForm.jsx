// import { Sparkles } from "lucide-react";

// const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
//   const handleAIEnhance = () => {
//     setResumeData((prev) => ({
//       ...prev,
//       professionalSummary: data || "",
//     }));
//   };

//   return (
//     <div className="space-y-4">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
//             Professional Summary
//           </h3>
//           <p className="text-sm text-gray-500">
//             Add a concise summary to highlight your strengths
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={handleAIEnhance}
//           className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
//         >
//           <Sparkles className="size-4" />
//           AI Enhance
//         </button>
//       </div>

//       {/* Textarea */}
//       <div className="mt-6">
//         <textarea
//           value={data || ""}
//           onChange={(e) => onChange(e.target.value)}
//           rows={7}
//           className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
//           placeholder="Write a compelling professional summary that highlights your key strengths, experience, and career goals..."
//         />

//         <p className="text-xs text-gray-500 max-w-[80%] mx-auto text-center mt-2">
//           Tip: Keep it short (3–4 sentences). Focus on achievements and skills most relevant to your goal.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProfessionalSummaryForm;




import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../configs/api";

const ProfessionalSummaryForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!data || data.trim().length === 0) {
      return toast.error("Please write a summary first");
    }

    try {
      setIsGenerating(true);

      const prompt = `Enhance my professional summary: "${data}"`;

      const response = await api.post(
        "api/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIXED
          },
        }
      );

      onChange(response.data.enhancedContent);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add a concise summary to highlight your strengths
          </p>
        </div>

        <button
          type="button"
          onClick={generateSummary}
          disabled={isGenerating || !data}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}

          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={data || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={7}
        className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
        placeholder="Write a compelling professional summary..."
      />

      {/* Tip */}
      <p className="text-xs text-gray-500 text-center mt-2">
        Tip: Keep it short (3–4 sentences). Focus on achievements and skills.
      </p>
    </div>
  );
};

export default ProfessionalSummaryForm;