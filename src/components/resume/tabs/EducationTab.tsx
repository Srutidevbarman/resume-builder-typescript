"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Props {
  resume: any;
  updateResume: (resume: any) => void;
}

export default function EducationTab({ resume, updateResume }: Props) {
  function updateEducation(index: number, field: string, value: string) {
    const education = [...resume.education];

    education[index] = {
      ...education[index],
      [field]: value,
    };

    updateResume({
      ...resume,
      education,
    });
  }

  function addEducation() {
    updateResume({
      ...resume,

      education: [
        ...resume.education,

        {
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  }

  function deleteEducation(index: number) {
    updateResume({
      ...resume,

      education: resume.education.filter((_: any, i: number) => i !== index),
    });
  }

  return (
    <div className="space-y-8">
      <Button onClick={addEducation}>+ Add Education</Button>

      {resume.education.map((edu: any, index: number) => (
        <div key={index} className="glass space-y-5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Education {index + 1}</h2>

            <button
              className="text-red-400"
              onClick={() => deleteEducation(index)}
            >
              Delete
            </button>
          </div>

          <Input
            label="Institution"
            value={edu.institution}
            onChange={(e) =>
              updateEducation(index, "institution", e.target.value)
            }
          />

          <Input
            label="Degree"
            value={edu.degree}
            onChange={(e) => updateEducation(index, "degree", e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={edu.startDate}
              onChange={(e) =>
                updateEducation(index, "startDate", e.target.value)
              }
            />

            <Input
              label="End Date"
              type="month"
              value={edu.endDate}
              onChange={(e) =>
                updateEducation(index, "endDate", e.target.value)
              }
            />
          </div>

          <textarea
            rows={5}
            className="input resize-none"
            value={edu.description}
            placeholder="Education details..."
            onChange={(e) =>
              updateEducation(index, "description", e.target.value)
            }
          />
        </div>
      ))}
    </div>
  );
}
