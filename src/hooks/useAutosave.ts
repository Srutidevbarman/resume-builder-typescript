"use client";

import { useEffect } from "react";

export default function useAutosave(
  callback: () => void,
  dependencies: any[],
  delay = 1500,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;

    if (typeof delay !== "number" || delay <= 0) return;

    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timer);
    // include delay and enabled so effect re-runs when they change
  }, [...dependencies, delay, enabled]);
}
