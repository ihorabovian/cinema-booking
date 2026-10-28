import { Suspense } from "react";
import icon from "@/app/icon.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignOutButton } from "./sign-out-button";
import { LogIn, LogOut, Ticket, User } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

const iconLinkClassName = "rounded-full";
const pillClassName = "ml-2 h-10 gap-2 rounded-full px-6";

export function Header() {
  return (
    <header className="hidden md:block">
      <div className="mx-auto max-w-page px-[120px] pt-[64px]">
        <div className="flex justify-between border border-primary rounded-full p-[12px] bg-background shadow-[0_0_12px_rgba(0,0,0,0.14)]">
          <Link href="/" className="flex items-center gap-1">
            <Image src={icon} alt="logo" width={24} height={24} />
            <span className="text-base leading-6 font-extrabold">CINEMA</span>
          </Link>
          {/* The session is read per request, so only this part waits for it. */}
          <Suspense>
            <HeaderActions />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

// Tickets and Profile show for guests too: those pages send them to sign in first.
async function HeaderActions() {
  const session = await getCurrentUser();

  return (
    <div className="flex items-center gap-4">
      <Button
        asChild
        variant="secondary"
        size="icon"
        className={iconLinkClassName}
      >
        <Link href="/tickets" aria-label="My tickets">
          <Ticket className="size-5" />
        </Link>
      </Button>
      <Button
        asChild
        variant="secondary"
        size="icon"
        className={iconLinkClassName}
      >
        <Link href="/profile" aria-label="Profile">
          <User className="size-5" />
        </Link>
      </Button>
      {session ? (
        <SignOutButton>
          <Button className={pillClassName}>
            Sign out
            <LogOut size={16} />
          </Button>
        </SignOutButton>
      ) : (
        <Button asChild className={pillClassName}>
          <Link href="/signin">
            Sign in
            <LogIn size={16} />
          </Link>
        </Button>
      )}
    </div>
  );
}
