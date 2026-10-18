import icon from "@/app/icon.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut, Ticket, User } from "lucide-react";

export function Header() {
  return (
    <header className="hidden md:block">
      <div className="mx-auto max-w-page px-[120px] pt-[64px]">
        <div className="flex justify-between border border-primary rounded-full p-[12px] bg-background shadow-[0_0_12px_rgba(0,0,0,0.14)]">
          <Link href="/" className="flex items-center gap-1">
            <Image src={icon} alt="" width={24} height={24} />
            <span className="text-base leading-6 font-extrabold">CINEMA</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              size="icon"
              aria-label="My tickets"
              className="rounded-full"
            >
              <Ticket className="size-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Profile"
              className="rounded-full"
            >
              <User className="size-5" />
            </Button>
            <Button className="ml-2 h-10 gap-2 rounded-full px-6">
              Sign out
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
