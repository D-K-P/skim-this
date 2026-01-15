"use client";

export function Logo() {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleClick}
      className="text-lg font-semibold tracking-tight hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
    >
      skim this
    </button>
  );
}
