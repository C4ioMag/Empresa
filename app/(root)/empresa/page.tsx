"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Building2, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen, Trash2 } from "lucide-react";

interface ChequeItem {
  id: number;
  cheque: string;
  companyPercentual: number;
  employeePercentual: number;
  company: { id: number; name: string };
  employee: { id: number; name: string };
}

interface Empresa {
  id: number;
  name: string;
}

interface Funcionario {
  id: number;
  name: string;
}

const Company = () => {
  const [openEmpresa, setOpenEmpresa] = useState(false);
  const [valueEmpresa, setValueEmpresa] = useState("");
  const [openFuncionario, setOpenFuncionario] = useState(false);
  const [valueFuncionario, setValueFuncionario] = useState("");
  const [chequeValue, setChequeValue] = useState("");
  const [empresaPerc, setEmpresaPerc] = useState<number>(0);
  const [funcionarioPerc, setFuncionarioPerc] = useState<number>(0);
  const [data, setData] = useState<ChequeItem[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch empresas e funcionários
  useEffect(() => {
    const fetchEmpresas = async () => {
      const res = await fetch("/api/company");
      const json = await res.json();
      setEmpresas(json);
    };

    const fetchFuncionarios = async () => {
      const res = await fetch("/api/employee");
      const json = await res.json();
      setFuncionarios(json);
    };

    const fetchData = async () => {
      const res = await fetch("/api/cheque");
      const json = await res.json();
      setData(json);
    };

    fetchEmpresas();
    fetchFuncionarios();
    fetchData();
  }, []);

  const handleChequeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(rawValue) / 100);
    setChequeValue(formattedValue);
  };

  const resetForm = () => {
    setValueEmpresa("");
    setValueFuncionario("");
    setChequeValue("");
    setEmpresaPerc(0); // ← Aqui
    setFuncionarioPerc(0); // ← E aqui
    setEditingId(null);
  };

  const handleSubmit = async () => {
    // Converter o valor do chque de volta para um número sem formatação.
    const rawChequeValue = parseFloat(chequeValue.replace(/\D/g, ""));
    const selectedEmpresa = empresas.find((e) => e.name === valueEmpresa);
    const selectedFuncionario = funcionarios.find(
      (f) => f.name === valueFuncionario
    );

    const body = {
      cheque: rawChequeValue,
      companyId: selectedEmpresa?.id,
      employeeId: selectedFuncionario?.id,
      companyPercentual: empresaPerc,
      employeePercentual: funcionarioPerc,
    };

    if (editingId) {
      await fetch(`/api/cheque/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/cheque", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    const updated = await (await fetch("/api/cheque")).json();
    setData(updated);
    resetForm();
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/cheque`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const updated = await (await fetch("/api/cheque")).json();
      setData(updated);
    } catch (error) {
      console.error("Erro ao deletar cheque:", error);
    }
  };

  const handleEdit = (item: ChequeItem) => {
    setValueEmpresa(item.company?.name ?? "");
    setValueFuncionario(item.employee?.name ?? "");
    setChequeValue(item.cheque);
    setEmpresaPerc(item.companyPercentual);
    setFuncionarioPerc(item.employeePercentual);
    setEditingId(item.id);
  };

  return (
    <div className="bg-gray-100 flex flex-col p-10 h-screen rounded-4xl">
      <h1 className="text-[25px] font-bold text-zinc-700 flex items-center gap-2">
        <Building2 className="w-10 h-10" />
        Empresa
      </h1>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Nome da Empresa</Label>
          <Popover open={openEmpresa} onOpenChange={setOpenEmpresa}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {valueEmpresa || "Select empresa..."}
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
                        key={empresa.id}
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
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Nome do Funcionário</Label>
          <Popover open={openFuncionario} onOpenChange={setOpenFuncionario}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {valueFuncionario || "Select funcionário..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search funcionário..." />
                <CommandList>
                  <CommandEmpty>Funcionários não encontrados.</CommandEmpty>
                  <CommandGroup>
                    {funcionarios.map((func) => (
                      <CommandItem
                        key={func.id}
                        onSelect={() => {
                          setValueFuncionario(func.name);
                          setOpenFuncionario(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueFuncionario === func.name
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {func.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Cheque</Label>
          <Input
            type="text"
            value={chequeValue}
            onChange={handleChequeChange}
            className="h-12 w-full bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none"
          />
        </div>
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Funcionário %</Label>
          <Input
            value={funcionarioPerc}
            onChange={(e) => setFuncionarioPerc(Number(e.target.value) || 0)}
            className="h-12 w-full bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none"
            placeholder="Digite a porcentagem"
          />
        </div>
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Empresa %</Label>
          <Input
            value={empresaPerc}
            onChange={(e) => setEmpresaPerc(Number(e.target.value) || 0)}
            className="h-12 w-full bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none"
            placeholder="Digite a porcentagem"
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="h-24 bg-[#7788FA] hover:bg-blue-300 cursor-pointer"
        >
          {editingId ? "Atualizar" : "Salvar"}
        </Button>
      </div>

      {/* Tabela */}
      <div className="mt-16 overflow-auto max-h-[400px]">
        <Table className="border rounded-2xl overflow-hidden">
          <TableCaption>Lista de Todas as Empresas</TableCaption>
          <TableHeader className="bg-[#7788FA]">
            <TableRow>
              <TableHead className="text-white font-light">Id</TableHead>
              <TableHead className="text-white font-light">Empresa</TableHead>
              <TableHead className="text-white font-light">
                Funcionário
              </TableHead>
              <TableHead className="text-white font-light">Cheque</TableHead>
              <TableHead className="text-white font-light">
                Funcionário (%)
              </TableHead>
              <TableHead className="text-white font-light">
                Empresa (%)
              </TableHead>
              <TableHead className="text-white font-light">Editar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-200">
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.company?.name}</TableCell>
                <TableCell>{item.employee?.name}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(item.cheque) / 100)}
                </TableCell>
                <TableCell>
                  {item.employeePercentual}% (
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    ((Number(item.cheque) / 100) * item.employeePercentual) /
                      100
                  )}
                  )
                </TableCell>
                <TableCell>
                  {item.companyPercentual}% (
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    ((Number(item.cheque) / 100) * item.companyPercentual) / 100
                  )}
                  )
                </TableCell>
                <TableCell className="flex justify-end items-center gap-2">
                  <Button
                    onClick={() => handleEdit(item)}
                    className="bg-[#7788FA] hover:bg-blue-400 cursor-pointer"
                  >
                    <Pen />
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-300 cursor-pointer"
                  >
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

export default Company;
