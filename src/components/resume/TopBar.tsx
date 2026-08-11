import Link from "next/link";
import { ChangeEvent } from "react";

interface Props {
  saving: boolean;
  onOpenAts?: () => void;
  autosaveEnabled?: boolean;
  setAutosaveEnabled?: (v: boolean) => void;
  autosaveDelay?: number;
  setAutosaveDelay?: (v: number) => void;
  onManualSave?: () => void;
}

export default function TopBar({
  saving,
  onOpenAts,
  autosaveEnabled = true,
  setAutosaveEnabled,
  autosaveDelay = 60_000,
  setAutosaveDelay,
  onManualSave,
}: Props) {
  function handleDelayChange(e: ChangeEvent<HTMLSelectElement>) {
    const v = Number(e.target.value);
    setAutosaveDelay?.(v);
  }

  return (
    <div className="flex items-center justify-between border-b border-white/10 p-5">
      <div>
        <Link href="/dashboard" className="text-sm text-violet-400">
          ← Dashboard
        </Link>

        <h1 className="mt-2 text-2xl font-bold">Resume Editor</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenAts}
          className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20"
        >
          ✨ ATS Score
        </button>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autosaveEnabled}
              onChange={(e) => setAutosaveEnabled?.(e.target.checked)}
            />
            <span className="text-sm text-gray-300">Autosave</span>
          </label>

          <select
            value={autosaveDelay}
            onChange={handleDelayChange}
            className="rounded-lg bg-white/5 px-3 py-1 text-sm text-gray-200"
          >
            <option value={0}>Off</option>
            <option value={30000}>30s</option>
            <option value={60000}>1m</option>
            <option value={120000}>2m</option>
            <option value={150000}>2.5m</option>
            <option value={300000}>5m</option>
          </select>

          <button
            type="button"
            onClick={onManualSave}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Save
          </button>
        </div>

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
