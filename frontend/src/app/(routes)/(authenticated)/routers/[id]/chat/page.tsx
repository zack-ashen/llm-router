"use client";

import NoChatEmptyState from "@/app/components/EmptyStates/NoChatEmptyState/NoChatEmptyState";
import { QueryTextarea } from "@/app/components/Inputs/QueryTextarea/QueryTextarea";
import Query, { QueryT } from "@/app/components/Query/Query";
import Reply, { ChatReplyT } from "@/app/components/Reply/Reply";
import { ScrollArea, ScrollBar } from "@/app/components/ScrollArea/ScrollArea";
import { toast } from "@/app/hooks/useToast/useToast";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { sendQuery } from "./actions";

type ChatT = ChatReplyT | QueryT;

export default function ChatPage() {
  const [chat, setChat] = useState<ChatT[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const routerId = usePathname()?.split("/")[2];
  const viewPortRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const submit = async () => {
    setQuery("");

    // Use the state value in the fetch request
    setChat((prevChat) => [...prevChat, { query }]);

    try {
      setLoading(true);

      const result = await sendQuery(query, routerId);
      const { message, model, latency, id } = result;

      setChat((prevChat) => [
        ...prevChat,
        { result: message, model, latency, id },
      ]);

      setLoading(false);
    } catch (error) {
      toast({
        title: "Uh oh!",
        description: "Something went wrong with your query. Please try again.",
        variant: "error",
      });
      setChat((prevChat) => [...prevChat.splice(0, prevChat.length - 1)]);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submit();
  };

  return (
    <div className="flex flex-col grow justify-between w-[64rem] mx-auto h-full">
      <div className="flex flex-col grow justify-center items-center w-[64rem] mx-auto h-full">
        {chat.length === 0 ? (
          <div className="flex items-center justify-center h-full w-full">
            <NoChatEmptyState />
          </div>
        ) : (
          <div className="flex flex-col grow overflow-y-scroll max-h-full w-full">
            <ScrollArea
              className="h-[600px] w-full flex flex-col gap-8 items-start"
              viewportRef={viewPortRef}
            >
              <ScrollBar orientation="vertical" className="absolute right-0" />
              <div className="flex flex-col gap-6 w-full">
                {chat.map((chat, index) => {
                  return index % 2 !== 0 ? (
                    <Reply key={index} chatReply={chat as ChatReplyT} />
                  ) : (
                    <Query key={index} query={chat as QueryT} />
                  );
                })}
                {loading ? (
                  <div className="flex justify-start w-full">
                    <Reply loading />
                  </div>
                ) : null}
              </div>
              <div ref={bottomRef} />
            </ScrollArea>
          </div>
        )}
      </div>
      <form className="flex flex-row gap-6 mt-1" onSubmit={handleSubmit}>
        <QueryTextarea prompt={query} setPrompt={setQuery} />
      </form>
    </div>
  );
}
