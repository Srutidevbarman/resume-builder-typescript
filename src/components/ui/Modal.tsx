"use client";

import { ReactNode } from "react";

interface Props {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute right-5 top-5 text-xl">
          ✕
        </button>

        {title && <h2 className="text-2xl font-bold mb-5">{title}</h2>}

        {children}
      </div>
    </div>
  );
}
