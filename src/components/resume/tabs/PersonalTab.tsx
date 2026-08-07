"use client";

import Input from "@/components/ui/Input";

interface Props {
  resume: any;
  updateResume: (resume: any) => void;
}

export default function PersonalTab({ resume, updateResume }: Props) {
  function updateField(field: string, value: string) {
    updateResume({
      ...resume,

      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    });
  }

  function updateTitle(value: string) {
    updateResume({
      ...resume,
      title: value,
    });
  }

  return (
    <div className="space-y-6">
      <Input
        label="Resume Title"
        value={resume.title}
        onChange={(e) => updateTitle(e.target.value)}
      />

      <Input
        label="Full Name"
        value={resume.personalInfo.fullname}
        onChange={(e) => updateField("fullname", e.target.value)}
      />

      <Input
        label="Email"
        value={resume.personalInfo.email}
        onChange={(e) => updateField("email", e.target.value)}
      />

      <Input
        label="Mobile"
        value={resume.personalInfo.mobile}
        onChange={(e) => updateField("mobile", e.target.value)}
      />

      <Input
        label="Address"
        value={resume.personalInfo.address}
        onChange={(e) => updateField("address", e.target.value)}
      />

      <Input
        label="Location"
        value={resume.personalInfo.location}
        onChange={(e) => updateField("location", e.target.value)}
      />

      <Input
        label="Github"
        value={resume.personalInfo.github}
        onChange={(e) => updateField("github", e.target.value)}
      />

      <Input
        label="LinkedIn"
        value={resume.personalInfo.linkedIn}
        onChange={(e) => updateField("linkedIn", e.target.value)}
      />

      <Input
        label="Portfolio"
        value={resume.personalInfo.portfolio}
        onChange={(e) => updateField("portfolio", e.target.value)}
      />
    </div>
  );
}
