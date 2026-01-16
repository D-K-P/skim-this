"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EditUrlModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentUrl: string;
};

export function EditUrlModal({ isOpen, onClose, currentUrl }: EditUrlModalProps) {
  const [url, setUrl] = useState(currentUrl);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      window.location.href = `/?url=${encodeURIComponent(url.trim())}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 w-full max-w-md mx-4 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Load different article</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste article URL..."
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Load
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
