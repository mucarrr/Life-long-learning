"use client";

import { useEffect } from "react";

export default function Error({
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
    <div className="section-padding flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="font-semibold text-navy">Bir şeyler yanlış gitti</h2>
      <p className="max-w-md text-sm text-foreground/70">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
      >
        Tekrar dene
      </button>
    </div>
  );
}
