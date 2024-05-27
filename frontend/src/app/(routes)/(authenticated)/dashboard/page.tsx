"use client";

import RouterCard from "@/app/components/Cards/RouterCard/RouterCard";
import CreateRouterDialog from "@/app/components/Dialogs/CreateRouterDialog/CreateRouterDialog";
import ProfileDropdown from "@/app/components/DropdownMenu/ProfileDropdown/ProfileDropdown";
import NoProjectsEmptyState from "@/app/components/EmptyStates/NoProjectsEmptyState/NoProjectsEmptyState";
import { NavigationBar } from "@/app/components/NavigationBar/NavigationBar";
import { Router } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRouters } from "./actions";

export default function DashboardPage() {
  const [routers, setRouters] = useState<Router[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRouters()
      .then((routers) => setRouters(routers))
      .then(() => setLoading(false));
  }, []);

  return (
    <>
      <NavigationBar
        leftElement={
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt={"logo"} width={18} height={18} />
          </Link>
        }
        rightElement={
          <div className="flex flex-row gap-8 items-center">
            <CreateRouterDialog />
            <ProfileDropdown />
          </div>
        }
      />
      <main
        className={"w-full h-full relative p-12 overflow-y-scroll"}
        style={{ maxHeight: "calc(100vh - 4rem)" }}
      >
        {routers.length > 0 ? (
          <>
            {routers.map((router) => (
              <RouterCard key={router.id} router={router} />
            ))}
          </>
        ) : (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <NoProjectsEmptyState />
          </div>
        )}
      </main>
    </>
  );
}
