"use client";

import _, { LoDashStatic } from "lodash";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  Cell,
  Legend,
  LegendProps,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface QuestionCategoriesPieProps {
  data: { name: string; value: number }[];
}

// TODO: CHANGE THIS TO INCLUDE A TON OF COLOR OPTIONS
const COLORS = [
  "#875BF7",
  "#2970FF",
  "#15B79E",
  "#4E5BA6",
  "#0BA5EC",
  "#4E5BA6",
  "#ede15b",
  "#bdcf32",
  "#87bc45",
];

const ModelSelectionPie: React.FC<QuestionCategoriesPieProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: LoDashStatic, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const RenderLegend = (props: LegendProps) => {
    const pathname = usePathname();
    const courseSlug = pathname?.split("/")[3];
    const searchParams = useSearchParams();

    const { payload } = props;

    const payloadSlice = payload?.slice(0, 5);

    return (
      <ul className="flex flex-col gap-1">
        {payloadSlice?.map((entry, index) => {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("topic", entry.value);
          return (
            <li key={`item-${index}`} className="flex items-center w-fit">
              <div
                style={{
                  backgroundColor: entry.color,
                  display: "inline-block",
                  marginRight: "14px",
                  borderRadius: "5px", // Adjust for rounded corners
                  width: "14px",
                  height: "14px",
                }}
              />
              <Link
                className="text-grey-600 truncate text-sm font-medium max-w-40 hover:underline"
                href={
                  `/teacher/course/${courseSlug}/analysis/topic` +
                  `?${newSearchParams.toString()}`
                }
              >
                {entry.value}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="flex flex-row">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            cornerRadius={6}
            paddingAngle={data.length > 1 ? 1 : 0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                stroke="none"
                fill={COLORS[index % COLORS.length]}
                onMouseEnter={() => onPieEnter(_, index)}
                onMouseLeave={onPieLeave}
                // Apply a shadow filter if this cell is active
                style={{
                  filter: activeIndex === index ? "url(#shadow)" : "",
                }}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white rounded-lg border border-grey-200 p-2 shadow-sm">
                    <div className="grid grid-cols-1 gap-1">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-dark-grey">
                          {payload[0].name}
                        </span>
                        <span className="font-medium text-xs text-grey-800">
                          {payload[0].value}{" "}
                          {payload[0].value === 1 ? "prompt" : "prompts"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <defs>
            <filter id="shadow" height="130%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="3"
                floodColor="black"
                floodOpacity="0.2"
              />
            </filter>
          </defs>
          <Legend
            content={<RenderLegend />}
            layout="horizontal"
            align="left"
            verticalAlign="middle"
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            width={130}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelSelectionPie;
