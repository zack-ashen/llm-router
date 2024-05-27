"use client";

import ProfileDropdown from "@/app/components/DropdownMenu/ProfileDropdown/ProfileDropdown";
import RouterDropdown from "@/app/components/DropdownMenu/RouterDropdown/RouterDropdown";
import { NavigationBar } from "@/app/components/NavigationBar/NavigationBar";
import NotificationPopover from "@/app/components/Popover/NotificationPopover/NotificationPopover";
import MainSidebar from "@/app/components/Sidebar/MainSidebar/MainSidebar";

export default function ProjectsLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-row w-full">
      <MainSidebar />
      <div className="flex flex-col w-full grow">
        <NavigationBar
          leftElement={<RouterDropdown />}
          rightElement={
            <div className="flex flex-row gap-8 items-center">
              <NotificationPopover />
              <ProfileDropdown />
            </div>
          }
        />
        <main
          className={"w-full h-full relative p-12 overflow-y-scroll"}
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
