interface Props {
  resume: any;
}

export default function ResumePreview({ resume }: Props) {
  const p = resume.personalInfo;

  return (
    <div className="resume-preview mx-auto max-w-[794px] rounded-lg bg-white p-10 text-black shadow-xl">
      <h1 className="text-4xl font-bold">{p.fullname || "Your Name"}</h1>

      <p className="mt-2 text-gray-600">
        {[p.email, p.mobile, p.location].filter(Boolean).join(" • ")}
      </p>

      <div className="mt-2 text-sm text-blue-700 flex gap-4 flex-wrap">
        {p.github && <span>{p.github}</span>}

        {p.linkedIn && <span>{p.linkedIn}</span>}

        {p.portfolio && <span>{p.portfolio}</span>}
      </div>

      <hr className="my-8" />

      <h2 className="mb-3 text-xl font-bold">Professional Summary</h2>

      <p className="leading-7 whitespace-pre-wrap">
        {resume.summery ||
          "Your AI generated professional summary will appear here."}
        {resume.workExperience.length > 0 && (
          <>
            <hr className="my-8" />

            <h2 className="mb-5 text-xl font-bold">Work Experience</h2>

            <div className="space-y-6">
              {resume.workExperience.map((experience: any, index: number) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">
                      {experience.position}
                    </h3>

                    <span className="text-sm text-gray-500">
                      {experience.startDate}
                      {" - "}
                      {experience.endDate}
                    </span>
                  </div>

                  <p className="text-gray-700">{experience.company}</p>

                  <p className="mt-3 whitespace-pre-wrap leading-7">
                    {experience.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        {resume.projects.length > 0 && (
          <>
            <hr className="my-8" />

            <h2 className="mb-5 text-xl font-bold">Projects</h2>

            <div className="space-y-6">
              {resume.projects.map((project: any, index: number) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{project.title}</h3>

                    <div className="flex gap-4 text-sm text-blue-700">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank">
                          GitHub
                        </a>
                      )}

                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank">
                          Live
                        </a>
                      )}
                    </div>
                  </div>

                  {project.techStack.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>Stack:</strong>
                      {project.techStack.join(",")}
                    </p>
                  )}

                  <p className="mt-3 whitespace-pre-wrap leading-7">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
        {resume.education.length > 0 && (
          <>
            <hr className="my-8" />

            <h2 className="mb-5 text-xl font-bold">Education</h2>

            <div className="space-y-6">
              {resume.education.map((edu: any, index: number) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{edu.degree}</h3>

                    <span className="text-sm text-gray-500">
                      {edu.startDate}
                      {" - "}
                      {edu.endDate}
                    </span>
                  </div>

                  <p className="text-gray-700">{edu.institution}</p>

                  <p className="mt-3 whitespace-pre-wrap">{edu.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </p>
    </div>
  );
}
