import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  description?: string;
  href?: string;
  image?: string;
  featured?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const cardClassName = (featured?: boolean, className?: string) =>
  cn("block text-left", featured ? "card-featured" : "card-base", className);

const CardContent = ({
  title,
  description,
  image,
  children,
}: Pick<CardProps, "title" | "description" | "image" | "children">) => (
  <>
    {image && (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-muted/10">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    )}
    <div className="p-4 sm:p-5">
      <h3 className="font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-foreground/80">{description}</p>
      )}
      {children}
    </div>
  </>
);

export function Card({
  title,
  description,
  href,
  image,
  featured,
  className,
  style,
  children,
}: CardProps) {
  const cls = cardClassName(featured, className);
  const content = (
    <CardContent title={title} description={description} image={image}>
      {children}
    </CardContent>
  );
  if (href) {
    return <Link href={href} className={cls} style={style}>{content}</Link>;
  }
  return <div className={cls} style={style}>{content}</div>;
}
