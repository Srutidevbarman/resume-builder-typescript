import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FileText,
  LayoutDashboard,
  PenLine,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";

const stats = [
  { label: "ATS checks", value: "Live" },
  { label: "Sections", value: "7+" },
  { label: "Autosave", value: "On" },
];

const features = [
  {
    icon: WandSparkles,
    title: "AI writing help",
    copy: "Improve summaries, experience bullets, project details, and skills from inside the editor.",
  },
  {
    icon: Target,
    title: "ATS scoring",
    copy: "Review resume strength before applying and tune content around the role you want.",
  },
  {
    icon: LayoutDashboard,
    title: "Resume dashboard",
    copy: "Keep multiple versions organized so each application gets a focused resume.",
  },
];

const workflow = [
  "Create a resume",
  "Fill your profile",
  "Improve with AI",
  "Export when ready",
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-[0_0_35px_rgba(124,58,237,.3)]">
              <Sparkles size={22} className="text-white" />
            </span>
            <span className="text-2xl font-bold">
              Resume<span className="text-violet-400">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-lg border border-white/10 px-4 py-2 font-medium text-gray-200 transition hover:border-violet-400/50 hover:text-white sm:inline-flex"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="btn-primary inline-flex items-center gap-2"
            >
              Start
              <ArrowRight size={18} />
            </Link>
          </div>
        </nav>
      </header>

      <section className="relative mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl items-center px-6 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,.22),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,.04),transparent_62%)]" />

        <div className="relative z-10 max-w-2xl fade">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200">
            <BadgeCheck size={16} />
            AI powered resume builder
          </div>

          <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Resume<span className="text-violet-400">AI</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Build sharp, role-ready resumes with AI content suggestions, ATS
            feedback, and a clean editor that keeps every version in reach.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Build Your Resume
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-[10px] border border-white/10 bg-white/5 px-5 py-3 font-semibold text-gray-100 transition hover:border-violet-400/50 hover:bg-white/10"
            >
              Sign In
            </Link>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/[.04] p-4"
              >
                <dt className="text-xs uppercase text-gray-500">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-xl font-bold text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mt-12 min-h-[470px] lg:mt-0">
          <div className="glass absolute left-0 top-8 w-[88%] max-w-xl p-5 shadow-2xl shadow-black/30 sm:left-8 lg:left-0">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-violet-300">Resume Editor</p>
                <h2 className="mt-1 text-2xl font-bold">Frontend Developer</h2>
              </div>
              <div className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-300">
                Saved
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-3">
                {["Personal", "Experience", "Projects", "Skills"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-sm ${
                        index === 1
                          ? "border-violet-500/40 bg-violet-500/15 text-violet-100"
                          : "border-white/10 bg-white/[.03] text-gray-400"
                      }`}
                    >
                      <PenLine size={16} />
                      {item}
                    </div>
                  ),
                )}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[.03] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-semibold">Experience</p>
                  <span className="rounded-lg bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                    AI Improve
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="h-3 w-3/4 rounded-full bg-white/20" />
                  <div className="h-3 w-full rounded-full bg-white/10" />
                  <div className="h-3 w-11/12 rounded-full bg-white/10" />
                  <div className="h-3 w-4/5 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass absolute bottom-0 right-0 w-[82%] max-w-md overflow-hidden p-5 shadow-2xl shadow-black/40">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-violet-300" />
                <p className="font-semibold">Resume Preview</p>
              </div>
              <p className="text-sm text-emerald-300">ATS 92</p>
            </div>

            <div className="rounded-md bg-white p-5 text-zinc-900">
              <div className="border-b-2 border-zinc-900 pb-4 text-center">
                <div className="mx-auto h-5 w-48 rounded bg-zinc-900" />
                <div className="mx-auto mt-3 h-3 w-32 rounded bg-zinc-300" />
              </div>

              <div className="mt-5 space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item}>
                    <div className="mb-2 h-2 w-28 rounded bg-zinc-800" />
                    <div className="space-y-1.5">
                      <div className="h-2 rounded bg-zinc-200" />
                      <div className="h-2 w-11/12 rounded bg-zinc-200" />
                      <div className="h-2 w-4/5 rounded bg-zinc-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[.02] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium text-violet-300">
                Everything in one flow
              </p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                From blank page to interview-ready.
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {workflow.map((step, index) => (
                <div
                  key={step}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-300"
                >
                  <span className="text-violet-300">0{index + 1}</span> {step}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.title} className="glass p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-gray-400">
                    {feature.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
