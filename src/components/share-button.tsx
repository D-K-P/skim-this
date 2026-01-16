"use client";

import { Suspense, useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";

function ShareButtonInner() {
  const [urlParam] = useQueryState("url");
  const [copied, setCopied] = useState(false);

  // Only show when viewing an article
  if (!urlParam) return null;

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = "Skim this article";

    // Try native share on mobile
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard failed
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleShare}
      className="gap-1.5 text-xs"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Copied</span>
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Share this article</span>
        </>
      )}
    </Button>
  );
}

export function ShareButton() {
  return (
    <Suspense fallback={null}>
      <ShareButtonInner />
    </Suspense>
  );
}
