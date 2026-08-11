"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

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
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);

  const loadResumes = useCallback(async () => {
    const res = await fetch("/api/resume");
    const json = await res.json();

    if (!res.ok || !json.success) {
      if (res.status === 401) {
        toast.error("Your session expired. Please log in again.");
        router.replace("/login");
        return;
      }
      toast.error(json.message || "Unable to load resumes.");
      return;
    }

    setResumes(json.data || []);
    toast.success("Resumes loaded.");
  }, [router, toast]);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error("Please log in to continue.");
        router.replace("/login");
        return;
      }

      setUser(data.data.user);
      toast.success("Signed in session verified.");
      await loadResumes();
    } catch {
      toast.error("Unable to verify your session.");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [loadResumes, router, toast]);

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
          toast.error("Your session expired. Please log in again.");
          router.replace("/login");
          return;
        }
        toast.error(json.message || "Unable to create resume.");
        return;
      }

      toast.success("Resume created successfully.");
      router.push(`/resume/${json.data._id}`);
    } catch {
      toast.error("Unable to create resume. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  async function logout() {
    localStorage.clear();
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Unable to log out.");
        return;
      }

      toast.success("Logged out successfully.");
    } catch {
      toast.error("Unable to log out.");
    }
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
