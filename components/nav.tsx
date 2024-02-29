import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Space_Mono } from "next/font/google";
import { Wallet } from "@/components/ui/wallet";
import Image from "next/image";

export function Nav() {
  return (
    <div
      className="
      py-3 px-2
      md:px-8
      border-b flex items-center"
    >
      <div className="flex flex-1 items-center">
        <Link href="/">
          <Image
            src="/meroku-full-logo.png"
            alt="logo"
            height={48}
            width={144}
          />
        </Link>
      </div>
      <div className="flex flex-none items-center space-x-4">
        <ThemeToggle />
      </div>
      <div>
        <Wallet />
      </div>
    </div>
  );
}
