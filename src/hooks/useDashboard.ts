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
    checkSession();
  }, []);

  async function checkSession() {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!res.ok || !data.success) {
        router.replace("/login");
        return;
      }

      setUser(data.data.user);
      await loadResumes();
    } catch {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }

  async function loadResumes() {
    try {
      const ids: string[] = JSON.parse(
        localStorage.getItem("resumeIds") || "[]",
      );

      const data: Resume[] = [];

      for (const resumeId of ids) {
        try {
          const res = await fetch(`/api/resume/${resumeId}`);
          const json = await res.json();

          if (json.success) {
            data.push(json.data);
          } else if (res.status === 401) {
            router.replace("/login");
            return;
          }
        } catch (error) {
          console.error("Error fetching resume:", error);
        }
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

      if (!json.success) {
        if (res.status === 401) {
          router.replace("/login");
        }
        return;
      }

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

  async function logout() {
    localStorage.clear();
    await fetch("/api/auth/logout", {
      method: "POST",
    });
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
