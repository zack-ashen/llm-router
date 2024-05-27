import PlusIcon from "@/assets/PlusIcon";
import { FaPlus } from "react-icons/fa6";
import CreateRouterForm from "../../Forms/CreateRouterForm/CreateRouterForm";
import { Button } from "../../Inputs/Button/Button";
import { Dialog, DialogContent, DialogTrigger } from "../Base/Dialog";

export const CreateRouterDialogContent = () => {
  return (
    <DialogContent className="w-[48rem]">
      <div>
        <PlusIcon />
      </div>
      <div className="mt-1 font-semibold text-lg">
        <h3>Create a Router</h3>
        <p className="font-normal text-sm text-grey-600 mt-1">
          Create a new router that allows route prompts based on your rules.
        </p>
      </div>
      <div>
        <CreateRouterForm />
      </div>
    </DialogContent>
  );
};

export default function CreateRouterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">
          Create Router <FaPlus />
        </Button>
      </DialogTrigger>
      <CreateRouterDialogContent />
    </Dialog>
  );
}
