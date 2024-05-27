import ChatLogo from "@/assets/ChatLogo";

export default function NoChatEmptyState() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
      <ChatLogo className="h-20 w-20" />
      <div>
        <p className="text-center text-xl font-semibold text-grey-800">
          Ask a question about your course.
        </p>
      </div>
    </div>
  );
}
