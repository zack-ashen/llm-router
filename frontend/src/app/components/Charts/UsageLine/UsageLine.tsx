import * as React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DataItem {
  day: string;
  usage: number;
}

interface Props {
  data: DataItem[];
}

function formatDateDayDate(date: Date): string {
  // Options to get the long weekday name (e.g., Monday)
  const dayOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
  // Options to get the month and day in MM/DD format
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
  };

  // Format the parts of the date
  const dayPart = new Intl.DateTimeFormat("en-US", dayOptions).format(date);
  const datePart = new Intl.DateTimeFormat("en-US", dateOptions).format(date);

  // Combine the parts
  return `${dayPart} (${datePart})`;
}

const UsageLineChart: React.FC<Props> = ({ data }) => {
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  };

  const maxUsage = Math.max(...data.map((item) => item.usage));
  // Optionally add a buffer to the max value for better visualization
  const yAxisDomainUpperBound = maxUsage + maxUsage * 0.1; // adding 10% as a buffer
  const yAxisDomainLowerBound = 0;

  const step = Math.ceil(data.length / 7);
  const ticks = data
    .filter((_, index) => index % step === 0)
    .map((item) => item.day);

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={{ stroke: "#d0d5dd", strokeWidth: 1 }}
            tick={{ fontSize: 11, fill: "#667085", fontWeight: 500 }}
            tickFormatter={formatDate}
            interval={"preserveStartEnd"}
            ticks={ticks}
          />
          <YAxis hide domain={[yAxisDomainLowerBound, yAxisDomainUpperBound]} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white rounded-lg border border-grey-200 p-2 shadow-sm">
                    <div className="grid grid-cols-1 gap-1">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-dark-grey">
                          {formatDateDayDate(new Date(payload[0].payload.day))}
                        </span>
                        <span className="font-medium text-xs text-grey-800">
                          {payload[0].value} chats
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="usage"
            strokeWidth={2}
            stroke="#313149"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageLineChart;
