import { FaRegBell } from "react-icons/fa6";
import { Button } from "../../Inputs/Button/Button";
import { Popover, PopoverContent, PopoverTrigger } from "../Base/Popover";

export default function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="tertiary" size={"icon"}>
          <FaRegBell color="#586474" path="1.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-96">
        <div className="w-full border-b border-grey-200 pb-2">
          <p className="font-medium text-dark-grey">Notifications</p>
        </div>
        <p className="text-grey-600 mx-auto w-full mt-4 text-sm text-center">
          No new notifications
        </p>
      </PopoverContent>
    </Popover>
  );
}
