"use client";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import ResumeCard from "@/components/dashboard/ResumeCard";
import EmptyState from "@/components/dashboard/EmptyState";
import CreateResumeButton from "@/components/dashboard/CreateResumeButton";

import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { user, resumes, loading, creating, logout, createResume } =
    useDashboard();

  return (
    <main className="min-h-screen">
      <DashboardNavbar user={user} logout={logout} />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">My Resumes</h1>

            <p className="mt-2 text-gray-400">
              Manage and build AI-powered resumes.
            </p>
          </div>

          <CreateResumeButton loading={creating} createResume={createResume} />
        </div>

        {loading ? (
          <DashboardSkeleton />
        ) : resumes.length === 0 ? (
          <EmptyState createResume={createResume} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <ResumeCard key={resume._id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
