"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";

interface Props {
  open: boolean;
  onClose: () => void;
  onGenerate: (description: string) => void;
}

export default function ExperienceAIModal({
  open,
  onClose,
  onGenerate,
}: Props) {
  const toast = useToast();
  const [jobRole, setJobRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry-level");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [techStack, setTechStack] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    try {
      setLoading(true);

      const res = await fetch("/api/ai/generate-experience-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobRole,
          experienceLevel,
          yearsOfExperience,
          techStack: techStack
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Unable to generate experience.");
        return;
      }

      onGenerate(data.data.experienceDescription);
      toast.success("Experience description generated.");

      onClose();
    } catch {
      toast.error("Unable to generate experience. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Generate Experience">
      <div className="space-y-4">
        <Input
          label="Job Role"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
        />

        <select
          className="input"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option>Entry-level</option>
          <option>Mid-level</option>
          <option>Senior</option>
        </select>

        <Input
          label="Years of Experience"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
        />

        <Input
          label="Tech Stack"
          placeholder="React, Node, MongoDB"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
        />

        <Button loading={loading} onClick={generate}>
          Generate
        </Button>
      </div>
    </Modal>
  );
}
