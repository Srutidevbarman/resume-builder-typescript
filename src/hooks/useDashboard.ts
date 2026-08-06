"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface Resume {
  _id: string;
  title: string;
  updatedAt: string;
}

export function useDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      router.replace("/login");
      return;
    }

    setUser(JSON.parse(savedUser));

    loadResumes();
  }, []);

  async function loadResumes() {
    try {
      const ids: string[] = JSON.parse(
        localStorage.getItem("resumeIds") || "[]",
      );

      const data: Resume[] = [];

      for (const id of ids) {
        try {
          const res = await fetch(`/api/resume/${id}`);
          const json = await res.json();

          if (json.success) {
            data.push(json.data);
          }
        } catch {}
      }

      setResumes(data);
    } finally {
      setLoading(false);
    }
  }

  async function createResume() {
    try {
      setCreating(true);

      const res = await fetch("/api/resume/create", {
        method: "POST",
      });

      const json = await res.json();

      if (!json.success) return;

      const ids: string[] = JSON.parse(
        localStorage.getItem("resumeIds") || "[]",
      );

      ids.push(json.data._id);

      localStorage.setItem("resumeIds", JSON.stringify(ids));

      router.push(`/resume/${json.data._id}`);
    } finally {
      setCreating(false);
    }
  }

  function logout() {
    localStorage.clear();
    router.replace("/login");
  }

  return {
    user,
    resumes,
    loading,
    creating,
    logout,
    createResume,
  };
}
