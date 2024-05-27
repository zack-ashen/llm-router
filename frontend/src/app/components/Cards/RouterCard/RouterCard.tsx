import { Router } from "@/types";
import { Card } from "../Base";

export default function RouterCard({ router }: { router: Router }) {
  return (
    <Card
      className="w-80 pointer hover:pointer py-5 px-6"
      navigateTo={`/routers/${router.id}/dashboard`}
      clickable
    >
      <div className="width-full flex flex-row justify-between items-center">
        <p className="font-medium font-lg">Placeholder</p>
      </div>
      <p className="text-sm text-grey-700">{router.name}</p>
    </Card>
  );
}
