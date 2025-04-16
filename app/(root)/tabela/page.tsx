"use client";

import { ChevronLeft, ChevronRight, TableOfContents } from "lucide-react";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChequeItem {
  id: number;
  cheque: string;
  companyPercentual: number;
  employeePercentual: number;
  company: { id: number; name: string };
  employee: { id: number; name: string };
}

// Colunas da tabela
export const columns: ColumnDef<ChequeItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    id: "companyName",
    accessorFn: (row) => row.company?.name,
    header: "Empresa",
    cell: ({ row }) => <div>{row.original.company?.name}</div>,
  },
  {
    id: "employeeName",
    accessorFn: (row) => row.employee?.name,
    header: "Funcionário",
    cell: ({ row }) => <div>{row.original.employee?.name}</div>,
  },
  {
    accessorKey: "cheque",
    header: "Cheque",
    cell: ({ row }) => {
      const valor = Number(row.original.cheque) / 100;
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor);
    },
  },
  {
    accessorKey: "employeePercentual",
    header: "Funcionário (%)",
    cell: ({ row }) => {
      const cheque = Number(row.original.cheque) / 100;
      const percent = row.original.employeePercentual;
      const valor = (cheque * percent) / 100;
      return `${percent}% (${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor)})`;
    },
  },
  {
    accessorKey: "companyPercentual",
    header: "Empresa (%)",
    cell: ({ row }) => {
      const cheque = Number(row.original.cheque) / 100;
      const percent = row.original.companyPercentual;
      const valor = (cheque * percent) / 100;
      return `${percent}% (${new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valor)})`;
    },
  },
];

const Tabela = () => {
  const [data, setData] = React.useState<ChequeItem[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Fetch empresas e funcionários
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/cheque");
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-gray-100 flex flex-col p-10 h-screen rounded-4xl">
      <h1 className="text-[25px] font-bold mb-10 text-zinc-700 flex items-center gap-2">
        <TableOfContents className="w-10 h-10" />
        Histórico
      </h1>

      {/* Tabela */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Filtrar por funcionário..."
            value={
              (table.getColumn("companyName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("companyName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-[#7788FA] text-white"
                    >
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
                  <TableRow key={row.id}>
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
                    className="h-24 text-center"
                  >
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tabela;
