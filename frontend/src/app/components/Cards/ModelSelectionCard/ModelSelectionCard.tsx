"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ModelSelectionBar from "../../Charts/ModelSelectionBar/ModelSelectionBar";
import ModelSelectionPie from "../../Charts/ModelSelectionPie/ModelSelectionPie";
import { Card } from "../Base";
import { getModelSelectionData } from "./actions";

export type ModelSelectionData = {
  name: string;
  count: number;
};

export default function ModelSelectionCard() {
  const pathname = usePathname();
  const routerId = pathname?.split("/")[2];
  const [data, setData] = useState<ModelSelectionData[]>([]);

  useEffect(() => {
    getModelSelectionData(routerId).then((data) => {
      setData(data);
    });
  }, [routerId]);

  return (
    <Card className="p-6 flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between items-center">
        <p className="font-medium">Model Selection</p>
      </div>
      <ModelSelectionPie
        data={data.map((d) => ({ name: d.name, value: d.count }))}
      />
    </Card>
  );
}
