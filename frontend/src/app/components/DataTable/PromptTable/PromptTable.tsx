"use client";

import { toast } from "@/app/hooks/useToast/useToast";
import { timeAgo } from "@/app/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { usePathname } from "next/navigation";
import { unparse } from "papaparse";
import { useEffect, useState } from "react";
import { TbDownload } from "react-icons/tb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../DropdownMenu/Base/DropdownMenu";
import { Button, buttonVariants } from "../../Inputs/Button/Button";
import { DataTable } from "../Base/DataTable";
import { getPrompts } from "./actions";

export type PromptColumnT = {
  id: string;
  prompt: string;
  response: string;
  sent: Date;
  model: string;
  cost: number;
  latency: number;
};

const staticColumns: ColumnDef<PromptColumnT>[] = [
  {
    accessorKey: "prompt",
    header: ({ column }) => <div className="pl-4">Prompt</div>,
    cell: ({ row }) => (
      <div className="text-sm font-medium text-dark-grey pl-4 truncate max-w-xs">
        {row.getValue("prompt")}
      </div>
    ),
  },
  {
    accessorKey: "response",
    header: ({ column }) => <div className="pl-4">Response</div>,
    cell: ({ row }) => (
      <div className="text-sm text-dark-grey pl-4 truncate max-w-xs">
        {row.getValue("response")}
      </div>
    ),
  },
  {
    accessorKey: "sent",
    header: ({ column }) => <div className="pl-4">Sent</div>,
    cell: ({ row }) => (
      <div className="text-sm text-dark-grey pl-4 line-clamp-1">
        {timeAgo(row.getValue("sent"))}
      </div>
    ),
  },
  {
    accessorKey: "model",
    header: ({ column }) => <div className="pl-4">Model</div>,
    cell: ({ row }) => (
      <div className="text-sm text-dark-grey pl-4 truncate max-w-xs">
        {row.getValue("model")}
      </div>
    ),
  },
  {
    accessorKey: "cost",
    header: ({ column }) => <div className="pl-4">Cost</div>,
    cell: ({ row }) => (
      <div className="text-sm text-dark-grey pl-4 truncate max-w-xs">
        ${row.getValue("cost")}
      </div>
    ),
  },
  {
    accessorKey: "latency",
    header: ({ column }) => <div className="pl-4">Latency</div>,
    cell: ({ row }) => (
      <div className="text-sm text-dark-grey pl-4 truncate max-w-xs">
        {row.getValue("latency")}s
      </div>
    ),
  },
];

const copyApiKey = (key: string) => {
  navigator.clipboard.writeText(key);
  toast({
    title: "API key copied",
    description: "Successfully copied to clipboard.",
    variant: "success",
    duration: 2000,
  });
};

export default function PromptTable() {
  const pathname = usePathname();
  const routerId = pathname?.split("/")[2];
  const [data, setData] = useState<PromptColumnT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPrompts(routerId)
      .then((prompts) => {
        setData(
          prompts.map((prompt) => ({
            id: prompt.id,
            prompt: prompt.prompt,
            response: prompt.response,
            sent: prompt.created_at,
            model: prompt.model,
            cost: Number(prompt.cost),
            latency: Number(prompt.latency),
          }))
        );
      })
      .then(() => setLoading(false));
  }, [routerId]);

  const exportToCsv = () => {
    const parsedData = data.map((row) => ({
      Prompt: row.prompt,
      Response: row.response,
      Sent: row.sent,
      Model: row.model,
      "Cost ($)": row.cost,
      "Latency (s)": row.latency,
    }));
    const csv = unparse(parsedData);

    // Create a blob from the CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Create a link element
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${routerId}-${new Date()}.csv`);
    link.style.visibility = "hidden";

    // Append the link to the body
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actionsColumn: ColumnDef<PromptColumnT> = {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`${buttonVariants({
                variant: "tertiary",
              })} h-8 w-8 p-0`}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={() => copyApiKey(row.getValue("secret"))}
            >
              Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };

  const columns = [...staticColumns, actionsColumn];

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        filterColumnName="name"
        topRightElement={
          <Button variant="secondary" onMouseDown={exportToCsv}>
            Export to CSV
            <TbDownload />
          </Button>
        }
      />
    </>
  );
}
