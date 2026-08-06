"use client";

import { useParams } from "next/navigation";
import useResume from "@/hooks/useResumes";
import ResumeEditor from "@/components/resume/ResumeEditor";

export default function ResumePage() {
  const params = useParams();

  const resumeId = params.resumeId as string;

  const { resume, loading, saving } = useResume(resumeId);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Resume...
      </div>
    );
  }

  return <ResumeEditor resume={resume} saving={saving} />;
}
