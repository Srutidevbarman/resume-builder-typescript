interface Props {
  resume: any;
}

export default function ResumePreview({ resume }: Props) {
  return (
    <div className="resume-preview h-full overflow-y-auto rounded-xl bg-white p-8 text-black">
      <h1 className="text-4xl font-bold">
        {resume?.personalInfo?.fullname || "Your Name"}
      </h1>

      <p className="mt-2 text-gray-600">{resume?.personalInfo?.email}</p>

      <hr className="my-6" />

      <h2 className="mb-3 text-xl font-bold">Summary</h2>

      <p>{resume?.summery || "Professional summary will appear here."}</p>
    </div>
  );
}
