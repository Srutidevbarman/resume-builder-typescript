"use client";

import { useState } from "react";

import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  onGenerate: (description: string) => void;
}

export default function ProjectAIModal({
  open,
  title,
  onClose,
  onGenerate,
}: Props) {
  const [role, setRole] = useState("");

  const [tech, setTech] = useState("");

  const [rawDescription, setRawDescription] = useState("");

  const [loading, setLoading] = useState(false);

  async function generate() {
    try {
      setLoading(true);

      const res = await fetch("/api/ai/generate-project-description", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          projectTitle: title,

          role,

          technologies: tech
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

          rawDescription,
        }),
      });

      const data = await res.json();

      if (!data.success) return;

      onGenerate(data.data.projectDescription.join("\n• "));

      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Generate Project Description">
      <div className="space-y-5">
        <Input
          label="Your Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <Input
          label="Technologies"
          placeholder="React, Next.js, Node"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />

        <textarea
          rows={5}
          className="input"
          placeholder="Briefly describe your project..."
          value={rawDescription}
          onChange={(e) => setRawDescription(e.target.value)}
        />

        <Button loading={loading} onClick={generate}>
          Generate Description
        </Button>
      </div>
    </Modal>
  );
}
