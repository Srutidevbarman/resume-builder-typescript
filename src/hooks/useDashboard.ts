"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export interface Resume {
  _id: string;
  title: string;
  updatedAt: string;
}

interface DashboardUser {
  _id: string;
  name: string;
  email: string;
}

export function useDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);

  const loadResumes = useCallback(async () => {
    const res = await fetch("/api/resume");
    const json = await res.json();

    if (!res.ok || !json.success) {
      if (res.status === 401) {
        router.replace("/login");
      }
      return;
    }

    setResumes(json.data || []);
  }, [router]);

  const checkSession = useCallback(async () => {
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
  }, [loadResumes, router]);

  useEffect(() => {
    void Promise.resolve().then(checkSession);
  }, [checkSession]);

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
