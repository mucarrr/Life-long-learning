"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import type { Content } from "@/lib/content";

type ResourceItem =
  | Content["resources"]["presentations"][number]
  | Content["resources"]["articles"][number];
type ResourcesContent = Content["resources"];

function getFileType(url: string): "pptx" | "docx" | "pdf" {
  const lower = url.toLowerCase();
  if (lower.endsWith(".pdf")) return "pdf";
  if (lower.endsWith(".docx")) return "docx";
  return "pptx";
}

function FileIcon({ type, className }: { type: "pptx" | "docx" | "pdf"; className?: string }) {
  const styles = {
    pptx: "bg-amber-400 text-amber-950",
    docx: "bg-blue-600 text-white",
    pdf: "bg-red-600 text-white",
  };
  const label = type === "pdf" ? "PDF" : type === "docx" ? "W" : "P";
  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded text-xs font-bold",
        styles[type],
        className
      )}
    >
      {label}
    </span>
  );
}

function PreviewFrame({
  item,
  fullUrl,
}: {
  item: ResourceItem;
  fullUrl: string;
}) {
  const type = getFileType(item.url);
  if (type === "pdf") {
    return (
      <iframe
        src={item.url}
        title={item.title}
        className="h-[70vh] w-full rounded border border-border bg-white"
      />
    );
  }
  // Microsoft Office Online Viewer: PPTX/DOCX önizleme (public URL gerekir; localhost’ta çalışmaz)
  const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fullUrl)}`;
  return (
    <iframe
      src={officeViewerUrl}
      title={item.title}
      className="h-[70vh] w-full rounded border border-border bg-white"
    />
  );
}

export function ResourceCards({
  r,
  items,
  gridCols = "lg:grid-cols-4",
}: {
  r: ResourcesContent;
  items: readonly ResourceItem[];
  gridCols?: string;
}) {
  const [preview, setPreview] = useState<ResourceItem | null>(null);
  const hasPreviewImage = (item: ResourceItem) =>
    item.previewImage != null && String(item.previewImage).trim() !== "";

  const openPreview = useCallback((item: ResourceItem, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-download-only]")) return;
    setPreview(item);
  }, []);

  const closePreview = useCallback(() => setPreview(null), []);

  const fullUrl =
    typeof window !== "undefined" && preview
      ? window.location.origin + preview.url
      : "";

  return (
    <>
      <ul className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4", gridCols)}>
        {items.map((item, i) => {
          const type = getFileType(item.url);
          const showPreviewImage = hasPreviewImage(item);
          return (
            <li key={i}>
              <div
                role="button"
                tabIndex={0}
                onClick={(e) => openPreview(item, e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPreview(item, e as unknown as React.MouseEvent);
                  }
                }}
                className="card-base block overflow-hidden p-0 transition-shadow hover:shadow-md cursor-pointer text-left"
              >
                <div className="flex items-start gap-2 p-3 pb-2">
                  <FileIcon type={type} />
                  <div className="min-w-0 flex-1 flex items-start justify-between gap-2">
                    <span className="font-semibold text-navy text-sm leading-tight line-clamp-2">
                      {item.title}
                    </span>
                    <a
                      href={item.url}
                      download
                      data-download-only
                      onClick={(e) => e.stopPropagation()}
                      className="shrink-0 rounded p-1 text-foreground/50 hover:bg-foreground/10 hover:text-foreground"
                      aria-label={r.downloadLabel}
                      title={r.downloadLabel}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="relative aspect-[16/10] w-full bg-navy-muted/10">
                  {showPreviewImage ? (
                    <Image
                      src={item.previewImage as string}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileIcon type={type} className="h-12 w-12 opacity-60" />
                      <span className="sr-only">{r.presentationPreview}</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {preview && (
        <Modal open={!!preview} onClose={closePreview} title={preview.title} className="max-w-4xl">
          <div className="space-y-4">
            <PreviewFrame item={preview} fullUrl={fullUrl} />
            <div className="flex justify-end">
              <a
                href={preview.url}
                download
                className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-light"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {r.downloadLabel}
              </a>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
