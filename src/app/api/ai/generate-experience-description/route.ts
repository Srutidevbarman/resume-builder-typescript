import { generateAiContent } from "@/lib/gemini";
import { GenerateExperienceDescriptionBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateExperienceDescriptionBody = await req.json();
    const { experienceLevel, yearsOfExperience, techStack, jobRole } = body;
    if (!experienceLevel || !yearsOfExperience || !techStack || !jobRole) {
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
- Job Role: ${jobRole}
- Experience Level: ${experienceLevel}
- Years of Experience: ${yearsOfExperience}
- Tech Stack: ${techStack.join(", ")}

RULES:
1. Write ONLY the summary text — no headings, labels, preamble, or explanation.
2. Length: 3–4 sentences (45–65 words). Never exceed 70 words.
3. Start with a strong descriptor using the exact ${jobRole} (e.g., "Results-driven ${jobRole}...") — never start with "I" or "Responsible for."
4. Naturally embed the provided tech stack as keywords, using exact or close variants of standard industry terminology.
5. Reflect the given years of experience explicitly or implicitly (e.g., "5+ years of experience building...").
6. Reflect the given experience level accurately:
   - Entry-level: emphasize education, projects, potential, and eagerness to contribute.
   - Mid-level: emphasize proven track record, specific skills, and measurable impact.
   - Senior/Executive: emphasize leadership, strategic impact, and scale of responsibility.
7. Include at least one quantifiable achievement or scope indicator if inferable from context (years, scale, team size). If no numbers are given beyond yearsOfExperience, use qualitative strength indicators instead of inventing fake stats.
8. Use active voice and strong action-oriented language. Avoid clichés like "hardworking," "team player," "go-getter," or "detail-oriented" without context.
9. Avoid personal pronouns (I, me, my).
10. Avoid special characters, emojis, or formatting symbols — plain text only.
11. Do not fabricate specific employers, certifications, or credentials not provided in the input.
12. Ensure the summary aligns with what a ${jobRole} at the ${experienceLevel} level is typically expected to demonstrate (scope of ownership, technical depth, and impact).
13. Output must be a single paragraph with no line breaks, returned as a plain string — no JSON wrapping, no markdown fences.

Now generate the resume summary following all rules above.`;

    const result = await generateAiContent(prompt);
    const experienceDescription = result;
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "work experience description generated successfully",
        data: {
          experienceDescription,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("error in creating work experience description api", error);
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
