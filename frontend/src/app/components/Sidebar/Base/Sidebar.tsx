"use client";

import { cn } from "@/app/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLink {
  label: string;
  href: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export function SidebarLink({ label, href, Icon }: SidebarLink) {
  const pathname = usePathname();

  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2  transition-all input-focus border border-white",
        isActive
          ? "bg-gradient-to-br from-blue-50 to-blue-150 text-blue-800 inset-shadow-transparent border border-blue-100"
          : "text-grey-700 hover:bg-blue-50"
      )}
    >
      {Icon && <Icon className="h-[1.125rem] w-[1.125rem] stroke-[1.75px]" />}
      <span className={cn("text-sm font-medium")}>{label}</span>
    </Link>
  );
}

export interface SidebarSectionProps {
  name?: string;
  items: SidebarItem[];
}

export function SidebarSection({ name, items }: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      {name && (
        <span className="mb-2 ml-2 text-xs font-medium uppercase text-grey-500">
          {name}
        </span>
      )}
      {items.map((item, idx) => (
        <SidebarLink
          key={idx}
          href={item.path}
          Icon={item.Icon}
          label={item.name}
        />
      ))}
    </div>
  );
}
