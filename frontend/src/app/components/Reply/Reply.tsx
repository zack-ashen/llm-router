import ChatLogo from "@/assets/ChatLogo";
import { RxDotFilled } from "react-icons/rx";

import { ThreeDots } from "react-loader-spinner";

import { FaArrowRight } from "react-icons/fa6";
import ChatContent from "../ChatContent/ChatContent";
import { Button } from "../Inputs/Button/Button";

export type ChatReplyT = {
  result: string;
  model: string;
  id: string;
  latency: number;
};

type ReplyProps =
  | {
      chatReply: ChatReplyT;
      loading?: false;
    }
  | {
      chatReply?: never;
      loading: true;
    };

export default function Reply({ chatReply, loading = false }: ReplyProps) {
  return (
    <div className="flex flex-row gap-5 items-start justify-items-center">
      <div className="min-w-7">
        <ChatLogo className="h-7 w-7" />
      </div>
      <div className="flex flex-col">
        {loading ? (
          <ThreeDots
            visible={true}
            height="28"
            width="28"
            color="#344054"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          <>
            <p className="font-medium">Keet</p>
            <div className="mt-2">
              <ChatContent content={chatReply?.result!} />
              <div className="flex flex-row gap-1 mt-1 items-center">
                <p className="text-grey-600 text-sm font-medium">
                  {Number(chatReply?.latency).toFixed(2)}s
                </p>
                <RxDotFilled className="text-grey-600 w-4 h-4" />
                <p className="text-grey-600 text-sm font-medium">
                  {chatReply?.model}
                </p>
                <RxDotFilled className="text-grey-600 w-4 h-4" />
                <Button
                  variant="tertiary"
                  className="text-sm p-2 text-grey-700"
                >
                  More details <FaArrowRight />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
