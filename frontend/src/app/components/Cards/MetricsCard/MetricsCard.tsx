import { PropsWithChildren } from "react";
import { Card, CardTitle } from "../Base";

interface MetricsCardProps extends PropsWithChildren {
  title: string;
}

export default function MetricsCard({ title, children }: MetricsCardProps) {
  return (
    <Card className="flex-1 p-5 flex flex-col gap-4">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div>{children}</div>
    </Card>
  );
}
