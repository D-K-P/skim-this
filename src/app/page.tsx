"use client";

import { useState, useEffect, Suspense } from "react";
import { useQueryState } from "nuqs";
import { UrlInput } from "@/components/url-input";
import { RsvpDisplay } from "@/components/rsvp-display";
import { PlaybackControls } from "@/components/playback-controls";
import { ProgressBar } from "@/components/progress-bar";
import { usePlayback } from "@/hooks/use-playback";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useFocus } from "@/contexts/focus-context";

type ArticleData = {
  title: string;
  words: string[];
};

function HomeContent() {
  const [urlParam, setUrlParam] = useQueryState("url");
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { setIsFocused } = useFocus();

  // Sync focus mode with playback
  useEffect(() => {
    setIsFocused(isPlaying);
  }, [isPlaying, setIsFocused]);
  const [wpm, setWpm] = useState(() => {
    if (typeof window === "undefined") return 300;
    try {
      const saved = localStorage.getItem("skim-wpm");
      return saved ? parseInt(saved, 10) : 300;
    } catch {
      return 300;
    }
  });

  // Persist WPM to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("skim-wpm", wpm.toString());
    } catch {
      // localStorage unavailable
    }
  }, [wpm]);

  usePlayback({
    words: article?.words || [],
    wordIndex,
    setWordIndex,
    wpm,
    isPlaying,
  });

  useKeyboardShortcuts({
    isPlaying,
    setIsPlaying,
    wpm,
    setWpm,
    wordIndex,
    setWordIndex,
    totalWords: article?.words.length || 0,
    enabled: !!article,
  });

  const handleExtracted = (data: ArticleData, url: string) => {
    setArticle(data);
    setWordIndex(0);
    setIsPlaying(false);
    setUrlParam(url);
  };

  // Stop at end
  const isAtEnd = article ? wordIndex >= article.words.length - 1 : false;
  useEffect(() => {
    if (isAtEnd && isPlaying) {
      setIsPlaying(false);
    }
  }, [isAtEnd, isPlaying]);

  return (
    <main className="h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-8 pt-14 gap-4 sm:gap-6 overflow-hidden">
      {!article ? (
        <>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">skim this</h1>
          <p className="text-muted-foreground pb-2 text-sm sm:text-base text-center px-4">
            Speed read any article using{" "}
            <a
              href="https://en.wikipedia.org/wiki/Rapid_serial_visual_presentation"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dashed underline-offset-4 hover:text-foreground transition-colors"
            >
              rapid serial visual presentation
            </a>
            .
          </p>
          <UrlInput
            onExtracted={handleExtracted}
            initialUrl={urlParam || ""}
            autoFetch={!!urlParam}
          />
        </>
      ) : (
        <>
          <RsvpDisplay
            word={article.words[wordIndex] || ""}
            title={article.title}
            url={urlParam || ""}
          />

          <ProgressBar
            wordIndex={wordIndex}
            totalWords={article.words.length}
            wpm={wpm}
            onScrub={setWordIndex}
          />

          <PlaybackControls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            wpm={wpm}
            setWpm={setWpm}
            wordIndex={wordIndex}
            setWordIndex={setWordIndex}
            totalWords={article.words.length}
          />

          {/* Keyboard shortcuts - hidden on mobile */}
          <div className={`hidden sm:flex flex-col items-center gap-4 pt-4 transition-opacity duration-1000 ${isPlaying ? "opacity-25" : "opacity-100"}`}>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700 font-mono text-[10px]">
                  Space
                </kbd>
                <span>play/pause</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-1 bg-zinc-200 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700 font-mono text-[10px]">
                  ←
                </kbd>
                <kbd className="px-1.5 py-1 bg-zinc-200 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700 font-mono text-[10px]">
                  →
                </kbd>
                <span>skip</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-1 bg-zinc-200 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700 font-mono text-[10px]">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-1 bg-zinc-200 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700 font-mono text-[10px]">
                  ↓
                </kbd>
                <span>speed</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-1 bg-zinc-200 dark:bg-zinc-800 rounded border border-zinc-300 dark:border-zinc-700 font-mono text-[10px]">
                  R
                </kbd>
                <span>restart</span>
              </span>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-8 pt-14 gap-6 overflow-hidden">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">skim this</h1>
          <p className="text-muted-foreground">Loading...</p>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
