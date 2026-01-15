"use client";

import { useEffect, useCallback } from "react";

type UseKeyboardShortcutsOptions = {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  wpm: number;
  setWpm: (wpm: number) => void;
  wordIndex: number;
  setWordIndex: (index: number) => void;
  totalWords: number;
  enabled: boolean;
};

export function useKeyboardShortcuts({
  isPlaying,
  setIsPlaying,
  wpm,
  setWpm,
  wordIndex,
  setWordIndex,
  totalWords,
  enabled,
}: UseKeyboardShortcutsOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // Ignore if in input field
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      switch (e.key) {
        case " ": // Space - toggle play/pause
          e.preventDefault();
          if (wordIndex < totalWords - 1) {
            setIsPlaying(!isPlaying);
          }
          break;

        case "ArrowLeft": // Skip back 10 words
          e.preventDefault();
          setWordIndex(Math.max(0, wordIndex - 10));
          break;

        case "ArrowRight": // Skip forward 10 words
          e.preventDefault();
          setWordIndex(Math.min(totalWords - 1, wordIndex + 10));
          break;

        case "ArrowUp": // Increase WPM
          e.preventDefault();
          setWpm(Math.min(1000, wpm + 50));
          break;

        case "ArrowDown": // Decrease WPM
          e.preventDefault();
          setWpm(Math.max(150, wpm - 50));
          break;

        case "r": // Restart
          e.preventDefault();
          setWordIndex(0);
          break;
      }
    },
    [enabled, isPlaying, setIsPlaying, wpm, setWpm, wordIndex, setWordIndex, totalWords]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
