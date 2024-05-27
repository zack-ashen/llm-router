"use client";

import MetricsCard from "@/app/components/Cards/MetricsCard/MetricsCard";
import ModelSelectionCard from "@/app/components/Cards/ModelSelectionCard/ModelSelectionCard";
import UsageCard from "@/app/components/Cards/UsageCard/UsageCard";
import PromptTable from "@/app/components/DataTable/PromptTable/PromptTable";
import Divider from "@/app/components/Divider/Divider";
import OnboardingGuide from "@/app/components/OnboardingGuide/OnboardingGuide";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getMetrics } from "./actions";

export default function ProjectPage() {
  const pathname = usePathname();
  const routerId = pathname?.split("/")[2];
  const [promptCount, setPromptCount] = useState<number | undefined>();
  const [latency, setLatency] = useState<number | undefined>();
  const [cost, setCost] = useState<number | undefined>();

  useEffect(() => {
    getMetrics(routerId).then(
      ({ promptCount, averageLatency, averageCost }) => {
        setPromptCount(promptCount);
        setLatency(Number(averageLatency));
        setCost(Number(averageCost));
      }
    );
  }, [routerId]);

  return (
    <div>
      <OnboardingGuide />
      <div className="grid grid-cols-3 gap-4">
        <MetricsCard title={"Prompts"}>
          <p className="text-3xl">{promptCount}</p>
        </MetricsCard>
        <MetricsCard title={"Average Latency"}>
          <p className="text-3xl">{Number(latency).toFixed(2)}s</p>
        </MetricsCard>
        <MetricsCard title={"Average Cost"}>
          <p className="text-3xl">${cost}</p>
        </MetricsCard>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <UsageCard title={"Usage"} />
        <ModelSelectionCard />
      </div>
      <Divider className="my-8" />
      <div>
        <p className="text-lg font-medium my-4">Prompt Feed</p>
        <PromptTable />
      </div>
    </div>
  );
}
