"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./components/Inputs/Button/Button";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";

export default function Home() {
  return (
    <>
      <NavigationBar
        leftElement={
          <Link href={"/"}>
            <Image src={"logo.svg"} alt={"logo"} width={18} height={18} />
          </Link>
        }
        rightElement={
          <div className="flex flex-row gap-3 sm:gap-8 items-center">
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/auth/signin"
            >
              Sign In
            </Link>
            <Link
              className={buttonVariants({ variant: "primary" })}
              href="/auth/signup"
            >
              Get Started
            </Link>
          </div>
        }
      />
    </>
  );
}
