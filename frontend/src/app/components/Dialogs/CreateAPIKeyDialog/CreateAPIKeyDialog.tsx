import PlusIcon from "@/assets/PlusIcon";
import { FaPlus } from "react-icons/fa6";
import CreateAPIKeyForm from "../../Forms/CreateAPIKeyForm/CreateAPIKeyForm";
import { Button } from "../../Inputs/Button/Button";
import { Dialog, DialogContent, DialogTrigger } from "../Base/Dialog";

export default function CreateAPIKeyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">
          Add Key <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <PlusIcon />
        </div>
        <div className="mt-1 font-semibold text-lg">
          <h3>Create a API Key</h3>
          <p className="font-normal text-sm text-grey-600 mt-1">
            Create a new API key to route prompts from.
          </p>
        </div>
        <div>
          <CreateAPIKeyForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
