"use client";

import { ExternalLink } from "lucide-react";

type RsvpDisplayProps = {
  word: string;
  title: string;
  url: string;
  currentIndex: number;
  totalWords: number;
};

function getOrpIndex(word: string): number {
  const len = word.length;
  if (len <= 1) return 0;
  if (len <= 5) return Math.floor(len * 0.35);
  if (len <= 9) return Math.floor(len * 0.35);
  return Math.floor(len * 0.3);
}

export function RsvpDisplay({ word, title, url, currentIndex, totalWords }: RsvpDisplayProps) {
  const orpIndex = getOrpIndex(word);
  const before = word.slice(0, orpIndex);
  const pivot = word[orpIndex] || "";
  const after = word.slice(orpIndex + 1);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-300 text-xs uppercase tracking-widest max-w-md text-center px-6 sm:px-4 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
      >
        <ExternalLink className="h-3 w-3 flex-shrink-0" />
        {title}
      </a>

      {/* Fixed-position ORP display */}
      <div className="relative h-16 sm:h-24 w-full flex items-center justify-center overflow-hidden">
        {/* Focal point markers */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-1.5 sm:h-2 w-0.5 bg-emerald-500/50" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-1.5 sm:h-2 w-0.5 bg-emerald-500/50" />

        {/* Word display - using grid to anchor pivot at center */}
        <div
          className="grid font-light text-2xl sm:text-5xl md:text-6xl tracking-wide"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >
          {/* Before - right-aligned */}
          <span className="text-zinc-900 dark:text-zinc-300 text-right">{before}</span>

          {/* Pivot - centered */}
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{pivot}</span>

          {/* After - left-aligned */}
          <span className="text-zinc-900 dark:text-zinc-300 text-left">{after}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-zinc-900 dark:text-zinc-300">
        <span className="tabular-nums">{currentIndex + 1}</span>
        <div className="w-24 h-px bg-zinc-300 dark:bg-zinc-800">
          <div
            className="h-full bg-emerald-500/50 transition-all duration-75"
            style={{ width: `${((currentIndex + 1) / totalWords) * 100}%` }}
          />
        </div>
        <span className="tabular-nums">{totalWords}</span>
      </div>
    </div>
  );
}
