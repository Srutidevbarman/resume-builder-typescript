"use client";

import { useParams } from "next/navigation";
import useResume from "@/hooks/useResumes";
import ResumeEditor from "@/components/resume/ResumeEditor";
import useAutosave from "@/hooks/useAutosave";
import { useState } from "react";
export default function ResumePage() {
  const params = useParams();

  const resumeId = params.resumeId as string;

  const { resume, loading, saving, saveResume, updateResume } =
    useResume(resumeId);

  const [autosaveEnabled, setAutosaveEnabled] = useState(true);
  // default 1 minute
  const [autosaveDelay, setAutosaveDelay] = useState<number>(60_000);

  useAutosave(
    () => {
      if (resume) {
        saveResume(resume);
      }
    },
    [resume],
    autosaveDelay,
    autosaveEnabled,
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Resume...
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex h-screen items-center justify-center">
        Resume not found.
      </div>
    );
  }

  function handleManualSave() {
    if (resume) saveResume(resume);
  }

  return (
    <ResumeEditor
      resume={resume}
      saving={saving}
      updateResume={updateResume}
      autosaveEnabled={autosaveEnabled}
      setAutosaveEnabled={setAutosaveEnabled}
      autosaveDelay={autosaveDelay}
      setAutosaveDelay={setAutosaveDelay}
      onManualSave={handleManualSave}
    />
  );
}
