"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { EditUrlModal } from "./edit-url-modal";
import { useFocus } from "@/contexts/focus-context";

type RsvpDisplayProps = {
  word: string;
  title: string;
  url: string;
};

function getOrpIndex(word: string): number {
  const len = word.length;
  if (len <= 1) return 0;
  if (len <= 5) return Math.floor(len * 0.35);
  if (len <= 9) return Math.floor(len * 0.35);
  return Math.floor(len * 0.3);
}

function formatUrl(url: string): string {
  return (
    url.replace(/^https?:\/\//, "").slice(0, 40) +
    (url.length > 48 ? "..." : "")
  );
}

export function RsvpDisplay({ word, title, url }: RsvpDisplayProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isFocused } = useFocus();
  const orpIndex = getOrpIndex(word);
  const before = word.slice(0, orpIndex);
  const pivot = word[orpIndex] || "";
  const after = word.slice(orpIndex + 1);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* URL row */}
      <div
        className={`flex items-center gap-1 pb-1 text-sm text-muted-foreground transition-opacity duration-1000 ${
          isFocused ? "opacity-25" : "opacity-100"
        }`}
      >
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="p-1 hover:text-foreground transition-colors"
          aria-label="Change article"
        >
          <Pencil className="h-3 w-3" />
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[200px] sm:max-w-xs truncate underline decoration-dotted decoration-muted-foreground/50 underline-offset-4 hover:text-foreground transition-colors"
        >
          {formatUrl(url)}
        </a>
      </div>

      {/* Title */}
      <p
        className={`text-zinc-900 dark:text-zinc-300 text-xs uppercase tracking-widest max-w-md text-center px-6 sm:px-4 transition-opacity duration-1000 ${
          isFocused ? "opacity-25" : "opacity-100"
        }`}
      >
        {title}
      </p>

      <EditUrlModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUrl={url}
      />

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
          <span className="text-zinc-900 dark:text-zinc-300 text-right">
            {before}
          </span>

          {/* Pivot - centered */}
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            {pivot}
          </span>

          {/* After - left-aligned */}
          <span className="text-zinc-900 dark:text-zinc-300 text-left">
            {after}
          </span>
        </div>
      </div>
    </div>
  );
}
