"use client";

import { Logo } from "@/components/logo";
import { ShareButton } from "@/components/share-button";
import { FontPicker } from "@/components/font-picker";
import { ThemeToggle } from "@/components/theme-toggle";
import { useFocus } from "@/contexts/focus-context";

export function Header() {
  const { isFocused } = useFocus();

  return (
    <header
      className={`absolute top-4 left-4 right-4 flex items-center justify-between transition-opacity duration-1000 ${
        isFocused ? "opacity-25 pointer-events-none" : "opacity-100"
      }`}
    >
      <Logo />
      <div className="flex items-center gap-2">
        <ShareButton />
        <FontPicker />
        <ThemeToggle />
      </div>
    </header>
  );
}
