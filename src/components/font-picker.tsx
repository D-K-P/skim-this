"use client";

import { useState, useEffect } from "react";
import { Type } from "lucide-react";
import { Button } from "@/components/ui/button";

type FontOption = "sans" | "serif" | "mono";

const fontLabels: Record<FontOption, string> = {
  sans: "Sans",
  serif: "Serif",
  mono: "Mono",
};

const fontClasses: Record<FontOption, string> = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};

export function FontPicker() {
  const [font, setFont] = useState<FontOption>("sans");

  useEffect(() => {
    const saved = localStorage.getItem("skim-font") as FontOption | null;
    if (saved && fontClasses[saved]) {
      setFont(saved);
      applyFont(saved);
    }
  }, []);

  const applyFont = (newFont: FontOption) => {
    const body = document.body;
    // Remove all font classes
    Object.values(fontClasses).forEach((cls) => body.classList.remove(cls));
    // Add the new one
    body.classList.add(fontClasses[newFont]);
  };

  const cycle = () => {
    const options: FontOption[] = ["sans", "serif", "mono"];
    const currentIndex = options.indexOf(font);
    const nextIndex = (currentIndex + 1) % options.length;
    const newFont = options[nextIndex];

    setFont(newFont);
    applyFont(newFont);
    localStorage.setItem("skim-font", newFont);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycle}
      className="gap-1.5 text-xs"
      aria-label={`Current font: ${fontLabels[font]}. Click to change.`}
    >
      <Type className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{fontLabels[font]}</span>
    </Button>
  );
}
