import Link from "next/link";
import { Film, Ticket, User } from "lucide-react";

const itemClassName =
  "flex flex-1 flex-col items-center gap-0.5 rounded-full py-2 text-xs leading-4";

// Bottom navigation for phones. Tickets and Profile have no pages yet.
export function TabBar() {
  return (
    <nav className="fixed inset-x-4 bottom-4 rounded-full border border-primary bg-background p-1 shadow-[0_0_12px_rgba(0,0,0,0.14)] md:hidden">
      <div className="flex gap-1">
        <Link
          href="/"
          aria-current="page"
          className={`${itemClassName} bg-pink font-bold text-primary-foreground`}
        >
          <Film className="size-6" />
          Films
        </Link>
        <button type="button" className={`${itemClassName} font-semibold`}>
          <Ticket className="size-6" />
          Tickets
        </button>
        <button type="button" className={`${itemClassName} font-semibold`}>
          <User className="size-6" />
          Profile
        </button>
      </div>
    </nav>
  );
}
