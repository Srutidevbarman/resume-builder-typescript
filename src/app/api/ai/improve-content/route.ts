import { generateAiContent } from "@/lib/gemini";
import { ImproveContentBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: ImproveContentBody = await req.json();
    const { content } = body;
    if (!content) {
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

TASK: Improve the following resume content while preserving its core meaning and facts.

ORIGINAL CONTENT:
"${content}"

RULES:
1. Return ONLY the improved content — no headings, labels, preamble, or explanation.
2. Preserve all factual information from the original (companies, technologies, numbers, achievements, job titles). Do not invent new facts, metrics, or claims not present or clearly implied in the original.
3. Improve clarity, conciseness, and impact:
   - Replace weak or passive phrasing (e.g., "was responsible for," "helped with," "worked on") with strong action verbs (e.g., "led," "built," "optimized," "delivered").
   - Tighten wordy sentences without losing meaning.
   - Fix grammar, tense consistency, spelling, and awkward phrasing.
4. Strengthen ATS compatibility:
   - Ensure technical terms and skills use standard, ATS-recognized naming conventions.
   - Reinforce keywords that are already present in the content — do not insert unrelated skills or technologies not mentioned in the original.
5. Elevate the language to sound professional, confident, and achievement-oriented, appropriate to whatever seniority level the original content implies.
6. Preserve the original structure:
   - If the original is a single paragraph, return a single paragraph.
   - If the original is multiple lines/bullet points, return the same number of bullet points (do not split single lines into multiple, or merge unless removing exact duplicates).
7. Avoid personal pronouns (I, me, my, we, our).
8. Avoid clichés like "hardworking," "team player," "go-getter," or "detail-oriented" without supporting context.
9. Avoid special characters, emojis, or formatting symbols — plain text only.
10. If the original content is already strong and well-written, make only minor refinements rather than rewriting unnecessarily.
11. Output format must exactly match the input format:
    - If original was a plain string, return a plain string only.
    - If original was a list of lines/bullets, return each improved bullet on its own line (same line count as input).
    - No JSON wrapping, no markdown fences, no extra text of any kind.

Now generate the improved content following all rules above.`;

    const result = await generateAiContent(prompt);
    const improvedContent = JSON.parse(result || "[]");
    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "content improved successfully",
        data: {
          content: improvedContent,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log("error in creating improve content api", error);
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
