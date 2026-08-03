import { generateAiContent } from "@/lib/gemini";
import { GenerateProjectDescriptionBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateProjectDescriptionBody = await req.json();
    const { projectTitle, technologies, role, rawDescription } = body;
    if (!projectTitle || !technologies || !role || !rawDescription) {
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
    const prompt = `You are an expert technical resume writer and ATS optimization specialist who writes concise, achievement-focused project descriptions for resumes and portfolios.

TASK: Write a professional, ATS-friendly project description based on the details below.

INPUT DETAILS:
- Project Title: ${projectTitle}
- Technologies Used: ${technologies}
- Role/Contribution: ${role}
- Project Description (raw notes from user): ${rawDescription}

RULES:
1. Return ONLY the project description — no headings, labels, preamble, or explanation.
2. Format as 3–5 concise bullet points, each starting with a strong action verb (e.g., "Built," "Developed," "Implemented," "Optimized," "Architected").
3. Each bullet should be 1–2 lines (max ~25 words per bullet).
4. Naturally embed the provided technologies as keywords using exact, ATS-recognized naming conventions.
5. Focus on WHAT was built, HOW it was built (tech stack/approach), and the IMPACT or OUTCOME (performance improvement, user reach, problem solved, scale, etc.).
6. Include quantifiable metrics wherever inferable from the raw description (e.g., load time reduced, users served, test coverage, latency). Do not fabricate numbers not present or implied in the input.
7. Avoid personal pronouns (I, me, my, we, our).
8. Avoid vague filler phrases like "worked on," "helped with," or "responsible for" — use direct, ownership-driven language instead.
9. Do not repeat the same technology across multiple bullets unless describing a distinct use case.
10. Output must be a valid JSON array of strings, one string per bullet point — nothing else, no markdown fences.

OUTPUT FORMAT (strict):
["Bullet point 1", "Bullet point 2", "Bullet point 3"]

Now generate the project description following all rules above.`;

    const result = await generateAiContent(prompt);
    const projectDescription = JSON.parse(result || "[]");
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "project description generated successfully",
        data: {
          projectDescription,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("error in creating project description api", error);
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
