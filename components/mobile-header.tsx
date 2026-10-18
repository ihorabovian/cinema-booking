import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type MobileHeaderProps = {
  title: string;
  backHref?: string;
};

// On phones the desktop header is hidden and each screen shows its own title instead.
export function MobileHeader({ title, backHref }: MobileHeaderProps) {
  return (
    <div className="flex h-14 items-center gap-4 px-4 md:hidden">
      {backHref && (
        <Link href={backHref} aria-label="Back">
          <ChevronLeft className="size-6" />
        </Link>
      )}
      <p className="text-2xl leading-8 font-bold">{title}</p>
    </div>
  );
}
