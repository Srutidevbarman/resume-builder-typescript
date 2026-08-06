"use client";

import Link from "next/link";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface Props {
  resume: {
    _id: string;
    title: string;
    updatedAt: string;
  };
}

export default function ResumeCard({ resume }: Props) {
  return (
    <Card className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">
          {resume.title || "Untitled Resume"}
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Last Updated {new Date(resume.updatedAt).toLocaleDateString()}
        </p>
      </div>

      <Link href={`/resume/${resume._id}`}>
        <Button className="w-full">Edit Resume</Button>
      </Link>
    </Card>
  );
}
