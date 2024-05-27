"use client";

import React, { useState } from "react";
import { Button, buttonVariants } from "../../Inputs/Button/Button";

export interface MetricActionsTabProps {
  actions: Record<string, () => void>;
}

const MetricActionsTab: React.FC<MetricActionsTabProps> = ({ actions }) => {
  const [activeActionName, setActiveActionName] = useState<string>(
    Object.keys(actions)[0]
  );

  const handleActionChange = (actionName: string) => {
    setActiveActionName(actionName);
    actions[actionName]();
  };

  return (
    <div className="flex bg-grey-100 rounded-lg overflow-hidden border-2 border-grey-100 gap-2">
      {Object.keys(actions).map((actionName) => (
        <Button
          className={`
            ${activeActionName === actionName ? "bg-white inset-shadow-grey border border-grey-200" : "bg-grey-100 text-grey-500 hover:text-grey-600"}
            ${buttonVariants({ size: "sm" })}
          `}
          key={actionName}
          onClick={() => handleActionChange(actionName)}
        >
          {actionName}
        </Button>
      ))}
    </div>
  );
};

export default MetricActionsTab;
