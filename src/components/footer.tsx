"use client";

import { useFocus } from "@/contexts/focus-context";

export function Footer() {
  const { isFocused } = useFocus();

  return (
    <footer
      className={`absolute bottom-3 left-0 right-0 text-center text-[10px] text-muted-foreground transition-opacity duration-1000 ${
        isFocused ? "opacity-25 pointer-events-none" : "opacity-100"
      }`}
    >
      For personal use only. Made by{" "}
      <a
        href="https://github.com/D-K-P"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-foreground transition-colors"
      >
        d-k-p
      </a>
    </footer>
  );
}
