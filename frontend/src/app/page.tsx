"use client";

import Image from "next/image";
import { useState } from "react";
import { TbRoute2 } from "react-icons/tb";
import { Chat, promptHandler } from "./actions";
import ChatContent from "./components/ChatText";

const Prompt = ({ prompt }: { prompt: string }) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-200 to-blue-300 inset-shadow-transparent-sm border border-blue-200 min-w-5"></div>
      <p className="text-sm">{prompt}</p>
    </div>
  );
};

const Response = ({
  response,
  model,
}: {
  response: string;
  model?: string;
}) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-grey-200 to-grey-300 inset-shadow-transparent-sm border border-grey-300 min-w-5"></div>
      <div>
        <ChatContent content={response} />
        {model ? (
          <p className="text-xs text-grey-500 font-medium mt-2">
            Generated with: {model}
          </p>
        ) : null}
      </div>
    </div>
  );
};

const Responses = ({ responses }: { responses: Chat[] }) => {
  return responses.map((response) => (
    <>
      <Prompt prompt={response.prompt} />
      <Response response={response.response} model={response.model} />
    </>
  ));
};

export default function Home() {
  const [gpt4Result, setGpt4Result] = useState<Chat[]>([]);
  const [routerResult, setRouterResult] = useState<Chat[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [routerCost, setRouterCost] = useState<number>(0);
  const [gpt4Cost, setGpt4Cost] = useState<number>(0);

  const onSubmit = async () => {
    const reqPrompt = prompt;
    setPrompt("");

    const result = await promptHandler(reqPrompt);

    setGpt4Result([...gpt4Result, result.gpt4]);
    setRouterResult([...routerResult, result.router]);
  };

  return (
    <main className="p-12 h-screen flex-col flex gap-2">
      <div className="flex flex-row justify-between w-full">
        <p className="font-medium">LLM Router Demo</p>
        {/* <div className="flex flex-row gap-2">
          <p>Percent savings:</p>
          <p>{routerCost}%</p>
        </div> */}
      </div>
      <div className="grid grid-cols-2 w-full gap-16 h-full mt-8">
        <div>
          <div className="flex flex-row justify-between items-center border-b border-grey-200 pb-3">
            <div className="flex flex-row gap-2  items-center w-full">
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
          </div>
          <div className="mt-6 flex flex-col gap-4 max-h-[550px] overflow-y-scroll">
            <Responses responses={routerResult} />
          </div>
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
          <div className="mt-6 flex flex-col gap-4 w-full max-h-[550px] overflow-y-scroll">
            <Responses responses={gpt4Result} />
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
