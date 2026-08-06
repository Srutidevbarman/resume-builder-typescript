import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: Props) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-sm font-medium text-white">{label}</label>
      )}

      <input {...props} className={clsx("input", className)} />

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}
