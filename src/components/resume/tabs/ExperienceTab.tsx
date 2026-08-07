"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import ExperienceAIModal from "../ai/ExperienceAIModal";

interface Props {
  resume: any;
  updateResume: (resume: any) => void;
}

export default function ExperienceTab({ resume, updateResume }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  function updateExperience(index: number, field: string, value: string) {
    const experiences = [...resume.workExperience];

    experiences[index] = {
      ...experiences[index],
      [field]: value,
    };

    updateResume({
      ...resume,
      workExperience: experiences,
    });
  }

  function addExperience() {
    updateResume({
      ...resume,

      workExperience: [
        ...resume.workExperience,

        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  }

  function deleteExperience(index: number) {
    updateResume({
      ...resume,

      workExperience: resume.workExperience.filter(
        (_: any, i: number) => i !== index,
      ),
    });
  }

  async function improve(index: number) {
    const description = resume.workExperience[index].description;

    if (!description) return;

    const res = await fetch("/api/ai/improve-content", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        content: description,
      }),
    });

    const data = await res.json();

    if (!data.success) return;

    updateExperience(index, "description", data.data.content);
  }

  return (
    <div className="space-y-8">
      <Button onClick={addExperience}>+ Add Experience</Button>

      {resume.workExperience.map((experience: any, index: number) => (
        <div key={index} className="glass space-y-5 p-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">Experience {index + 1}</h2>

            <button
              onClick={() => deleteExperience(index)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>

          <Input
            label="Company"
            value={experience.company}
            onChange={(e) => updateExperience(index, "company", e.target.value)}
          />

          <Input
            label="Position"
            value={experience.position}
            onChange={(e) =>
              updateExperience(index, "position", e.target.value)
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={experience.startDate}
              onChange={(e) =>
                updateExperience(index, "startDate", e.target.value)
              }
            />

            <Input
              label="End Date"
              type="month"
              value={experience.endDate}
              onChange={(e) =>
                updateExperience(index, "endDate", e.target.value)
              }
            />
          </div>

          <textarea
            className="input min-h-[180px]"
            value={experience.description}
            placeholder="Describe your work..."
            onChange={(e) =>
              updateExperience(index, "description", e.target.value)
            }
          />

          <div className="flex gap-4">
            <Button onClick={() => setSelectedIndex(index)}>
              ✨ AI Generate
            </Button>

            <Button onClick={() => improve(index)}>Improve</Button>
          </div>
        </div>
      ))}

      <ExperienceAIModal
        open={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        onGenerate={(description) => {
          if (selectedIndex === null) return;

          updateExperience(selectedIndex, "description", description);
        }}
      />
    </div>
  );
}
