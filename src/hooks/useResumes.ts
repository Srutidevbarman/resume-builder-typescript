"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/ToastProvider";
import type { IResume } from "@/types/resume.types";

const useResume = (resumeId: string) => {
  const router = useRouter();
  const toast = useToast();

  const [resume, setResume] = useState<IResume | null>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const loadResume = useCallback(async () => {
    try {
      const res = await fetch(`/api/resume/${resumeId}`);

      const data = await res.json();

      if (!data.success) {
        if (res.status === 401) {
          toast.error("Your session expired. Please log in again.");
          router.replace("/login");
          return;
        }

        toast.error(data.message || "Unable to load resume.");
        router.replace("/dashboard");
        return;
      }

      setResume(data.data);
      toast.success("Resume loaded.");
    } catch {
      toast.error("Unable to load resume. Please try again.");
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  }, [resumeId, router, toast]);

  useEffect(() => {
    void Promise.resolve().then(loadResume);
  }, [loadResume]);

  async function saveResume(updatedFields: IResume) {
    try {
      setSaving(true);

      const res = await fetch(`/api/resume/${resumeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await res.json();

      if (data.success) {
        setResume(data.data);
        toast.success("Resume saved.");
        return;
      }

      if (res.status === 401) {
        toast.error("Your session expired. Please log in again.");
        router.replace("/login");
        return;
      }

      toast.error(data.message || "Unable to save resume.");
    } catch {
      toast.error("Unable to save resume. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return {
    resume,
    setResume,
    loading,
    saving,
    saveResume,

    updateResume(updatedResume: IResume) {
      setResume(updatedResume);
    },
  };
};

export default useResume;
