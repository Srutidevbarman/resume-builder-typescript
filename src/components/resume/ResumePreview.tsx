interface Props {
  resume: any;
}

function formatResumeDate(date?: string) {
  if (!date) return "";

  const [year, month] = date.split("-");

  if (!year || !month) {
    return date;
  }

  const parsed = new Date(Number(year), Number(month) - 1);

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}
export default function ResumePreview({ resume }: Props) {
  const personal = resume.personalInfo || {};

  return (
    <div className="resume-preview-wrapper print-resume">
      <article className="resume-preview">
        {/* ================= HEADER ================= */}

        <header className="resume-header">
          <h1>{personal.fullname || "Your Name"}</h1>

          {resume.title && <p className="resume-role">{resume.title}</p>}

          <div className="resume-contact">
            {personal.email && <span>{personal.email}</span>}

            {personal.mobile && <span>{personal.mobile}</span>}

            {personal.location && <span>{personal.location}</span>}
          </div>

          <div className="resume-links">
            {personal.github && (
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            )}

            {personal.linkedIn && (
              <a
                href={personal.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            )}

            {personal.portfolio && (
              <a
                href={personal.portfolio}
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            )}
          </div>
        </header>

        {/* ================= SUMMARY ================= */}

        {resume.summery && (
          <ResumeSection title="Professional Summary">
            <p className="resume-paragraph">{resume.summery}</p>
          </ResumeSection>
        )}

        {/* ================= EXPERIENCE ================= */}

        {resume.workExperience?.length > 0 && (
          <ResumeSection title="Work Experience">
            <div className="resume-list">
              {resume.workExperience.map((experience: any, index: number) => (
                <div key={experience._id || index} className="resume-entry">
                  <div className="resume-entry-header">
                    <div>
                      <h3>{experience.position || "Position"}</h3>

                      <p className="resume-company">
                        company - {experience.company}
                      </p>
                    </div>

                    <span className="resume-date">
                      {formatResumeDate(experience.startDate)}

                      {experience.endDate
                        ? ` – ${formatResumeDate(experience.endDate)}`
                        : ""}
                    </span>
                  </div>

                  {experience.description && (
                    <p className="resume-description">
                      {experience.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* ================= PROJECTS ================= */}

        {resume.projects?.length > 0 && (
          <ResumeSection title="Projects">
            <div className="resume-list">
              {resume.projects.map((project: any, index: number) => (
                <div key={project._id || index} className="resume-entry">
                  <div className="resume-entry-header">
                    <h3>{project.title || "Project"}</h3>

                    <div className="resume-project-links">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live
                        </a>
                      )}
                    </div>
                  </div>

                  {project.techStack?.length > 0 && (
                    <p className="resume-tech">
                      {project.techStack.join(" • ")}
                    </p>
                  )}

                  {project.description && (
                    <p className="resume-description">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* ================= EDUCATION ================= */}

        {resume.education?.length > 0 && (
          <ResumeSection title="Education">
            <div className="resume-list">
              {resume.education.map((education: any, index: number) => (
                <div key={education._id || index} className="resume-entry">
                  <div className="resume-entry-header">
                    <div>
                      <h3>{education.degree || "Degree"}</h3>

                      <p className="resume-company">{education.institution}</p>
                    </div>

                    <span className="resume-date">
                      {formatResumeDate(education.startDate)}

                      {education.endDate
                        ? ` – ${formatResumeDate(education.endDate)}`
                        : ""}
                    </span>
                  </div>

                  {education.description && (
                    <p className="resume-description">
                      {education.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* ================= SKILLS ================= */}

        {resume.skills?.length > 0 && (
          <ResumeSection title="Skills">
            <div className="resume-skills">
              {resume.skills.map((skill: string, index: number) => (
                <span key={`${skill}-${index}`} className="resume-skill">
                  {skill}
                </span>
              ))}
            </div>
          </ResumeSection>
        )}

        {/* ================= CERTIFICATIONS ================= */}

        {resume.certifications?.length > 0 && (
          <ResumeSection title="Certifications">
            <ul
              className="resume-certifications"
              style={{
                listStyleType: "disc",
              }}
            >
              {resume.certifications.map(
                (certification: string, index: number) => (
                  <li key={`${certification}-${index}`}>{certification}</li>
                ),
              )}
            </ul>
          </ResumeSection>
        )}
      </article>
    </div>
  );
}

/* ================================================= */
/* SECTION COMPONENT                                 */
/* ================================================= */

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">{title}</h2>

      {children}
    </section>
  );
}
