import { NextRequest, NextResponse } from "next/server";
import { generateAiContent } from "@/lib/gemini";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function stringArray(value: unknown, fallback: string[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === "string");
}

function parseAiJson(output: string) {
  const trimmed = output.trim();
  const withoutFence = trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(withoutFence);
  } catch {
    const firstBrace = withoutFence.indexOf("{");
    const lastBrace = withoutFence.lastIndexOf("}");

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error("No JSON object found in AI response");
    }

    return JSON.parse(withoutFence.slice(firstBrace, lastBrace + 1));
  }
}

function normalizePersonalInfo(
  value: unknown,
  fallback: Record<string, unknown> = {},
) {
  const source = isRecord(value) ? value : {};

  return {
    ...fallback,
    fullname: stringValue(source.fullname, stringValue(fallback.fullname)),
    email: stringValue(source.email, stringValue(fallback.email)),
    mobile: stringValue(source.mobile, stringValue(fallback.mobile)),
    address: stringValue(source.address, stringValue(fallback.address)),
    location: stringValue(source.location, stringValue(fallback.location)),
    github: stringValue(source.github, stringValue(fallback.github)),
    linkedIn: stringValue(source.linkedIn, stringValue(fallback.linkedIn)),
    portfolio: stringValue(source.portfolio, stringValue(fallback.portfolio)),
  };
}

function normalizeWorkExperience(value: unknown, fallback: unknown[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    const base = isRecord(fallback[index]) ? fallback[index] : {};

    return {
      ...base,
      company: stringValue(source.company, stringValue(base.company)),
      position: stringValue(source.position, stringValue(base.position)),
      startDate: stringValue(source.startDate, stringValue(base.startDate)),
      endDate: stringValue(source.endDate, stringValue(base.endDate)),
      description: stringValue(
        source.description,
        stringValue(base.description),
      ),
    };
  });
}

function normalizeProjects(value: unknown, fallback: unknown[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    const base = isRecord(fallback[index]) ? fallback[index] : {};

    return {
      ...base,
      title: stringValue(source.title, stringValue(base.title)),
      description: stringValue(
        source.description,
        stringValue(base.description),
      ),
      githubUrl: stringValue(source.githubUrl, stringValue(base.githubUrl)),
      liveUrl: stringValue(source.liveUrl, stringValue(base.liveUrl)),
      techStack: stringArray(
        source.techStack,
        stringArray(base.techStack),
      ),
    };
  });
}

function normalizeEducation(value: unknown, fallback: unknown[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    const base = isRecord(fallback[index]) ? fallback[index] : {};

    return {
      ...base,
      institution: stringValue(
        source.institution,
        stringValue(base.institution),
      ),
      degree: stringValue(source.degree, stringValue(base.degree)),
      startDate: stringValue(source.startDate, stringValue(base.startDate)),
      endDate: stringValue(source.endDate, stringValue(base.endDate)),
      description: stringValue(
        source.description,
        stringValue(base.description),
      ),
    };
  });
}

function normalizeResume(aiResume: unknown, originalResume: unknown) {
  const source = isRecord(aiResume) ? aiResume : {};
  const original = isRecord(originalResume) ? originalResume : {};

  return {
    ...original,
    title: stringValue(source.title, stringValue(original.title)),
    summery: stringValue(
      source.summery,
      stringValue(source.summary, stringValue(original.summery)),
    ),
    personalInfo: normalizePersonalInfo(
      source.personalInfo,
      isRecord(original.personalInfo) ? original.personalInfo : {},
    ),
    workExperience: normalizeWorkExperience(
      source.workExperience,
      Array.isArray(original.workExperience) ? original.workExperience : [],
    ),
    projects: normalizeProjects(
      source.projects,
      Array.isArray(original.projects) ? original.projects : [],
    ),
    education: normalizeEducation(
      source.education,
      Array.isArray(original.education) ? original.education : [],
    ),
    skills: stringArray(
      source.skills,
      stringArray(original.skills),
    ),
    certifications: stringArray(
      source.certifications,
      stringArray(original.certifications),
    ),
  };
}

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
      const parsedOutput = parseAiJson(output as string);
      const parsedResume =
        isRecord(parsedOutput) && isRecord(parsedOutput.resume)
          ? parsedOutput.resume
          : parsedOutput;

      improvedResume = normalizeResume(parsedResume, resume);
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
