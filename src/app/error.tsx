"use client";

import { useEffect } from "react";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">
        Bir şeyler yanlış gitti
      </h2>
      <p className="max-w-md text-sm text-[var(--foreground)]/70">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-[var(--navy)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Tekrar dene
      </button>
    </div>
  );
}
