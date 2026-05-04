import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute.ts";

const app = express();
app.use(express.json());
app.use(cors());

// /api/my/user
app.use("/api/my/user", myUserRoute);

const mongoUri = process.env.MONGODB_CONECTION_STRING;

if (!mongoUri) {
  throw new Error(
    "MONGODB_CONECTION_STRING is missing. Please check your environment variables.",
  );
}

const startServer = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    app.listen(7000, () => {
      console.log("server started on localhost:7000");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

void startServer();
