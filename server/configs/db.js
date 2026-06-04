// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     mongoose.set("strictQuery", false);

//     mongoose.connection.on("connected", () => {
//       console.log("✅ Database connected successfully");
//     });

//     let mongodbURI = process.env.MONGODB_URI?.trim();
//     const projectName =
//       process.env.MONGODB_DB_NAME?.trim() || "resume-builder";

//     const fallbackURI =
//       process.env.MONGODB_LOCAL_URI?.trim() ||
//       "mongodb://127.0.0.1:27017";

//     if (!mongodbURI) {
//       mongodbURI = fallbackURI;
//       console.warn(
//         "⚠️ MONGODB_URI not set. Falling back to local MongoDB at",
//         fallbackURI
//       );
//     }

//     const connectOptions = {
//       dbName: projectName,
//     };

//     try {
//       await mongoose.connect(mongodbURI, connectOptions);
//     } catch (error) {
//       console.error("ATLAS ERROR:", error);
//       console.warn(
//         "⚠️ Primary MongoDB connection failed:",
//         error.message
//       );

//       if (!mongodbURI.includes("127.0.0.1")) {
//         console.warn("🔁 Retrying with local MongoDB...");

//         await mongoose.connect(fallbackURI, connectOptions);
//       } else {
//         throw error;
//       }
//     }
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongodbURI =
      process.env.MONGODB_URI?.trim() ||
      process.env.MONGODB_LOCAL_URI?.trim() ||
      "mongodb://127.0.0.1:27017";

    const dbName = process.env.MONGODB_DB_NAME?.trim() || "resume-builder";

    mongoose.set("strictQuery", false);

    mongoose.connection.once("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    const connectOptions = {
      dbName,
    };

    try {
      await mongoose.connect(mongodbURI, connectOptions);
    } catch (error) {
      console.warn("⚠️ Primary MongoDB connection failed:", error.message);

      // fallback only if not already local
      if (!mongodbURI.includes("127.0.0.1")) {
        console.warn("🔁 Retrying with local MongoDB...");
        await mongoose.connect(
          process.env.MONGODB_LOCAL_URI || "mongodb://127.0.0.1:27017",
          connectOptions
        );
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;


