import { generateAiContent } from "@/lib/gemini";
import { GenerateSkillsBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: GenerateSkillsBody = await req.json();
    const { experienceLevel, jobTitle } = body;
    if (!experienceLevel || !jobTitle) {
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
    const prompt = `You are an expert technical recruiter and ATS optimization specialist with deep knowledge of industry-standard technical skills, tools, and technologies across various tech roles.

TASK: Generate a list of relevant TECHNICAL skills only, based on the job details below.

INPUT DETAILS:
- Job Title: ${jobTitle}
- Experience Level: ${experienceLevel}

RULES:
1. Return ONLY technical/hard skills — no soft skills (e.g., exclude "communication," "teamwork," "leadership," "problem-solving").
2. Include only concrete, verifiable skills: programming languages, frameworks, libraries, tools, platforms, databases, methodologies, cloud services, and technical competencies.
3. Tailor the skill set to match the experience level:
   - Entry-level: foundational languages, tools, and frameworks commonly taught/used in junior roles.
   - Mid-level: production-grade tools, frameworks, and practices used in professional environments.
   - Senior/Executive: advanced architecture, system design, infrastructure, and specialized/leading-edge tools.
4. Use standard, ATS-recognized naming conventions (e.g., "Node.js" not "NodeJS" or "Node").
5. Generate between 8 and 12 skills — no more, no less.
6. Do not repeat conceptually duplicate skills.
7. Do not include vague or generic terms like "programming" or "coding" — be specific.
8. Only include skills directly relevant to the ${jobTitle} role.

OUTPUT FORMAT — CRITICAL:
- Return a raw JSON array of strings. Example: ["Skill1", "Skill2", "Skill3"]
- Do NOT wrap the array in quotes.
- Do NOT return it as a string.
- Do NOT escape the quotes or add \\n characters.
- Do NOT include markdown code fences (no \`\`\`json).
- Do NOT include any explanation, preamble, or extra text.
- The response body itself must be valid, parseable JSON — nothing else.

Now generate the technical skills list following all rules above.`;

    const result = await generateAiContent(prompt);
    const skills = JSON.parse(result || "[]");
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "technical skills generated successfully",
        data: {
          skills,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("error in creating technical generation api", error);
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
