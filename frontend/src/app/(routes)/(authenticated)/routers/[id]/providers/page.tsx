"use client";

import { Button } from "@/app/components/Inputs/Button/Button";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";

export default function ProvidersPage() {
  return (
    <>
      <div className="bg-white border border-grey-200 rounded-lg w-fit p-6">
        MistralAI
        <Image
          src={"/mistral.png"}
          alt={"mistral logo"}
          width={64}
          height={64}
        />
        <div>
          <p>mistral-small</p>
        </div>
        <Button variant={"secondary"}>
          Add API Key <FaPlus />
        </Button>
      </div>
    </>
  );
}
