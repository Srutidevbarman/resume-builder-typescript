"use client";

import { useState } from "react";

import Tabs from "./Tabs";
import TopBar from "./TopBar";
import ResumePreview from "./ResumePreview";

interface Props {
  resume: any;
  saving: boolean;
}

export default function ResumeEditor({ resume, saving }: Props) {
  const [activeTab, setActiveTab] = useState("Personal");

  return (
    <main className="h-screen">
      <TopBar saving={saving} />

      <div className="grid h-[calc(100vh-88px)] lg:grid-cols-5">
        <section className="overflow-y-auto border-r border-white/10 lg:col-span-3">
          <div className="p-6">
            <Tabs active={activeTab} setActive={setActiveTab} />

            <div className="mt-8">
              <div className="rounded-xl border border-dashed border-white/10 p-12 text-center text-gray-400">
                {activeTab} tab coming in next part...
              </div>
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
