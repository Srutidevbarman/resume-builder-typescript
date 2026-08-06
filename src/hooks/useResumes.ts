"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useResume = (resumeId: string) => {
  const router = useRouter();

  const [resume, setResume] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  async function loadResume() {
    try {
      const res = await fetch(`/api/resume/${resumeId}`);

      const data = await res.json();

      if (!data.success) {
        router.replace("/dashboard");
        return;
      }

      setResume(data.data);
    } finally {
      setLoading(false);
    }
  }

  async function saveResume(updatedFields: any) {
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
      }
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
  };
};

export default useResume;
