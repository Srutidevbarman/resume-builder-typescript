"use client";

import { useState } from "react";
import PersonalTab from "./tabs/PersonalTab";
import Tabs from "./Tabs";
import TopBar from "./TopBar";
import ResumePreview from "./ResumePreview";
import SummaryTab from "./tabs/SummaryTab";
import ExperienceTab from "./tabs/ExperienceTab";
import ProjectsTab from "./tabs/ProjectsTab";
import EducationTab from "./tabs/EducationTab";
import SkillsTab from "./tabs/SkillsTab";
import CertificationsTab from "./tabs/CertificationTab";
interface Props {
  resume: any;
  saving: boolean;
  updateResume: (resume: any) => void;
}

export default function ResumeEditor({ resume, saving, updateResume }: Props) {
  const [activeTab, setActiveTab] = useState("Personal");

  return (
    <main className="h-screen">
      <TopBar saving={saving} />

      <div className="grid h-[calc(100vh-88px)] lg:grid-cols-5">
        <section className="overflow-y-auto border-r border-white/10 lg:col-span-3">
          <div className="p-6">
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
          </div>
        </section>

        <section
          className="
    overflow-auto
    bg-neutral-200
    lg:col-span-2
  "
        >
          <ResumePreview resume={resume} />
        </section>
      </div>
    </main>
  );
}
