import Link from "next/link";

interface Props {
  saving: boolean;
  onOpenAts?: () => void;
}

export default function TopBar({ saving, onOpenAts }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 p-5">
      <div>
        <Link href="/dashboard" className="text-sm text-violet-400">
          ← Dashboard
        </Link>

        <h1 className="mt-2 text-2xl font-bold">Resume Editor</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenAts}
          className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20"
        >
          ✨ ATS Score
        </button>

        <div>
          {saving ? (
            <span className="text-yellow-400">Saving...</span>
          ) : (
            <span className="text-green-400">Saved ✓</span>
          )}
        </div>
      </div>
    </div>
  );
}
