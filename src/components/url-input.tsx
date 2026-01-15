"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ArticleData = {
  title: string;
  words: string[];
};

type UrlInputProps = {
  onExtracted: (data: ArticleData, url: string) => void;
  initialUrl?: string;
  autoFetch?: boolean;
};

export function UrlInput({ onExtracted, initialUrl = "", autoFetch = false }: UrlInputProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticle = useCallback(async (targetUrl: string) => {
    setError(null);

    // Basic validation
    if (!targetUrl.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      setError("URL must start with http:// or https://");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || "Failed to extract article");
        return;
      }

      // Split content into words
      const words = data.content.split(/\s+/).filter((w: string) => w.length > 0);

      // Check for very short articles
      if (words.length < 10) {
        setError("Article too short (less than 10 words)");
        return;
      }

      onExtracted({
        title: data.title,
        words,
      }, targetUrl);
    } catch {
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  }, [onExtracted]);

  // Auto-fetch once on mount if initialUrl provided
  const hasAutoFetchedRef = useRef(false);
  useEffect(() => {
    if (autoFetch && initialUrl && !hasAutoFetchedRef.current) {
      hasAutoFetchedRef.current = true;
      fetchArticle(initialUrl);
    }
  }, [autoFetch, initialUrl, fetchArticle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticle(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md sm:max-w-xl space-y-4 px-2 sm:px-0">
      <div className="flex gap-2">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste article URL..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Load"}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
