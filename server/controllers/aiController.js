
// // Controller for enhancing a resume's professional summary
// // POST: /api/ai/enhance-pro-sum

// // Controller for enhancing a resume's professional summary
// // POST: /api/ai/enhance-pro-sum

// import  Resume from "../models/Resume.js"

// export const enhanceProfessionalSummary = async (req, res) => {
//     try {

//         const { userContent } = req.body;

//         if (!userContent) {
//             return res.status(400).json({
//                 message: "Missing required fields"
//             });
//         }

//         const response = await ai.chat.completions.create({
//             model: process.env.OPENAI_MODEL,
//             messages: [
//                 {
//                     role: "system",
//                     content:
//                         "You are an expert resume writer. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences, highlighting key skills, experience, and career objectives. Make it compelling, ATS-friendly, and return only the improved summary text."
//                 },
//                 {
//                     role: "user",
//                     content: userContent
//                 }
//             ]
//         });

//         const enhancedContent =
//             response.choices[0].message.content;

//         return res.status(200).json({
//             enhancedContent
//         });

//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         });
//     }
// };

// //controller for enhancing a resume's job description
// // POST: /api/ai/enhance-job-desc


// export const enhanceJobDescription = async (req, res) => {
//     try {

//         const { userContent } = req.body;

//         if (!userContent) {
//             return res.status(400).json({
//                 message: "Missing required fields"
//             });
//         }

//         const response = await ai.chat.completions.create({
//             model: process.env.OPENAI_MODEL,
//             messages: [
//                 {
//                     role: "system",
//                     content:
//                         "You are an expert resume writer. Your task is to enhance the job description of a resume. The description should be 1-2 sentences, highlighting key skills, experience, and career objectives. Make it compelling, ATS-friendly, and return only the improved description text."
//                 },
//                 {
//                     role: "user",
//                     content: userContent
//                 }
//             ]
//         });

//         const enhancedContent =
//             response.choices[0].message.content;

//         return res.status(200).json({
//             enhancedContent
//         });

//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         });
//     }
// };

// //controller for uploading a resume to the database
// // POST: /api/ai/upload-resume



// export const uploadResume = async (req, res) => {
//     try {

//        const {resumeText,title}=req.body;

//        const userId=req.userId;

//        if(!resumeText){
//            return res.status(400).json({message:"Missing required fields"})
//        }

//      const systemPrompt="You are an expert AI Agents to extract data from resume."

//      const userPrompt=`extract data from this resume`



//         const response = await ai.chat.completions.create({
//             model: process.env.OPENAI_MODEL,
//             messages: [
//                 {
//                     role: "system",
//                     content: userPrompt,
//                 },
//                 {
//                     role: "user",
//                     content: userPrompt,
//                 },
//             ],

//             response_format:{ type:'json-object'}

//         });

//         const extractedData =
//             response.choices[0].message.content;
//         const parseData = json.parse(extractedData) 
        
//         const newResume = await Resume.create({
//             userId,title, ...parseData
//         })





//         return res.json({
//             resumeId:newResume._id
//         })

//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         });
//     }
// };


// import ai from "../configs/ai.js";
// import Resume from "../models/Resume.js";

// // Controller for enhancing a resume's professional summary
// // POST: /api/ai/enhance-pro-sum

// export const enhanceProfessionalSummary = async (req, res) => {
//     try {
//         const { userContent } = req.body;

//         if (!userContent) {
//             return res.status(400).json({
//                 message: "Missing required fields"
//             });
//         }

//         const prompt = `
// You are an expert resume writer.

// Your task is to enhance the professional summary of a resume.

// The summary should be 1-2 sentences, highlighting key skills, experience, and career objectives.

// Make it compelling, ATS-friendly, and return only the improved summary text.

// ${userContent}
// `;

//         const response = await ai.models.generateContent({
//             model: process.env.GEMINI_MODEL,
//             contents: prompt,
//         });

//         return res.status(200).json({
//             enhancedContent: response.text,
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message,
//         });
//     }
// };

// // Controller for enhancing a resume's job description
// // POST: /api/ai/enhance-job-desc

