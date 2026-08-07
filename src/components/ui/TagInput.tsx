"use client";

import { KeyboardEvent, useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInput({
  label,
  placeholder = "Type and press Enter...",
  value,
  onChange,
}: TagInputProps) {
  const [input, setInput] = useState("");

  function addTag(tag: string) {
    const trimmed = tag.trim();

    if (!trimmed) return;

    if (value.includes(trimmed)) {
      setInput("");
      return;
    }

    onChange([...value, trimmed]);
    setInput("");
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    }

    if (e.key === "Backspace" && input === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  }

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="input min-h-[52px] flex flex-wrap items-center gap-2 p-2">
        {value.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-full bg-violet-600/20 px-3 py-1 text-sm"
          >
            <span>{tag}</span>

            <button type="button" onClick={() => removeTag(index)}>
              <X size={14} />
            </button>
          </div>
        ))}

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-w-[120px] flex-1 bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
