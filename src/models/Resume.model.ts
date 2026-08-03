import { IResume } from "@/types/resume.types";
import mongoose, { models, model } from "mongoose";

const resumeSchema = new mongoose.Schema<IResume>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String },
    summery: { type: String },
    personalInfo: {
      type: {
        fullname: { type: String },
        email: { type: String },
        mobile: { type: String },
        address: { type: String },
        location: { type: String },
        github: { type: String },
        linkedIn: { type: String },
        portfolio: { type: String },
      },
      default: {},
    },
    workExperience: {
      type: [
        {
          company: { type: String },
          position: { type: String },
          startDate: { type: String },
          endDate: { type: String },
          description: { type: String },
        },
      ],
      default: [],
    },
    projects: {
      type: [
        {
          title: { type: String },
          description: { type: String },
          githubUrl: { type: String },
          liveUrl: { type: String },
          techStack: { type: [String] },
        },
      ],
      default: [],
    },
    skills: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
    education: {
      type: [
        {
          institution: { type: String },
          degree: { type: String },
          startDate: { type: String },
          endDate: { type: String },
          description: { type: String },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const resumeModel =
  mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default resumeModel;
