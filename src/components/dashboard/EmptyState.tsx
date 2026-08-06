import Button from "../ui/Button";

interface Props {
  createResume: () => void;
}

export default function EmptyState({ createResume }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24">
      <div className="text-7xl">📄</div>

      <h2 className="mt-8 text-3xl font-bold">No resumes yet</h2>

      <p className="mt-3 text-gray-400">Create your first AI resume.</p>

      <Button onClick={createResume} className="mt-8">
        Create Resume
      </Button>
    </div>
  );
}
