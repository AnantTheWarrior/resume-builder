// import express from "express";
// import protect from "../middlewares/authMiddleWare.js";
// import {
//   enhanceJobDescription,
//   enhanceProfessionalSummary,
//   uploadResume,
// } from "../controllers/aiController.js";

// const aiRouter = express.Router();

// aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);

// aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);

// aiRouter.post('/upload-resume', protect, uploadResume);

// export default aiRouter;




import express from "express";
import protect from "../middlewares/authMiddleWare.js";

import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/aiController.js";

const aiRouter = express.Router();

/* =========================
   AI Routes (Protected)
========================= */

// Enhance professional summary
aiRouter.post(
  "/enhance-pro-sum",
  protect,
  enhanceProfessionalSummary
);

// Enhance job description
aiRouter.post(
  "/enhance-job-desc",
  protect,
  enhanceJobDescription
);

// Upload + AI parse resume
aiRouter.post(
  "/upload-resume",
  protect,
  uploadResume
);

export default aiRouter;