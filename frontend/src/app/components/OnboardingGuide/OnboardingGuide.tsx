"use client";

import { toast } from "@/app/hooks/useToast/useToast";
import { FaX } from "react-icons/fa6";
import { TbCopy, TbNorthStar } from "react-icons/tb";
import { Button } from "../Inputs/Button/Button";

export default function OnboardingGuide() {
  const copyCurl = () => {
    navigator.clipboard.writeText(
      `curl -X POST -H "Content-Type: application/json" -d '{"prompt": "Hello, how are you?"}' http://localhost:8000/api/prompt`
    );
    toast({
      title: "Curl copied",
      description: "Successfully copied to clipboard.",
      variant: "success",
      duration: 2000,
    });
  };

  return (
    <div className="bg-white border border-grey-200 rounded-lg p-4 shadow-sm mb-8">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-4">
          <div className="bg-gradient-to-br from-grey-50 to-grey-100 inset-shadow-transparent border border-grey-200 rounded-xl w-fit p-3">
            <TbNorthStar className="stroke-grey-600 w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-grey-800">
              Get started routing prompts...
            </p>
            <p className="text-sm text-grey-600">
              Use a curl request or your favorite HTTP request library to get
              started routing prompts.
            </p>
          </div>
        </div>
        <Button variant="tertiary">
          <FaX />
        </Button>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <div className=" bg-primary-600 radius-md p-3 w-fit rounded-md border border-primary-300 .inset-shadow-primary-large">
          <div className="flex flex-row mb-2 justify-between w-full items-center">
            <p className="font-medium text-grey-200 text-xs font-mono">
              Example code
            </p>
            <Button
              variant="tertiary"
              className="p-0 h-fit hover:bg-primary-600"
              onClick={() => copyCurl()}
            >
              <TbCopy className="stroke-grey-200 hover:stroke-white hover:scale-110 hover:rotate-[10deg]" />
            </Button>
          </div>
          <p className="leading-[1.1rem]">
            <code className="text-xs text-white w-fit leading-none">
              curl --location
              &apos;https://tryparakeet.com/api/v1/inference&apos; <br />
              <span className="indent-4">
                --header &apos;Content-Type: application/json&apos; <br />
              </span>
              --header &apos;Authorization: ••••••&apos; <br />
              --data &apos;{"{"} <br />
              &nbsp;&nbsp;&quot;query&quot;: &quot;I love routing prompts,
              don&apos;t you?&quot; <br />
              {"}"}&apos;
            </code>
          </p>
        </div>
        <div className="grow flex flex-col justify-between">
          <div className="bg-blue-50 rounded-md p-3 flex flex-row justify-between items-center">
            <p className="font-medium text-blue-900 text-sm">
              <span className="mr-2">1.</span>Copy your API Key
            </p>
          </div>
          <div className="bg-blue-100 rounded-md p-3 flex flex-row justify-between items-center">
            <p className="font-medium text-blue-900 text-sm">
              <span className="mr-2">2.</span>Create a prompt using the request
              format on the left.
            </p>
          </div>
          <div className="bg-blue-150 rounded-md p-3 flex flex-row justify-between items-center">
            <p className="font-medium text-blue-900 text-sm">
              <span className="mr-2">3.</span>View your routing observability on
              this dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
