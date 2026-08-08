"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface Props {
  resume: any;
  updateResume: (resume: any) => void;
}

export default function CertificationsTab({ resume, updateResume }: Props) {
  const [certification, setCertification] = useState("");

  const certifications = resume.certifications || [];

  function addCertification() {
    const value = certification.trim();

    if (!value) return;

    // Prevent duplicate certifications
    const alreadyExists = certifications.some(
      (item: string) => item.toLowerCase() === value.toLowerCase(),
    );

    if (alreadyExists) {
      setCertification("");
      return;
    }

    updateResume({
      ...resume,
      certifications: [...certifications, value],
    });

    setCertification("");
  }

  function deleteCertification(index: number) {
    updateResume({
      ...resume,
      certifications: certifications.filter(
        (_: string, i: number) => i !== index,
      ),
    });
  }

  return (
    <div className="space-y-8">
      {/* Add Certification */}
      <div className="glass space-y-5 p-6">
        <div>
          <h2 className="text-xl font-bold">Certifications</h2>

          <p className="mt-1 text-sm text-gray-400">
            Add professional certifications, courses, or credentials.
          </p>
        </div>

        <div className="flex gap-3">
          <input
            className="input"
            placeholder="e.g. AWS Certified Developer"
            value={certification}
            onChange={(e) => setCertification(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCertification();
              }
            }}
          />

          <Button onClick={addCertification} disabled={!certification.trim()}>
            Add
          </Button>
        </div>
      </div>

      {/* Certification List */}
      <div className="glass p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Certifications</h2>

          <span className="text-sm text-gray-500">
            {certifications.length}{" "}
            {certifications.length === 1 ? "certification" : "certifications"}
          </span>
        </div>

        {certifications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 p-10 text-center">
            <div className="text-4xl">🏆</div>

            <p className="mt-4 text-gray-400">No certifications added yet.</p>

            <p className="mt-1 text-sm text-gray-500">
              Add your professional certifications above.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {certifications.map((certification: string, index: number) => (
              <div
                key={`${certification}-${index}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                    ✓
                  </div>

                  <span>{certification}</span>
                </div>

                <button
                  type="button"
                  onClick={() => deleteCertification(index)}
                  className="rounded-lg px-3 py-1.5 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
