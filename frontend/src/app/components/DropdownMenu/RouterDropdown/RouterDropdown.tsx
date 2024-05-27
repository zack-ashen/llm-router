"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCircleDot, FaPlus } from "react-icons/fa6";
import { LuChevronsUpDown } from "react-icons/lu";
import { Dialog, DialogTrigger } from "../../Dialogs/Base/Dialog";
import { Button, buttonVariants } from "../../Inputs/Button/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../Base/DropdownMenu";

import { Router } from "@/types";
import { CreateRouterDialogContent } from "../../Dialogs/CreateRouterDialog/CreateRouterDialog";
import { getRouter, getRouters } from "./actions";

export default function RouterDropdown() {
  const pathname = usePathname();
  const [currentRouter, setCurrentRouter] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [routers, setRouters] = useState<Router[]>([]);

  useEffect(() => {
    const routerId = pathname?.split("/")[2];
    getRouter(routerId)
      .then((router: Router) => {
        if (!routerId) return undefined;
        setCurrentRouter(router.name);
        return router;
      })
      .then((newCurrentRouter: Router | undefined) => {
        getRouters().then((allRouters: Router[]) => {
          setRouters(allRouters);
        });
      });
  }, [pathname]);

  return currentRouter && routers ? (
    <Dialog>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button className={buttonVariants({ variant: "secondary" })}>
            {currentRouter}
            <LuChevronsUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" sideOffset={5}>
          <DialogTrigger asChild onClick={() => setDropdownOpen(false)}>
            <DropdownMenuItem className="font-medium flex flex-row gap-2">
              Create Router <FaPlus />
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          {routers.length === 0 ? (
            <DropdownMenuLabel className="text-center font-medium text-medium-grey">
              No Routers
            </DropdownMenuLabel>
          ) : (
            <>
              {routers.map((router) => (
                <DropdownMenuItem key={router.id}>
                  <Link
                    href={`/routers/${router.id}/dashboard`}
                    className="flex flex-row items-center gap-2"
                  >
                    {router.name === currentRouter ? (
                      <FaCircleDot className="w-2" />
                    ) : (
                      <></>
                    )}
                    {router.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateRouterDialogContent />
    </Dialog>
  ) : (
    <></>
  );
}
