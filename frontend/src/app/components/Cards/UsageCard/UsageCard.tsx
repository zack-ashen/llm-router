"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MetricActionsTab from "../../Charts/MetricActionsTab/MetricActionsTab";
import UsageLineChart from "../../Charts/UsageLine/UsageLine";
import { Card } from "../Base";
import { getUsageData } from "./actions";

export type UsageData = {
  day: string;
  usage: number;
};

export const calculateEndIndex = (days: number, data: UsageData[] = []) => {
  const todayIndex = data.length - 1; // assumes the last item is the most recent date
  return Math.max(todayIndex - days + 1, 0);
};

export default function UsageCard({ title }: { title: string }) {
  const pathname = usePathname();
  const routerId = pathname?.split("/")[2];
  const [data, setData] = useState<UsageData[]>([]);
  const [displayData, setDisplayData] = useState<UsageData[]>();

  useEffect(() => {
    getUsageData(routerId).then((data) => {
      setData(data);
      setDisplayData(data.slice(calculateEndIndex(7, data)));
    });
    // setDisplayData(data.slice(calculateEndIndex(7, data)));
  }, [routerId]);

  const usageActions = {
    "7 days": () => setDisplayData(data.slice(calculateEndIndex(7, data))),
    "30 days": () => setDisplayData(data.slice(calculateEndIndex(30, data))),
    "3 months": () => setDisplayData(data.slice(calculateEndIndex(90, data))),
  };

  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center">
        <p className="font-medium">{title}</p>
        <MetricActionsTab actions={usageActions} />
      </div>
      {displayData && <UsageLineChart data={displayData} />}
    </Card>
  );
}
