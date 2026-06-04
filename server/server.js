import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Serve uploaded files (PDFs) from /uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (req, res) => {
  res.send("Server is running...");
});

app.use('/api/users', userRouter);

app.use('/api/resumes',resumeRouter);

app.use('/api/ai',aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
