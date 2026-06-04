import Resume from "../models/Resume.js";
import User from "../models/User.js";
import imageKit from "../configs/imagekit.js";

import fs from "fs";
import path from "path";
import ai from "../configs/ai.js";


// export const uploadProfileImage = async (req, res) => {
//   try {
//     console.log("FILE:", req.file);

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image uploaded",
//       });
//     }

//     const uploadedImage = await imageKit.upload({
//       file: req.file.buffer,
//       fileName: `${Date.now()}-${req.file.originalname}`,
//       folder: "/resume-builder/profile-images",
//     });

//     console.log("IMAGEKIT RESPONSE:", uploadedImage);

//     return res.status(200).json({
//       success: true,
//       imageUrl: uploadedImage.url,
//     });
//   } catch (error) {
//     console.error("UPLOAD ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// 


export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    // 1. Upload original image
    const uploadedImage = await imagekit.upload({
      file: req.file.buffer.toString("base64"),
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "/resume-builder/profile-images",
    });

    // 2. Generate background removed URL
    const bgRemovedUrl = imagekit.url({
      path: uploadedImage.filePath,
      transformation: [
        {
          effect: "e-bgremove",  // 👈 AI background removal
        },
      ],
    });

    return res.status(200).json({
      success: true,
      originalUrl: uploadedImage.url,
      bgRemovedUrl,
      fileId: uploadedImage.fileId,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const createResume = async (req, res) => {
  try {
    const { title, template, accent_color } = req.body;
    const userId = req.userId;

    const newResume = new Resume({
      userId,
      title: title || "Untitled Resume",
      template: template || "classic",
      accent_color: accent_color || "#3B82F6",
    });

    await newResume.save();
    res.status(201).json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    console.error("Create resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.userId;

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    let updateData = {};
    if (req.body.resumeData) {
      try {
        updateData = JSON.parse(req.body.resumeData);
      } catch (parseError) {
        updateData = {};
      }
    } else {
      updateData = req.body;
    }

    if (typeof updateData === "object" && updateData !== null) {
      delete updateData.resumeData;
    }

  if (req.file) {
  const uploadedImage = await imageKit.upload({
    file: req.file.buffer,
    fileName: `${Date.now()}-${req.file.originalname}`,
    folder: "/resume-builder/profile-images",
  });

  updateData.personal_info = {
    ...(updateData.personal_info || {}),
    image: uploadedImage.url,
  };
}

    if (updateData.personal_info && typeof updateData.personal_info === "object") {
      resume.personal_info = {
        ...(resume.personal_info?.toObject?.() || resume.personal_info || {}),
        ...updateData.personal_info,
      };
      delete updateData.personal_info;
    }

    Object.keys(updateData).forEach((key) => {
      resume[key] = updateData[key];
    });

    await resume.save();

    res.status(200).json({ message: "Resume updated successfully", resume });
  } catch (error) {
    console.error("Update resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.userId;

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    await Resume.findByIdAndDelete(resumeId);
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Delete resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.userId;

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("Get resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPublicResumeId = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, public: true });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found or is not public" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("Get public resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const parseResumeText = (text) => {
  const out = {
    personal_info: {},
    skills: [],
    experience: [],
    project: [],
    education: [],
    professional_summary: "",
  };

  if (!text) return out;

  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (emailMatch) out.personal_info.email = emailMatch[0];

  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)?\d{6,10}/);
  if (phoneMatch) out.personal_info.phone = phoneMatch[0];

  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (lines.length) {
    const first = lines[0];
    if (first.split(" ").length <= 4 && /[A-Za-z]/.test(first)) {
      out.personal_info.full_name = first;
    }
  }

  const skillsSection = text.match(/(?:SKILLS|SKILLS AND INTERESTS|TECHNICAL SKILLS)[\s\S]*?(?=EDUCATION|PROJECTS|EXPERIENCE|$)/i);
  if (skillsSection) {
    const raw = skillsSection[0].replace(/SKILLS.*?:?/i, "").trim();
    const items = raw.split(/[\n,·•\-\/]/).map((item) => item.trim()).filter(Boolean);
    out.skills = items.slice(0, 40);
  }

  const eduSection = text.match(/EDUCATION[\s\S]*?(?=SKILLS|PROJECTS|EXPERIENCE|$)/i);
  if (eduSection) {
    const raw = eduSection[0].replace(/EDUCATION/i, "").trim();
    const entries = raw.split(/\n\s*\n/).map((entry) => entry.trim()).filter(Boolean);
    out.education = entries.slice(0, 10).map((entry) => ({ institution: entry }));
  }

  const expSection = text.match(/EXPERIENCE[\s\S]*?(?=EDUCATION|SKILLS|PROJECTS|$)/i) || text.match(/PROJECTS[\s\S]*?(?=EDUCATION|SKILLS|EXPERIENCE|$)/i);
  if (expSection) {
    const raw = expSection[0].replace(/EXPERIENCE|PROJECTS/i, "").trim();
    const entries = raw.split(/\n\s*\n/).map((entry) => entry.trim()).filter(Boolean);
    out.experience = entries.slice(0, 10).map((entry) => ({ company: entry }));
  }

  const para = text.split(/\n\s*\n/)[0];
  if (para) out.professional_summary = para.slice(0, 1000);

  return out;
};

export const uploadResumeFile = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadsDir = path.join(process.cwd(), "uploads");
    await fs.promises.mkdir(uploadsDir, { recursive: true });

    const originalName = req.file.originalname || `resume-${Date.now()}.pdf`;
    const filename = `${Date.now()}-${originalName}`.replace(/\s+/g, "-");
    const filePath = path.join(uploadsDir, filename);

    await fs.promises.writeFile(filePath, req.file.buffer);

    let resumeText = "";
    try {
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
      const fileBytes = await fs.promises.readFile(filePath);
      const uint8Array = new Uint8Array(fileBytes);
      const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
      const pdfDoc = await loadingTask.promise;
      const pageTexts = [];

      for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
        const page = await pdfDoc.getPage(pageNumber);
        const content = await page.getTextContent();
        const pageText = content.items.map((item) => item.str || "").join(" ");
        pageTexts.push(pageText);
      }

      resumeText = pageTexts.join("\n\n");
    } catch (pdfErr) {
      console.warn("PDF extraction failed:", pdfErr.message || pdfErr);
    }

    let resumeData = {
      userId,
      title: title || "Uploaded Resume",
      template: "classic",
      accent_color: "#3B82F6",
      personal_info: { image: `/uploads/${filename}` },
      professional_summary: "",
      skills: [],
      experience: [],
      project: [],
      education: [],
    };

    const mergeParsedData = (parsed) => {
      if (!parsed || typeof parsed !== "object") return;
      resumeData = {
        ...resumeData,
        professional_summary: parsed.professional_summary || resumeData.professional_summary,
        skills: Array.isArray(parsed.skills) ? parsed.skills : resumeData.skills,
        personal_info: {
          ...resumeData.personal_info,
          ...(parsed.personal_info || {}),
        },
        experience: Array.isArray(parsed.experience) ? parsed.experience : resumeData.experience,
        project: Array.isArray(parsed.project) ? parsed.project : resumeData.project,
        education: Array.isArray(parsed.education) ? parsed.education : resumeData.education,
      };
      if (!resumeData.personal_info.image) {
        resumeData.personal_info.image = `/uploads/${filename}`;
      }
    };

    if (resumeText && ai && ai.models && typeof ai.models.generateContent === "function") {
      try {
        const systemPrompt = "You are an expert resume parser. Return ONLY valid JSON.";
        const userPrompt = `\nExtract data from the following resume.\n\nReturn ONLY valid JSON.\n\n{\n  "professional_summary": "",\n  "skills": [],\n  "personal_info": {\n    "full_name": "",\n    "profession": "",\n    "email": "",\n    "phone": "",\n    "location": "",\n    "linkedin": "",\n    "website": ""\n  },\n  "experience": [],\n  "project": [],\n  "education": []\n}\n\nResume:\n\n${resumeText}`;

        const response = await ai.models.generateContent({
          model: process.env.GEMINI_MODEL,
          contents: `${systemPrompt}\n\n${userPrompt}`,
        });

        let extracted = "";
        if (typeof response.text === "string") {
          extracted = response.text;
        } else if (response?.response?.text) {
          extracted = response.response.text();
        }

        extracted = extracted.replace(/```json/g, "").replace(/```/g, "").trim();
        const jsonMatch = extracted.match(/\{[\s\S]*\}/);
        if (jsonMatch) extracted = jsonMatch[0];

        let parsedData = null;
        try {
          parsedData = JSON.parse(extracted);
        } catch (parseErr) {
          console.warn("AI JSON parse failed:", parseErr.message || parseErr);
        }

        mergeParsedData(parsedData);
      } catch (aiErr) {
        console.warn("AI parsing failed:", aiErr.message || aiErr);
      }
    }

    if (resumeText) {
      const localParsed = parseResumeText(resumeText);
      mergeParsedData(localParsed);
    }

    const newResume = new Resume(resumeData);
    await newResume.save();

    return res.status(201).json({ message: "Resume uploaded", resume: newResume });
  } catch (error) {
    console.error("Upload resume error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
