import { TbRoute } from "react-icons/tb";

export default function NoProjectsEmptyState() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-full w-full">
      <div className="w-20 h-20 bg-white shadow-sm border border-grey-200 rounded-2xl flex flex-row justify-center items-center">
        <TbRoute className="w-8 h-8 stroke-blue-400" />
      </div>
      <div>
        <p className="text-center text-xl font-semibold text-grey-800">
          No Routers Yet
        </p>
        <p className="text-sm text-medium-grey justify-center text-center mt-1">
          Create a router to start routing prompts.
        </p>
      </div>
    </div>
  );
}
