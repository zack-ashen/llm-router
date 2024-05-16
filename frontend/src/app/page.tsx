"use client";

import Image from "next/image";
import { useState } from "react";
import { TbRoute2 } from "react-icons/tb";
import { promptHandler } from "./actions";

export default function Home() {
  const [gpt4Result, setGpt4Result] = useState<string>("");
  const [routerResult, setRouterResult] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  const onSubmit = async () => {
    const result = await promptHandler(prompt);
  };

  return (
    <main className="p-12 h-screen flex-col flex gap-2">
      <div className="flex flex-row justify-between w-full">
        <p className="font-medium">LLM Router Demo</p>
        <div className="flex flex-row gap-2">
          <p>Total cost: </p>
          <p>0</p>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-16 h-full mt-8">
        <div>
          <div className="flex flex-row gap-2 border-b border-grey-200 pb-3">
            <div className="flex flex-col justify-center items-center h-fit rounded-xl border-grey-200 border w-fit p-3 bg-gradient-to-br from-grey-100 to-grey-200 inset-shadow-transparent">
              <TbRoute2 />
            </div>
            <div>
              <p className="font-medium">Our Router</p>
              <p className="text-sm text-grey-500">
                Picks the best LLM for each request (variable cost).
              </p>
            </div>
          </div>
          <div></div>
        </div>
        <div>
          <div className="flex flex-row gap-3 border-b border-grey-200 pb-3">
            <div className="flex flex-col justify-center items-center rounded-xl border-grey-200 border w-fit p-3 bg-gradient-to-br from-grey-100 to-grey-200 inset-shadow-transparent">
              <Image src="/openai_icon.png" alt="logo" width={16} height={16} />
            </div>
            <div>
              <p className="font-medium">GPT-4</p>
              <p className="text-sm text-grey-500">
                Currently costs $30 per million tokens
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <textarea
          className="w-full border border-grey-300 rounded-md p-2"
          placeholder="Type your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="bg-primary-500 rounded-lg h-full text-white p-4"
          onClick={onSubmit}
        >
          Ask
        </button>
      </div>
    </main>
  );
}
