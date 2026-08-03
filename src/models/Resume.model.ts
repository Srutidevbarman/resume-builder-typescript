import { IResume } from "@/types/resume.types";
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  summery: { type: String, required: true },
  workExperience: {
    type: [
      {
        company: { type: String, required: true },
        position: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    default: [],
  },
  projects: {
    type: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        githubUrl: { type: String, required: true },
        liveUrl: { type: String, required: true },
        techStack: { type: [String], required: true },
      },
    ],
    default: [],
  },
  skills: { type: [String], default: [] },
  certifications: { type: [String], default: [] },
});
