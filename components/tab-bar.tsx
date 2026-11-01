"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Ticket, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Films", icon: Film },
  { href: "/tickets", label: "Tickets", icon: Ticket },
  { href: "/profile", label: "Profile", icon: User },
];

// Bottom navigation for phones.
export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-4 bottom-4 rounded-full border border-primary bg-background p-1 shadow-[0_0_12px_rgba(0,0,0,0.14)] md:hidden">
      <div className="flex gap-1">
        {tabs.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-xs leading-4",
                isActive ? "bg-pink font-bold text-primary-foreground" : "font-semibold",
              )}
            >
              <Icon className="size-6" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
