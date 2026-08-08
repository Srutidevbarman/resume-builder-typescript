"use client";

import { useState } from "react";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import { resumeToText } from "@/lib/resumeToText";

interface Props {
  open: boolean;
  onClose: () => void;
  resume: any;
  updateResume: (resume: any) => void;
}

interface ATSResult {
  overallScore: number;

  breakdown: {
    formattingParseability: number;
    keywordRelevance: number;
    contentQuality: number;
    structureCompleteness: number;
    clarityConciseness: number;
    contentEssentials: number;
  };

  strengths: string[];

  improvements: string[];

  summary: string;
}

export default function ATSModal({
  open,
  onClose,
  resume,
  updateResume,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [improving, setImproving] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);

  const [error, setError] = useState("");

  async function analyzeResume() {
    try {
      setLoading(true);
      setError("");

      const resumeText = resumeToText(resume);

      const res = await fetch("/api/ai/ats-score", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          resumeText,
        }),
      });

      const data = await res.json();
      console.log("ATS API RESPONSE:", data);
      if (!data.success) {
        setError(data.message || "Unable to analyze resume.");

        return;
      }

      setResult(data.data.content);
    } catch {
      setError("Something went wrong while analyzing your resume.");
    } finally {
      setLoading(false);
    }
  }
  async function autoImproveResume() {
    if (!result?.improvements?.length) {
      return;
    }

    try {
      setImproving(true);
      setError("");

      const res = await fetch("/api/ai/auto-improve-resume", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          resume,
          improvements: result.improvements,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to improve resume.");

        return;
      }

      const improvedResume = data.data.resume;

      updateResume(improvedResume);

      // Re-analyze the improved resume
      setResult(null);
    } catch (error) {
      console.error("Auto improve error:", error);

      setError("Something went wrong while improving your resume.");
    } finally {
      setImproving(false);
    }
  }

  function getScoreClass(score: number) {
    if (score >= 80) {
      return "text-green-500";
    }

    if (score >= 60) {
      return "text-yellow-500";
    }

    return "text-red-500";
  }

  return (
    <Modal open={open} onClose={onClose} title="ATS Resume Analysis">
      <div className="space-y-6">
        {!result && (
          <>
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
              <h3 className="font-semibold">
                Check your resume against ATS requirements
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Our AI will analyze your resume and identify areas that could
                improve your chances of passing Applicant Tracking Systems.
              </p>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              loading={loading}
              onClick={analyzeResume}
              className="w-full"
            >
              {loading ? "Analyzing Resume..." : "Analyze Resume"}
            </Button>
          </>
        )}

        {result && (
          <div className="max-h-[65vh] space-y-8 overflow-y-auto pr-2">
            {/* Overall Score */}

            <div
              className={`text-7xl font-bold ${getScoreClass(
                result.overallScore,
              )}`}
            >
              {result.overallScore}
              <span className="text-3xl">/100</span>
            </div>

            {/* Summary */}

            {result.summary && (
              <div className="rounded-xl bg-white/5 p-5">
                <h3 className="font-semibold">AI Summary</h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {result.summary}
                </p>
              </div>
            )}

            {/* Breakdown */}

            {result.breakdown && (
              <div>
                <h3 className="mb-4 font-semibold">Score Breakdown</h3>

                <div className="grid grid-cols-2 gap-3">
                  <ScoreItem
                    label="Formatting & Parseability"
                    score={result.breakdown.formattingParseability}
                  />

                  <ScoreItem
                    label="Keyword Relevance"
                    score={result.breakdown.keywordRelevance}
                  />

                  <ScoreItem
                    label="Content Quality"
                    score={result.breakdown.contentQuality}
                  />

                  <ScoreItem
                    label="Structure Completeness"
                    score={result.breakdown.structureCompleteness}
                  />

                  <ScoreItem
                    label="Clarity & Conciseness"
                    score={result.breakdown.clarityConciseness}
                  />

                  <ScoreItem
                    label="Content Essentials"
                    score={result.breakdown.contentEssentials}
                  />
                </div>
              </div>
            )}

            {/* Strengths */}

            {result.strengths?.length ? (
              <div>
                <h3 className="mb-3 font-semibold">✓ Strengths</h3>

                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="rounded-lg bg-green-500/10 p-3 text-sm text-green-300"
                    >
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Improvements */}

            {result.improvements?.length ? (
              <div>
                <h3 className="mb-3 font-semibold">Improvements</h3>

                <ul className="space-y-2">
                  {result.improvements.map((improvement, index) => (
                    <li
                      key={index}
                      className="rounded-lg bg-yellow-500/10 p-3 text-sm text-yellow-300"
                    >
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setResult(null);
                  setError("");
                }}
                className="flex-1"
              >
                Analyze Again
              </Button>

              <Button
                loading={improving}
                disabled={improving || !result.improvements?.length}
                onClick={autoImproveResume}
                className="flex-1"
              >
                ✨ Auto Improve
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

/* =========================================
   SCORE ITEM
========================================= */

function ScoreItem({ label, score }: { label: string; score: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-gray-400">{label}</span>

        <span className="shrink-0 font-semibold">{score}/100</span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-violet-500 transition-all duration-500"
          style={{
            width: `${Math.min(Math.max(score, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
