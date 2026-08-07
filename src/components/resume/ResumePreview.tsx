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
      </p>
    </div>
  );
}
