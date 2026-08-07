"use client";

import { useState } from "react";
import PersonalTab from "./tabs/PersonalTab";
import Tabs from "./Tabs";
import TopBar from "./TopBar";
import ResumePreview from "./ResumePreview";
import SummaryTab from "./tabs/SummaryTab";

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
            </div>
          </div>
        </section>

        <section className="overflow-y-auto bg-neutral-200 p-8 lg:col-span-2">
          <ResumePreview resume={resume} />
        </section>
      </div>
    </main>
  );
}
