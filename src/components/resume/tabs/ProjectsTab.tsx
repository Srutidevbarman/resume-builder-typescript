"use client";

import { useState } from "react";

import Input from "@/components/ui/Input";
import TagInput from "@/components/ui/TagInput";
import Button from "@/components/ui/Button";

import ProjectAIModal from "../ai/ProjectAIModal";

interface Props {
  resume: any;
  updateResume: (resume: any) => void;
}

export default function ProjectsTab({ resume, updateResume }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  function updateProject(index: number, field: string, value: any) {
    const projects = [...resume.projects];

    projects[index] = {
      ...projects[index],
      [field]: value,
    };

    updateResume({
      ...resume,
      projects,
    });
  }

  function addProject() {
    updateResume({
      ...resume,

      projects: [
        ...resume.projects,

        {
          title: "",
          description: "",
          githubUrl: "",
          liveUrl: "",
          techStack: [],
        },
      ],
    });
  }

  function deleteProject(index: number) {
    updateResume({
      ...resume,

      projects: resume.projects.filter((_: any, i: number) => i !== index),
    });
  }

  return (
    <div className="space-y-8">
      <Button onClick={addProject}>+ Add Project</Button>

      {resume.projects.map((project: any, index: number) => (
        <div
          key={index}
          className="input flex min-h-[56px] flex-wrap items-center gap-2 rounded-xl p-2 focus-within:border-violet-500"
        >
          <div className="w-full flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Project {index + 1}</h2>

            <button
              className="text-red-400"
              onClick={() => deleteProject(index)}
            >
              Delete
            </button>
          </div>

          <Input
            label="Project Title"
            value={project.title}
            onChange={(e) => updateProject(index, "title", e.target.value)}
          />

          <Input
            label="Github URL"
            value={project.githubUrl}
            onChange={(e) => updateProject(index, "githubUrl", e.target.value)}
          />

          <Input
            label="Live URL"
            value={project.liveUrl}
            onChange={(e) => updateProject(index, "liveUrl", e.target.value)}
          />

          <TagInput
            label="Tech Stack"
            value={project.techStack}
            onChange={(tags) => updateProject(index, "techStack", tags)}
          />

          <textarea
            className="input min-h-[180px]"
            value={project.description}
            onChange={(e) =>
              updateProject(index, "description", e.target.value)
            }
          />

          <Button onClick={() => setSelected(index)}>
            ✨ Generate Description
          </Button>
        </div>
      ))}

      <ProjectAIModal
        open={selected !== null}
        title={selected !== null ? resume.projects[selected].title : ""}
        onClose={() => setSelected(null)}
        onGenerate={(description) => {
          if (selected === null) return;

          updateProject(selected, "description", description);
        }}
      />
    </div>
  );
}
