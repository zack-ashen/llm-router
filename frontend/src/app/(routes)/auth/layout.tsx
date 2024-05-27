"use client";
import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../../components/Inputs/Button/Button";
import { NavigationBar } from "../../components/NavigationBar/NavigationBar";

const AuthButtons = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row space-x-2">
      {pathname === "/auth/signin" && (
        <Link
          href="/auth/signup"
          className={buttonVariants({ variant: "secondary" })}
        >
          Sign Up
        </Link>
      )}
      {pathname === "/auth/signup" && (
        <Link
          href="/auth/signin"
          className={buttonVariants({ variant: "secondary" })}
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <NavigationBar
        leftElement={
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt={"logo"} width={18} height={18} />
          </Link>
        }
        rightElement={<AuthButtons />}
      />
      <div className="dot-grid-background -z-10 bg-grey-50" />
      <main className="flex flex-grow sm:items-center justify-center">
        {children}
      </main>
    </div>
  );
}
