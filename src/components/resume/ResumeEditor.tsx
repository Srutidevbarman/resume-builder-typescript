"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import PersonalTab from "./tabs/PersonalTab";
import Tabs, { resumeTabs, type ResumeTab } from "./Tabs";
import TopBar from "./TopBar";
import ResumePreview from "./ResumePreview";
import SummaryTab from "./tabs/SummaryTab";
import ExperienceTab from "./tabs/ExperienceTab";
import ProjectsTab from "./tabs/ProjectsTab";
import EducationTab from "./tabs/EducationTab";
import SkillsTab from "./tabs/SkillsTab";
import CertificationsTab from "./tabs/CertificationTab";
import ATSModal from "./ai/ATSModal";
import type { IResume } from "@/types/resume.types";

interface Props {
  resume: IResume;
  saving: boolean;
  updateResume: (resume: IResume) => void;
  autosaveEnabled?: boolean;
  setAutosaveEnabled?: (v: boolean) => void;
  autosaveDelay?: number;
  setAutosaveDelay?: (v: number) => void;
  onManualSave?: () => void;
}

export default function ResumeEditor({
  resume,
  saving,
  updateResume,
  autosaveEnabled = true,
  setAutosaveEnabled,
  autosaveDelay = 60_000,
  setAutosaveDelay,
  onManualSave,
}: Props) {
  const [activeTab, setActiveTab] = useState<ResumeTab>("Personal");
  const [atsOpen, setAtsOpen] = useState(false);

  const activeIndex = resumeTabs.indexOf(activeTab);
  const progress = ((activeIndex + 1) / resumeTabs.length) * 100;
  const nextTab = resumeTabs[activeIndex + 1];

  function goToNextTab() {
    if (!nextTab) return;

    setActiveTab(nextTab);
  }

  return (
    <main className="h-screen">
      <TopBar
        saving={saving}
        onOpenAts={() => setAtsOpen(true)}
        autosaveEnabled={autosaveEnabled}
        setAutosaveEnabled={setAutosaveEnabled}
        autosaveDelay={autosaveDelay}
        setAutosaveDelay={setAutosaveDelay}
        onManualSave={onManualSave}
      />
      <div className="grid h-[calc(100vh-88px)] lg:grid-cols-5">
        <section className="overflow-y-auto border-r border-white/10 lg:col-span-3">
          <div className="p-6">
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-violet-300">
                    Resume progress
                  </p>
                  <h2 className="mt-1 text-xl font-bold">{activeTab}</h2>
                </div>

                <p className="rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-gray-300">
                  {activeIndex + 1} / {resumeTabs.length}
                </p>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <Tabs active={activeTab} setActive={setActiveTab} />

            <div className="mt-8">
              {activeTab === "Personal" && (
                <PersonalTab resume={resume} updateResume={updateResume} />
              )}
              {activeTab === "Summary" && (
                <SummaryTab resume={resume} updateResume={updateResume} />
              )}
              {activeTab === "Experience" && (
                <ExperienceTab resume={resume} updateResume={updateResume} />
              )}
              {activeTab === "Projects" && (
                <ProjectsTab resume={resume} updateResume={updateResume} />
              )}
              {activeTab === "Education" && (
                <EducationTab resume={resume} updateResume={updateResume} />
              )}
              {activeTab === "Skills" && (
                <SkillsTab resume={resume} updateResume={updateResume} />
              )}
              {activeTab === "Certifications" && (
                <CertificationsTab
                  resume={resume}
                  updateResume={updateResume}
                />
              )}
            </div>

            <div className="sticky bottom-0 -mx-6 mt-10 border-t border-white/10 bg-[var(--bg-base)]/95 px-6 py-4 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-gray-400">
                  {nextTab
                    ? `Next section: ${nextTab}`
                    : "All resume sections completed"}
                </p>

                <button
                  type="button"
                  onClick={goToNextTab}
                  disabled={!nextTab}
                  className="btn-primary inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {nextTab ? "Next" : "Done"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          className="
          overflow-auto
          bg-neutral-200
          lg:col-span-2
          "
        >
          <div className="no-print flex justify-end border-b border-black/10 bg-white p-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Print / Download PDF
            </button>
          </div>
          <ResumePreview resume={resume} />
        </section>
      </div>
      <ATSModal
        open={atsOpen}
        onClose={() => setAtsOpen(false)}
        resume={resume}
        updateResume={updateResume}
      />
    </main>
  );
}
