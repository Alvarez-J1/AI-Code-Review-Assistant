"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = Readonly<{
  href: "/" | "/reviews";
  label: string;
}>;

const navItems = [
  { href: "/", label: "New Review" },
  { href: "/reviews", label: "Recent Reviews" }
] as const satisfies readonly NavItem[];

export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="flex gap-2">
      {navItems.map((item) => {
        const isCurrent = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

        return (
          <Link
            aria-current={isCurrent ? "page" : undefined}
            className="rounded-md border border-line bg-white px-3 py-2 text-sm font-medium text-ink transition hover:border-brand hover:text-brand"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
