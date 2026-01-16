"use client";

import { useFocus } from "@/contexts/focus-context";

export function Footer() {
  const { isFocused } = useFocus();

  return (
    <footer
      className={`absolute bottom-3 left-0 right-0 text-center text-[10px] text-muted-foreground transition-opacity duration-1000 ${
        isFocused ? "opacity-0 pointer-events-none" : "opacity-50"
      }`}
    >
      For personal use only. Vibed by{" "}
      <a
        href="https://github.com/D-K-P"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-dotted decoration-muted-foreground/50 underline-offset-4 hover:text-foreground transition-colors"
      >
        d-k-p
      </a>{" "}
      with{" "}
      <a
        href="https://claude.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-dotted decoration-muted-foreground/50 underline-offset-4 hover:text-foreground transition-colors"
      >
        Claude
      </a>
      .
    </footer>
  );
}
