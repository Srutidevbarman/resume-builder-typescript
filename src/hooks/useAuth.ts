"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const router = useRouter();

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
        setError(data.message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.data.user));

      router.push("/dashboard");
    } catch {
      setError("Unable to login.");
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
        setError(data.message);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.data.user));

      router.push("/dashboard");
    } catch {
      setError("Registration failed.");
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
