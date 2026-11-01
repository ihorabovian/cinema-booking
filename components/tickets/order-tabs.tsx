import Link from "next/link";
import type { OrderTab } from "@/lib/orders";
import { cn } from "@/lib/utils";

const labels: Record<OrderTab, string> = {
  active: "Active",
  history: "History",
};

// The tab lives in the URL, so it survives a reload and needs no client code.
export function OrderTabs({ current }: { current: OrderTab }) {
  return (
    <nav className="flex h-[50px] w-full items-center rounded-full bg-muted p-1 md:w-82">
      {(Object.keys(labels) as OrderTab[]).map((tab) => (
        <Link
          key={tab}
          href={tab === "active" ? "/tickets" : `/tickets?tab=${tab}`}
          aria-current={tab === current ? "page" : undefined}
          className={cn(
            "flex flex-1 justify-center rounded-full px-3 py-2 text-lg leading-6.5 font-bold",
            tab === current && "bg-background shadow-sm",
          )}
        >
          {labels[tab]}
        </Link>
      ))}
    </nav>
  );
}
