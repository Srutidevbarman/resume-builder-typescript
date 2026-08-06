"use client";

import { useState } from "react";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import AuthLayout from "@/components/auth/AuthLayout";

import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { loading, error, register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue building resumes."
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          register(form);
        }}
      >
        <Input
          label="Name"
          placeholder="John Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-red-400">{error}</p>}

        <Button loading={loading} className="w-full">
          Register
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
