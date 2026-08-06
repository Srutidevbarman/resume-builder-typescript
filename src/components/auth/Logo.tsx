import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,.35)]">
        <Sparkles size={36} className="text-white" />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Resume<span className="text-violet-400">AI</span>
        </h1>

        <p className="text-gray-400 mt-1">AI Powered Resume Builder</p>
      </div>
    </div>
  );
}
