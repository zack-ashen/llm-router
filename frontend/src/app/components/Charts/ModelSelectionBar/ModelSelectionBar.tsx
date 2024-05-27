import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
} from "recharts";

interface DataItem {
  name: string;
  count: number;
}

interface Props {
  data: DataItem[];
}

// TODO: CHANGE THIS TO INCLUDE A TON OF COLOR OPTIONS
const COLORS = [
  "#ea5545",
  "#27aeef",
  "#b33dc6",
  "#ef9b20",
  "#f46a9b",
  "#edbf33",
  "#ede15b",
  "#bdcf32",
  "#87bc45",
];

const CustomTick: React.FC<any> = ({ x, y, payload }) => {
  const label = payload.value;
  const maxLength = 10; // TODO: potentially adjust
  const truncatedLabel =
    label.length > maxLength ? `${label.slice(0, maxLength)}...` : label;

  return (
    <g transform={`translate(${x},${y})`}>
      <Text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#344054"
        fontSize={12}
        fontWeight={400}
      >
        {truncatedLabel}
      </Text>
    </g>
  );
};

const ModelSelectionBar: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={data}>
          <defs>
            <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#313149" stopOpacity={1} />
              <stop offset="95%" stopColor="#27273A" stopOpacity={1} />
            </linearGradient>
          </defs>
          <defs>
            <linearGradient
              id="purpleGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#63A1FF" stopOpacity={1} />
              <stop offset="100%" stopColor="#3C8AFF" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Bar dataKey="count" fill="url(#gradientFill)" radius={[5, 5, 5, 5]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={"url(#purpleGradient)"} />
            ))}
          </Bar>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={{ stroke: "#d0d5dd", strokeWidth: 0 }}
            tick={<CustomTick />}
            interval={0}
          />
          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div
                    className="bg-white rounded-lg border border-grey-200 p-2 shadow-sm"
                    style={{ backgroundColor: "white" }}
                  >
                    <div className="grid grid-cols-1 gap-1">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase font-medium text-dark-grey">
                          {payload[0].payload.doc_name}
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
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ModelSelectionBar;
