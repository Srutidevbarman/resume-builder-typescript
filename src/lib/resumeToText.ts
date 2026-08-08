export function resumeToText(resume: any) {
  const personal = resume.personalInfo || {};

  const sections: string[] = [];

  // Personal Information
  sections.push(`
Name: ${personal.fullname || ""}
Email: ${personal.email || ""}
Mobile: ${personal.mobile || ""}
Location: ${personal.location || ""}
GitHub: ${personal.github || ""}
LinkedIn: ${personal.linkedIn || ""}
Portfolio: ${personal.portfolio || ""}
  `);

  // Summary
  if (resume.summery) {
    sections.push(`
PROFESSIONAL SUMMARY

${resume.summery}
    `);
  }

  // Experience
  if (resume.workExperience?.length) {
    sections.push(`
WORK EXPERIENCE
    `);

    resume.workExperience.forEach((experience: any) => {
      sections.push(`
${experience.position || ""}
${experience.company || ""}
${experience.startDate || ""} - ${experience.endDate || ""}

${experience.description || ""}
      `);
    });
  }

  // Projects
  if (resume.projects?.length) {
    sections.push(`
PROJECTS
    `);

    resume.projects.forEach((project: any) => {
      sections.push(`
${project.title || ""}

Technologies:
${project.techStack?.join(", ") || ""}

GitHub:
${project.githubUrl || ""}

Live:
${project.liveUrl || ""}

${project.description || ""}
      `);
    });
  }

  // Education
  if (resume.education?.length) {
    sections.push(`
EDUCATION
    `);

    resume.education.forEach((education: any) => {
      sections.push(`
${education.degree || ""}
${education.institution || ""}
${education.startDate || ""} - ${education.endDate || ""}

${education.description || ""}
      `);
    });
  }

  // Skills
  if (resume.skills?.length) {
    sections.push(`
SKILLS

${resume.skills.join(", ")}
    `);
  }

  // Certifications
  if (resume.certifications?.length) {
    sections.push(`
CERTIFICATIONS

${resume.certifications.join("\n")}
    `);
  }

  return sections.join("\n");
}