// export const enhanceJobDescription = async (req, res) => {
//     try {
//         const { userContent } = req.body;

//         if (!userContent) {
//             return res.status(400).json({
//                 message: "Missing required fields",
//             });
//         }

//         const prompt = `
// You are an expert resume writer.

// Your task is to enhance the job description of a resume.

// Make it:
// - Professional
// - ATS-friendly
// - Achievement-oriented
// - Clear and impactful

// Return only the improved description text.

// ${userContent}
// `;

//         const response = await ai.models.generateContent({
//             model: process.env.GEMINI_MODEL,
//             contents: prompt,
//         });

//         return res.status(200).json({
//             enhancedContent: response.text,
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: error.message,
//         });
//     }
// };

// // Controller for uploading a resume to the database
// // POST: /api/ai/upload-resume

// export const uploadResume = async (req, res) => {
//     try {
//         const { resumeText, title } = req.body;
//         const userId = req.userId;

//         if (!resumeText) {
//             return res.status(400).json({
//                 message: "Missing required fields",
//             });
//         }

//         const systemPrompt =
//             "You are an expert AI resume parser. Extract resume information accurately and return only valid JSON.";

//         const userPrompt = `
// Extract data from the following resume.

// Return ONLY valid JSON in the exact structure below.

// {
//   "professional_summary": "",
//   "skills": [],

//   "personal_info": {
//     "image": "",
//     "full_name": "",
//     "profession": "",
//     "email": "",
//     "phone": "",
//     "location": "",
//     "linkedin": "",
//     "website": ""
//   },

//   "experience": [
//     {
//       "company": "",
//       "position": "",
//       "start_date": "",
//       "end_date": "",
//       "description": "",
//       "is_current": ""
//     }
//   ],

//   "project": [
//     {
//       "name": "",
//       "type": "",
//       "description": ""
//     }
//   ],

//   "education": [
//     {
//       "institution": "",
//       "degree": "",
//       "field": "",
//       "graduation_date": "",
//       "gpa": ""
//     }
//   ]
// }

// Resume:

// ${resumeText}
// `;

//         const response = await ai.models.generateContent({
//             model: process.env.GEMINI_MODEL,
//             contents: `${systemPrompt}\n\n${userPrompt}`,
//         });

//         let extractedData = response.text;

//         // Remove markdown code fences if Gemini returns them
//         extractedData = extractedData
//             .replace(/```json/g, "")
//             .replace(/```/g, "")
//             .trim();

//         let parseData;

//         try {
//             parseData = JSON.parse(extractedData);
//         } catch (parseError) {
//             console.error("JSON Parse Error:", parseError);

//             return res.status(500).json({
//                 message: "Failed to parse AI response",
//             });
//         }

//         const newResume = await Resume.create({
//             userId,
//             title,
//             ...parseData,
//         });

//         return res.status(200).json({
//             resumeId: newResume._id,
//         });

//     } catch (error) {
//         console.error(error);

//         return res.status(500).json({
//             message: error.message,
//         });
//     }
// };




import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

/* =========================
   1. Enhance Professional Summary
========================= */

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert resume writer.

Rewrite the following professional summary.
Make it:
- 1–2 lines
- ATS-friendly
- impactful

Return ONLY the improved summary.

${userContent}
`;

    const model = ai.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json({
      enhancedContent: text,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================
   2. Enhance Job Description
========================= */

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert resume writer.

Improve this job description:
- ATS-friendly
- achievement focused
- professional

Return ONLY improved text.

${userContent}
`;

    const model = ai.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json({
      enhancedContent: text,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* =========================
   3. Upload Resume (AI Parser)
========================= */

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert AI resume parser.

Return ONLY valid JSON in this format:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [],
  "project": [],
  "education": []
}

Resume:
${resumeText}
`;

    const model = ai.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    let extractedData = result.response.text();

    // clean markdown
    extractedData = extractedData
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parseData;

    try {
      parseData = JSON.parse(extractedData);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      return res.status(500).json({
        message: "Invalid AI JSON response",
      });
    }

    const newResume = await Resume.create({
      userId,
      title,
      ...parseData,
    });

    return res.status(200).json({
      resumeId: newResume._id,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};