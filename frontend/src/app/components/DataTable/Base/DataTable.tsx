"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { TextInput } from "../../Inputs/TextInput/TextInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Table/Table";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: boolean;
  loading?: boolean;
  filterColumnName?: string;
  topRightElement?: React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination = true,
  loading = false,
  filterColumnName,
  topRightElement,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      {filterColumnName && (
        <div className="flex flex-row justify-between items-center mb-4">
          <TextInput
            placeholder={`Search by ${filterColumnName}...`}
            value={
              (table.getColumn(filterColumnName)?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn(filterColumnName)
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {topRightElement && topRightElement}
        </div>
      )}
      <div className="rounded-md border border-grey-200 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center mx-auto"
                >
                  {loading ? (
                    <div className="w-full flex-row flex justify-center">
                      <ThreeDots
                        visible={true}
                        height="24"
                        width="24"
                        color={"#313149"}
                        radius="9"
                        ariaLabel="three-dots-loading"
                      />
                    </div>
                  ) : (
                    <p>No Results</p>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className=" space-x-2 pt-4">
          <DataTablePagination table={table} />
        </div>
      )}
    </>
  );
}
