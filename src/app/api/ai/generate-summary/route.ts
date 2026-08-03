import { generateAiContent } from "@/lib/gemini";
import { GenerateSummeryBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSummeryBody = await req.json();
    const { experienceLevel, skills, jobTitle } = body;
    if (!experienceLevel || !skills || !jobTitle) {
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
    const prompt = `You are an expert resume writer and ATS (Applicant Tracking System) optimization specialist with 15+ years of experience helping candidates land interviews at top companies.

TASK: Write a professional resume summary based on the details below.

INPUT DETAILS:
- Job Title: ${jobTitle}
- Key Skills: ${skills}
- Experience Level: ${experienceLevel}

RULES:
1. Write ONLY the summary text — no headings, labels, preamble, or explanation (do not include "Summary:" or similar).
2. Length: 3–4 sentences (45–65 words). Never exceed 70 words.
3. Start with a strong role-based descriptor (e.g., "Results-driven ${jobTitle}...") — never start with "I" or "Responsible for."
4. Naturally embed the provided skills as keywords, using exact or close variants of standard industry terminology (avoid rare synonyms ATS won't match).
5. Reflect the given experience level accurately:
   - Entry-level: emphasize education, projects, potential, and eagerness to contribute.
   - Mid-level: emphasize proven track record, specific skills, and measurable impact.
   - Senior/Executive: emphasize leadership, strategic impact, and scale of responsibility.
6. Include at least one quantifiable achievement or scope indicator if inferable from context (e.g., team size, years of experience, metrics). If no numbers are given, use qualitative strength indicators instead of inventing fake stats.
7. Use active voice and strong action-oriented language. Avoid clichés like "hardworking," "team player," "go-getter," or "detail-oriented" without context.
8. Avoid personal pronouns (I, me, my).
9. Avoid special characters, emojis, or formatting symbols — plain text only, since ATS parsers may misread them.
10. Do not fabricate specific employers, certifications, or credentials not provided in the input.
11. Output must be a single paragraph with no line breaks.

Now generate the resume summary following all rules above.`;

    const result = await generateAiContent(prompt);
    const summary = result;
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "resume summary generated successfully",
        data: {
          summary,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("error in creating resume", error);
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
