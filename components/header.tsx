import icon from "@/app/icon.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { LogOut, Ticket, User } from "lucide-react";

export function Header() {
  return (
    <header>
      <div className="container mx-auto px-[120px] py-[64px]">
        <div className="flex justify-between border border-primary rounded-full p-[12px] bg-background shadow-[0_0_12px_rgba(0,0,0,0.14)]">
          <div className="flex items-center gap-1">
            <Image src={icon} alt="icon" width={24} height={24} />
            <span className="text-base leading-6 font-extrabold">CINEMA</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex size-8 items-center justify-center rounded-full bg-secondary cursor-pointer hover:bg-gray-200 ">
              <Ticket size={20} />
            </button>
            <button className="flex size-8 items-center justify-center rounded-full bg-secondary cursor-pointer hover:bg-gray-200">
              <User size={20} />
            </button>
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
