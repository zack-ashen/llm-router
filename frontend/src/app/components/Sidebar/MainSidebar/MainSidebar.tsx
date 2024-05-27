"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuCoins, LuKey, LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { TbRoute } from "react-icons/tb";
import { Button } from "../../Inputs/Button/Button";
import { SidebarLink } from "../Base/Sidebar";

export default function MainSidebar() {
  const pathname = usePathname();
  const basePath = pathname.split("/").slice(0, 3).join("/");
  const router = useRouter();
  return (
    <div className="w-64 min-w-64 h-screen border-grey-200 border-r flex flex-col bg-white">
      <div className="h-16 border-b border-grey-200 w-full flex items-center px-10 flex-row gap-8">
        <Link href={"/dashboard"}>
          <Image src={"/logo.svg"} alt={"logo"} width={18} height={18} />
        </Link>
      </div>
      <div className="mt-8 w-full flex flex-col px-8 grow justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <SidebarLink
              href={basePath + "/dashboard"}
              label="Dashboard"
              Icon={LuLayoutDashboard}
            />
            <SidebarLink
              href={basePath + "/api-keys"}
              label="API Keys"
              Icon={LuKey}
            />
            <SidebarLink
              href={basePath + "/chat"}
              label="Chat"
              Icon={TbRoute}
            />
            {/* <SidebarLink
              href={basePath + "/providers"}
              label="Providers"
              Icon={TbStars}
            /> */}
            <SidebarLink
              href={basePath + "/billing"}
              label="Billing"
              Icon={LuCoins}
            />
            <SidebarLink
              href={basePath + "/settings"}
              label="Settings"
              Icon={LuSettings}
            />
          </div>
        </div>
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex flex-col gap-2 bg-grey-50 border-blue-50 border inset-shadow-transparent rounded-md p-2">
            <div>
              <p className="text-grey-800 font-medium text-sm">
                Free Prompts Credit: 15
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => router.push(basePath + "/billing")}
            >
              Add credits
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
