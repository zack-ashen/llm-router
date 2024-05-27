"use client";

import { toast } from "@/app/hooks/useToast/useToast";
import { formatApiKey, formatDate } from "@/app/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbCopy, TbTrash } from "react-icons/tb";
import CreateAPIKeyDialog from "../../Dialogs/CreateAPIKeyDialog/CreateAPIKeyDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../DropdownMenu/Base/DropdownMenu";
import { Button, buttonVariants } from "../../Inputs/Button/Button";
import { DataTable } from "../Base/DataTable";
import { getApiKeys } from "./actions";

export type ApiKeyColumnT = {
  id: string;
  name: string;
  created: string;
  lastUsed: string;
  secret: string;
};

const staticColumns: ColumnDef<ApiKeyColumnT>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <div className="pl-4">Name</div>,
    cell: ({ row }) => (
      <div className="text-sm font-medium text-dark-grey pl-4 truncate max-w-xs">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "created",
    header: ({ column }) => <div className="pl-4">Created</div>,
    cell: ({ row }) => (
      <div className="text-sm text-dark-grey pl-4 truncate max-w-xs">
        {formatDate(new Date(row.getValue("created")))}
      </div>
    ),
  },
  {
    accessorKey: "lastUsed",
    header: ({ column }) => {
      return (
        <Button
          className={buttonVariants({ variant: "tertiary" })}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Used
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 text-sm text-dark-grey truncate max-w-xs">
        {formatDate(new Date(row.getValue("lastUsed")))}
      </div>
    ),
  },
  {
    accessorKey: "secret",
    header: ({ column }) => <div className="pl-4">Secret</div>,
    cell: ({ row }) => {
      const val = row.getValue("secret") as string;

      return (
        <div className="ml-4 flex flex-row items-center gap-3">
          <p className="text-sm text-dark-grey truncate max-w-xs">
            {formatApiKey(row.getValue("secret"))}{" "}
          </p>
          <Button
            variant="tertiary"
            className="p-3"
            onClick={() => copyApiKey(val)}
          >
            <TbCopy />
          </Button>
        </div>
      );
    },
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

export default function ApiKeysTable() {
  const pathname = usePathname();
  const routerId = pathname?.split("/")[2];
  const [data, setData] = useState<ApiKeyColumnT[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getApiKeys(routerId)
      .then((keys) => {
        setData(
          keys.map((key) => ({
            id: key.id,
            name: key.name,
            created: key.createdAt,
            lastUsed: key.lastUsedAt,
            secret: key.key,
          }))
        );
      })
      .then(() => setLoading(false));
  }, [routerId]);

  const actionsColumn: ColumnDef<ApiKeyColumnT> = {
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
              <TbCopy className="mr-2 h-4 w-4" /> Copy secret
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => console.log("hi")}>
              <TbTrash className="mr-2 h-4 w-4" /> Delete secret
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
        topRightElement={<CreateAPIKeyDialog />}
      />
    </>
  );
}
