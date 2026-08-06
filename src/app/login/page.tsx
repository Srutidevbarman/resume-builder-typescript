"use client";

import { useState } from "react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import AuthLayout from "@/components/auth/AuthLayout";

import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue building resumes."
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          login(email, password);
        }}
      >
        <Input
          label="Email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400">{error}</p>}

        <Button loading={loading} className="w-full">
          Login
        </Button>

        <p className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-violet-400">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
