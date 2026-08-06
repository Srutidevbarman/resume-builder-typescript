"use client";

import { useEffect } from "react";

export default function useAutosave(
  callback: () => void,
  dependencies: any[],
  delay = 1500,
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timer);
  }, dependencies);
}
