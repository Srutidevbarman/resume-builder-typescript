"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/ToastProvider";

export function useAuth() {
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function login(email: string, password: string) {
    try {
      setLoading(true);

      setError("");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        const message = data.message || "Unable to login.";
        setError(message);
        toast.error(message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.data.user));
      toast.success("Logged in successfully.");

      router.push("/dashboard");
    } catch {
      const message = "Unable to login. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function register(body: {
    name: string;
    email: string;
    mobile: string;
    password: string;
  }) {
    try {
      setLoading(true);

      setError("");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.success) {
        const message = data.message || "Registration failed.";
        setError(message);
        toast.error(message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.data.user));
      toast.success("Account created successfully.");

      router.push("/dashboard");
    } catch {
      const message = "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    login,
    register,
  };
}
