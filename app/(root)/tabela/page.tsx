"use client";

import { TableOfContents, ChevronDown, MoreHorizontal } from "lucide-react";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type EmpresaData = {
  empresa: string;
  funcionario: string;
  cheque: string;
  funcionarioPerc: string;
  empresaPerc: string;
  diaFaturado: string;
  idCheque: string;
};

const datass: EmpresaData[] = [
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Beto Carreiro",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Carrefour",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Lojas Americanas",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Extra",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Pão de Açúcar",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Casas Bahia",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Submarino",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Amazon",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Mercado Livre",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Renner",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "C&A",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Dafiti",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Nike",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Adidas",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Puma",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
  {
    empresa: "Reebok",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
    diaFaturado: "25/03/2025",
    idCheque: "1",
  },
];

export const columns: ColumnDef<EmpresaData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "empresa",
    header: "Empresa",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("empresa")}</div>
    ),
  },
  {
    accessorKey: "funcionario",
    header: "Funcionário",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("funcionario")}</div>
    ),
  },
  {
    accessorKey: "cheque",
    header: "Cheque",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("cheque")}</div>
    ),
  },
  {
    accessorKey: "funcionarioPerc",
    header: "Funcionário %",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("funcionarioPerc")}</div>
    ),
  },
  {
    accessorKey: "empresaPerc",
    header: "Empresa %",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("empresaPerc")}</div>
    ),
  },
  {
    accessorKey: "diaFaturado",
    header: "Dia Faturado",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("diaFaturado")}</div>
    ),
  },
  {
    accessorKey: "idCheque",
    header: "Id do Cheque",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("idCheque")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const empresaData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(empresaData.empresa)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Tabela = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: datass,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: { pageSize: 7 },
    },
  });
  return (
    <div className="bg-gray-100 flex flex-col p-10 h-screen rounded-4xl">
      <h1 className="text-[25px] font-bold mb-10 text-zinc-700 flex items-center gap-2">
        <TableOfContents className="w-10 h-10" />
        Histórico
      </h1>

      {/* Tabela */}
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filtrar empresas..."
            value={
              (table.getColumn("empresa")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("empresa")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Colunas <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-[#7788FA]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-white">
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-200">
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
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabela;
