// import express from "express";
// import protect from "../middlewares/authMiddleWare.js";
// import multer from "multer";
// import imageKit from "../configs/imagekit.js";

// import {
//   createResume,
//   updateResume,
//   deleteResume,
//   getResumeById,
//   getPublicResumeId,
//   uploadResumeFile,
// } from '../controllers/resumeController.js';

// const upload = multer({ storage: multer.memoryStorage() });




// const resumeRouter=express.Router();

// resumeRouter.post('/create', protect, createResume);
// resumeRouter.post('/upload', upload.single('file'), protect, uploadResumeFile);
// resumeRouter.put('/update/:resumeId', upload.single('image'), protect, updateResume);
// resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
// resumeRouter.get('/get/:resumeId', protect, getResumeById);
// resumeRouter.get('/public/:resumeId', getPublicResumeId);

// export default resumeRouter;




import express from "express";
import protect from "../middlewares/authMiddleWare.js";
import multer from "multer";
import imageKit from "../configs/imagekit.js";

import {
  createResume,
  updateResume,
  deleteResume,
  getResumeById,
  getPublicResumeId,
  uploadResumeFile,
  uploadProfileImage,
} from "../controllers/resumeController.js";

const upload = multer({
  storage: multer.memoryStorage(),
});

const resumeRouter = express.Router();

/* Create Resume */
resumeRouter.post(
  "/create",
  protect,
  createResume
);

/* Upload Profile Image to ImageKit */
resumeRouter.post(
  "/upload-image",
  protect,
  upload.single("image"),
  uploadProfileImage
);

/* Upload Existing Resume PDF/DOC */
resumeRouter.post(
  "/upload",
  protect,
  upload.single("file"),
  uploadResumeFile
);

/* Update Resume */
resumeRouter.put(
  "/update/:resumeId",
  protect,
  upload.single("image"),
  updateResume
);

/* Delete Resume */
resumeRouter.delete(
  "/delete/:resumeId",
  protect,
  deleteResume
);

/* Get Resume By Id */
resumeRouter.get(
  "/get/:resumeId",
  protect,
  getResumeById
);

/* Public Resume */
resumeRouter.get(
  "/public/:resumeId",
  getPublicResumeId
);

export default resumeRouter;

