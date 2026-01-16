"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Play,
  Pause,
} from "lucide-react";
import { useFocus } from "@/contexts/focus-context";

type PlaybackControlsProps = {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  wpm: number;
  setWpm: (wpm: number) => void;
  wordIndex: number;
  setWordIndex: (index: number) => void;
  totalWords: number;
};

export function PlaybackControls({
  isPlaying,
  setIsPlaying,
  wpm,
  setWpm,
  wordIndex,
  setWordIndex,
  totalWords,
}: PlaybackControlsProps) {
  const { isFocused } = useFocus();
  const isAtEnd = wordIndex >= totalWords - 1;
  const isAtStart = wordIndex === 0;

  const skipBack = () => {
    setWordIndex(Math.max(0, wordIndex - 10));
  };

  const skipForward = () => {
    setWordIndex(Math.min(totalWords - 1, wordIndex + 10));
  };

  const decreaseWpm = () => {
    setWpm(Math.max(150, wpm - 50));
  };

  const increaseWpm = () => {
    setWpm(Math.min(1000, wpm + 50));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Playback controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={skipBack}
          disabled={isAtStart}
          aria-label="Skip back 10 words"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={isAtEnd && !isPlaying}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={skipForward}
          disabled={isAtEnd}
          aria-label="Skip forward 10 words"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* WPM controls */}
      <div className={`flex items-center gap-2 transition-opacity duration-1000 ${isFocused ? "opacity-25" : "opacity-100"}`}>
        <Button
          variant="ghost"
          size="icon"
          onClick={decreaseWpm}
          disabled={wpm <= 150}
          aria-label="Decrease speed"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span className="text-sm text-muted-foreground tabular-nums w-20 text-center">
          {wpm} WPM
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={increaseWpm}
          disabled={wpm >= 1000}
          aria-label="Increase speed"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
