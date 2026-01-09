import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "ghost";

type Props = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: Variant;
};

export default function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-xs font-medium " +
    "uppercase tracking-[0.22em] transition-colors " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0015] " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0C]";

  const styles =
    variant === "primary"
      ? "bg-[#8B0015] text-[#F3F2EE] hover:bg-[#B3001F]"
      : "bg-transparent text-[#F3F2EE] ring-1 ring-white/15 hover:bg-white/5";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
