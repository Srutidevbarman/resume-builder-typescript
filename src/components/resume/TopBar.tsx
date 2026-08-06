import Link from "next/link";

interface Props {
  saving: boolean;
}

export default function TopBar({ saving }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 p-5">
      <div>
        <Link href="/dashboard" className="text-sm text-violet-400">
          ← Dashboard
        </Link>

        <h1 className="mt-2 text-2xl font-bold">Resume Editor</h1>
      </div>

      <div>
        {saving ? (
          <span className="text-yellow-400">Saving...</span>
        ) : (
          <span className="text-green-400">Saved ✓</span>
        )}
      </div>
    </div>
  );
}
