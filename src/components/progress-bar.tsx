"use client";

import { useRef } from "react";
import { useFocus } from "@/contexts/focus-context";

type ProgressBarProps = {
  wordIndex: number;
  totalWords: number;
  wpm: number;
  onScrub: (index: number) => void;
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function ProgressBar({
  wordIndex,
  totalWords,
  wpm,
  onScrub,
}: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const { isFocused } = useFocus();

  const progress = totalWords > 0 ? (wordIndex / (totalWords - 1)) * 100 : 0;
  const wordsRemaining = totalWords - wordIndex - 1;
  const secondsRemaining = (wordsRemaining / wpm) * 60;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newIndex = Math.round(percentage * (totalWords - 1));

    onScrub(newIndex);
  };

  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-center gap-3 text-xs text-muted-foreground tabular-nums">
        <span className={`transition-opacity duration-1000 ${isFocused ? "opacity-25" : "opacity-100"}`}>{wordIndex + 1}</span>
        <div
          ref={barRef}
          onClick={handleClick}
          className="flex-1 h-0.5 bg-zinc-200 dark:bg-zinc-800 rounded-full cursor-pointer overflow-hidden"
          role="progressbar"
          aria-valuenow={wordIndex}
          aria-valuemin={0}
          aria-valuemax={totalWords - 1}
        >
          <div
            className="h-full bg-emerald-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={`transition-opacity duration-1000 ${isFocused ? "opacity-25" : "opacity-100"}`}>{totalWords}</span>
      </div>

      <p className={`text-xs text-muted-foreground text-center tabular-nums transition-opacity duration-1000 ${isFocused ? "opacity-25" : "opacity-100"}`}>
        {formatTime(secondsRemaining)} remaining
      </p>
    </div>
  );
}
