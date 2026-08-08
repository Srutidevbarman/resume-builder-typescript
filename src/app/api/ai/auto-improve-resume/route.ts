import { NextRequest, NextResponse } from "next/server";
import { generateAiContent } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { resume, improvements } = await req.json();

    if (!resume || !Array.isArray(improvements)) {
      return NextResponse.json(
        {
          success: false,
          message: "Resume and improvements are required",
        },
        { status: 400 },
      );
    }

    const prompt = `
You are a professional resume optimization AI.

Your task is to improve the provided resume based ONLY on
the ATS improvement recommendations.

IMPORTANT RULES:

1. Do NOT invent any experience.
2. Do NOT invent companies.
3. Do NOT invent job titles.
4. Do NOT invent dates.
5. Do NOT invent education.
6. Do NOT invent certifications.
7. Do NOT invent skills that are not already present.
8. Do NOT change URLs.
9. Do NOT change the user's personal information.
10. Preserve the original JSON structure.
11. Improve grammar, spelling, clarity, conciseness,
    keyword usage, formatting, and professional wording.
12. Preserve factual information.
13. If an ATS recommendation cannot be safely applied,
    leave that part unchanged.
14. Return ONLY valid JSON.
15. Return the complete improved resume object.

ATS IMPROVEMENTS:

${JSON.stringify(improvements, null, 2)}

CURRENT RESUME:

${JSON.stringify(resume, null, 2)}

Return ONLY the improved resume JSON.
`;

    const output = await generateAiContent(prompt);

    if (!output) {
      return NextResponse.json(
        {
          success: false,
          message: "AI returned no content",
        },
        { status: 500 },
      );
    }

    let improvedResume;

    try {
      improvedResume = JSON.parse(output as string);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "AI returned invalid resume JSON",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Resume improved successfully",
      data: {
        resume: improvedResume,
      },
    });
  } catch (error) {
    console.error("Auto improve resume error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to improve resume",
      },
      { status: 500 },
    );
  }
}
