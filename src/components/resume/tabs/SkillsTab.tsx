"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import TagInput from "@/components/ui/TagInput";
import { useToast } from "@/components/ui/ToastProvider";
import type { IResume } from "@/types/resume.types";

interface Props {
  resume: IResume;
  updateResume: (resume: IResume) => void;
}

export default function SkillsTab({ resume, updateResume }: Props) {
  const toast = useToast();
  const [jobTitle, setJobTitle] = useState("");

  const [experienceLevel, setExperienceLevel] = useState("Entry-level");

  const [loading, setLoading] = useState(false);

  function updateSkills(skills: string[]) {
    updateResume({
      ...resume,
      skills,
    });
  }

  async function generateSkills() {
    try {
      setLoading(true);

      const res = await fetch("/api/ai/generate-skills", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          jobTitle,
          experienceLevel,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Unable to generate skills.");
        return;
      }

      const generatedSkills: string[] = data.data.skills || [];

      /*
       * Combine existing and generated skills.
       *
       * We use lowercase comparison so:
       *
       * React
       * react
       * REACT
       *
       * are treated as the same skill.
       */
      const existingSkills = resume.skills || [];

      const combined = [...existingSkills, ...generatedSkills];

      const uniqueSkills = combined.filter(
        (skill, index, array) =>
          array.findIndex(
            (item) => item.toLowerCase() === skill.toLowerCase(),
          ) === index,
      );

      updateResume({
        ...resume,
        skills: uniqueSkills,
      });
      toast.success("Skills generated.");
    } catch (error) {
      console.error("Failed to generate skills:", error);
      toast.error("Unable to generate skills. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Manual Skills */}
      <div className="glass space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold">Skills</h2>

          <p className="mt-1 text-sm text-gray-400">
            Add the technical and professional skills you want to showcase.
          </p>
        </div>

        <TagInput
          label="Your Skills"
          placeholder="Type a skill and press Enter..."
          value={resume.skills || []}
          onChange={updateSkills}
        />

        <p className="text-sm text-gray-500">
          Press Enter or type a comma to add a skill. Press Backspace on an
          empty input to remove the last skill.
        </p>
      </div>

      {/* AI Skills Generator */}
      <div className="glass space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold">✨ Generate Skills with AI</h2>

          <p className="mt-1 text-sm text-gray-400">
            Let AI suggest relevant skills for your target role.
          </p>
        </div>

        <input
          className="input"
          placeholder="Job Title — e.g. Full Stack Developer"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <select
          className="input"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option value="Entry-level">Entry-level</option>

          <option value="Mid-level">Mid-level</option>

          <option value="Senior">Senior</option>
        </select>

        <Button
          loading={loading}
          disabled={!jobTitle.trim()}
          onClick={generateSkills}
        >
          ✨ Generate Skills
        </Button>
      </div>
    </div>
  );
}
