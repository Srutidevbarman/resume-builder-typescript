import { generateAiContent } from "@/lib/gemini";
import { ImproveContentBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText } = body;
    if (!resumeText) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "all fields are required",
        },
        {
          status: 400,
        },
      );
    }

    const prompt = `You are an expert ATS (Applicant Tracking System) analyst and professional resume reviewer with deep knowledge of how real-world ATS platforms (Workday, Greenhouse, Taleo, iCIMS) parse and score resumes.

TASK: Analyze the resume text below and provide an ATS compatibility score along with actionable feedback.

RESUME TEXT:
"""
${resumeText}
"""

EVALUATION CRITERIA (score each internally, then compute overall score):
1. Formatting & Parseability (20%): Standard section headings, no tables/columns/graphics that break parsing, consistent date formats, no headers/footers with critical info.
2. Keyword Relevance & Density (25%): Presence of role-relevant hard skills, tools, and industry terminology; avoids keyword stuffing.
3. Content Quality & Impact (20%): Use of strong action verbs, quantifiable achievements, results-oriented language (vs. vague duty descriptions).
4. Structure & Completeness (15%): Presence of key sections (Summary, Experience, Skills, Education), logical ordering, consistent formatting within sections.
5. Clarity & Conciseness (10%): No overly long paragraphs, no redundant phrasing, appropriate length for experience level.
6. Contact Info & Essentials (10%): Presence of name, contact details, and no missing critical identifying information (without exposing sensitive data unnecessarily).

RULES:
1. Compute an overall ATS score from 0–100 based on the weighted criteria above.
2. Provide a short breakdown score (0–100) for each of the 6 criteria.
3. Provide 3–6 specific, actionable improvement suggestions — reference actual content from the resume where relevant, not generic advice.
4. Provide 2–4 strengths already present in the resume.
5. Do not fabricate issues that aren't actually present in the text.
6. Do not include soft, vague feedback like "could be better" — be specific about WHAT to change and WHY.
7. Output must be valid JSON only — no markdown fences, no preamble, no explanation outside the JSON structure.

OUTPUT FORMAT (strict JSON):
{
  "overallScore": number,
  "breakdown": {
    "formattingParseability": number,
    "keywordRelevance": number,
    "contentQuality": number,
    "structureCompleteness": number,
    "clarityConciseness": number,
    "contactEssentials": number
  },
  "strengths": ["string", "string"],
  "improvements": ["string", "string", "string"],
  "summary": "One or two sentence overall verdict on ATS readiness"
}

Now analyze the resume and generate the ATS score report following all rules above.`;

    const result = await generateAiContent(prompt);
    const resumeAnalysis = JSON.parse(result || "[]");
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "ATS analysis completed successfully",
        data: {
          content: resumeAnalysis,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("error in creating ATS analysis api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
