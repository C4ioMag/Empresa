"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown, Pen, Trash2, UserPlus2 } from "lucide-react";
import { cn } from "@/lib/utils";
const data = [
  {
    name: "Ana",
    empresa: "Wallmart",
  },
  {
    name: "Rodrigo",
    empresa: "Tesla",
  },
  {
    name: "Alberto",
    empresa: "Amazon",
  },
  {
    name: "Guilherme",
    empresa: "Google",
  },
  {
    name: "Túlio",
    empresa: "Apple",
  },
];
const empresas = [
  {
    name: "Wallmart",
  },
  {
    name: "Amazon",
  },
  {
    name: "Apple",
  },
  {
    name: "Google",
  },
  {
    name: "Tesla",
  },
];

const CadastrarFuncionario = () => {
  const [openEmpresa, setOpenEmpresa] = React.useState(false);
  const [valueEmpresa, setValueEmpresa] = React.useState("");
  return (
    <div className="bg-gray-100 flex flex-col p-10 h-screen rounded-4xl">
      <h1 className="text-[25px] font-bold mb-10 text-zinc-700 flex items-center gap-2">
        <UserPlus2 className="w-10 h-10" />
        Cadastrar Funcionário
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Nome do Funcionário</Label>
          <Input className="h-12 w-200 bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none" />
        </div>
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none w-208">
          <Label className="mb-3">Nome da Empresa</Label>
          <Popover open={openEmpresa} onOpenChange={setOpenEmpresa}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openEmpresa}
                className="w-full justify-between"
              >
                {valueEmpresa ? valueEmpresa : "Select empresa..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search empresa..." />
                <CommandList>
                  <CommandEmpty>No empresa found.</CommandEmpty>
                  <CommandGroup>
                    {empresas.map((empresa) => (
                      <CommandItem
                        key={empresa.name}
                        onSelect={() => {
                          setValueEmpresa(empresa.name);
                          setOpenEmpresa(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueEmpresa === empresa.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {empresa.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Button className="h-12 w-80 cursor-pointer bg-[#7288FA] rounded-full hover:bg-blue-400">
          Cadastrar
        </Button>
      </div>

      {/* Tabela */}
      <div className="mt-16 overflow-auto max-h-[400px]">
        <Table className="border rounded-2xl overflow-hidden">
          <TableCaption>Lista de Todas as Empresas</TableCaption>
          <TableHeader className="bg-[#7788FA]">
            <TableRow>
              <TableHead className="text-white text-lg font-light">
                Nome
              </TableHead>
              <TableHead className="text-white text-lg font-light">
                Empresa
              </TableHead>
              <TableHead className="text-white text-lg font-light text-right">
                Editar
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-200">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.empresa}</TableCell>
                <TableCell className="flex justify-end items-center gap-2">
                  <Button className="bg-[#7788FA] hover:bg-blue-400 cursor-pointer">
                    <Pen />
                  </Button>
                  <Button className="bg-red-500 hover:bg-red-300 cursor-pointer">
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CadastrarFuncionario;
