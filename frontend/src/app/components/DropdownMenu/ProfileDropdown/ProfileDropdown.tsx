"use client";

import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../Base/DropdownMenu";

const ProfileIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="28" height="28" rx="8" fill="url(#paint0_linear_99_365)" />
    <defs>
      <linearGradient
        id="paint0_linear_99_365"
        x1="14"
        y1="0"
        x2="14"
        y2="28"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#343045" />
        <stop offset="1" stopColor="#343045" stopOpacity="0.33" />
      </linearGradient>
    </defs>
  </svg>
);

export default function ProfileDropdown() {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut(() => router.push("/"))}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
