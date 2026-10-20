import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { cn } from "@/lib/utils";

type BookingBreadcrumbProps = {
  // Titles of the steps up to and including the current one.
  items: string[];
};

export function BookingBreadcrumb({ items }: BookingBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-h-9 flex-wrap items-center gap-2 px-2"
    >
      <Link href="/" aria-label="Home">
        <House className="size-4 text-muted-foreground" />
      </Link>
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;

        return (
          <Fragment key={item}>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            <span
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "text-sm leading-[21px] whitespace-nowrap",
                isCurrent ? "font-semibold" : "text-muted-foreground",
              )}
            >
              {item}
            </span>
          </Fragment>
        );
      })}
    </nav>
  );
}
