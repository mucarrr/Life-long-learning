import { cn } from "@/lib/utils";

type SectionProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
};

export function Section({
  title,
  subtitle,
  className,
  children,
}: SectionProps) {
  return (
    <section className={cn("section-padding", className)}>
      <div className="container-narrow">
        {(title || subtitle) && (
          <header className="section-header text-center sm:text-left">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
