"use client";

import { useEffect, useRef, useCallback } from "react";

type UsePlaybackOptions = {
  words: string[];
  wordIndex: number;
  setWordIndex: (index: number | ((prev: number) => number)) => void;
  wpm: number;
  isPlaying: boolean;
};

function hasPunctuation(word: string): boolean {
  return /[.,!?;:]$/.test(word);
}

export function usePlayback({ words, wordIndex, setWordIndex, wpm, isPlaying }: UsePlaybackOptions) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const advance = useCallback(() => {
    setWordIndex((prev) => {
      if (prev >= words.length - 1) {
        return prev;
      }
      return prev + 1;
    });
  }, [setWordIndex, words.length]);

  useEffect(() => {
    if (!isPlaying || words.length === 0) {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const baseDelay = 60000 / wpm;
    const currentWord = words[wordIndex] || "";
    const delay = hasPunctuation(currentWord) ? baseDelay * 1.5 : baseDelay;

    // Stop if we're at the end
    if (wordIndex >= words.length - 1) {
      return;
    }

    intervalRef.current = setTimeout(() => {
      advance();
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, wpm, wordIndex, words, advance]);

  return { advance };
}
