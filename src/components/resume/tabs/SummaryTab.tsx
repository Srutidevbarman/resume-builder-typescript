"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";
import type { IResume } from "@/types/resume.types";

interface Props {
  resume: IResume;
  updateResume: (resume: IResume) => void;
}

export default function SummaryTab({ resume, updateResume }: Props) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [jobTitle, setJobTitle] = useState("");

  const [experienceLevel, setExperienceLevel] = useState("Entry-level");

  const [skills, setSkills] = useState("");

  async function generateSummary() {
    try {
      setLoading(true);

      const res = await fetch("/api/ai/generate-summary", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          jobTitle,
          experienceLevel,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Unable to generate summary.");
        return;
      }

      updateResume({
        ...resume,
        summery: data.data.summary,
      });
      toast.success("Summary generated.");
    } catch {
      toast.error("Unable to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <label className="mb-2 block font-medium">Professional Summary</label>

        <textarea
          rows={8}
          value={resume.summery}
          onChange={(e) =>
            updateResume({
              ...resume,
              summery: e.target.value,
            })
          }
          className="input resize-none"
          placeholder="Write a professional summary..."
        />
      </div>

      <div className="glass space-y-5 p-6">
        <h2 className="text-xl font-semibold">✨ Generate with AI</h2>

        <input
          className="input"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          className="input"
        >
          <option>Entry-level</option>
          <option>Mid-level</option>
          <option>Senior</option>
        </select>

        <input
          className="input"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <Button loading={loading} onClick={generateSummary}>
          ✨ Generate Summary
        </Button>
      </div>
    </div>
  );
}
