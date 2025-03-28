"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
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
const data = [
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
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

const funcionarios = [
  {
    func: "Ana",
  },
  {
    func: "Rodrigo",
  },
  {
    func: "Alberto",
  },
  {
    func: "Guilherme",
  },
  {
    func: "Túlio",
  },
];

const Company = () => {
  const [openEmpresa, setOpenEmpresa] = React.useState(false);
  const [valueEmpresa, setValueEmpresa] = React.useState("");

  const [openFuncionario, setOpenFuncionario] = React.useState(false);
  const [valueFuncionario, setValueFuncionario] = React.useState("");

  const [chequeValue, setChequeValue] = useState("");
  const [funcionarioPercent, setFuncionarioPercent] = useState(""); // Definir o estado para o valor de porcentagem do funcionário
  const [empresaPercent, setEmpresaPercent] = useState(""); // Definir o estado para o valor de porcentagem da empresa

  // Função para formatar o valor do cheque
  const handleChequeChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    const formattedValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(rawValue / 100); // Divide por 100 para tratar como centavos
    setChequeValue(formattedValue);
  };

  // Função para formatar o valor como porcentagem
  const formatAsPercentage = (value: string) => {
    const formattedValue = value.replace(/[^0-9.,]/g, ""); // Permite números e vírgulas/pontos
    if (formattedValue) {
      let numericValue = parseFloat(formattedValue.replace(",", ".")); // Substitui vírgula por ponto para suportar decimais
      if (!isNaN(numericValue)) {
        // Garante que o valor seja formatado com 2 casas decimais
        return `${numericValue.toFixed(2).replace(".", ",")}%`; // Troca o ponto por vírgula
      }
    }
    return "";
  };

  // Função de controle para o input de porcentagem
  const handleFuncionarioPercentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = e.target.value;
    setFuncionarioPercent(formatAsPercentage(rawValue)); // Chama a função para formatar
  };

  const handleEmpresaPercentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawValue = e.target.value;
    setEmpresaPercent(formatAsPercentage(rawValue)); // Chama a função para formatar
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
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Nome do Funcionário</Label>
          <Popover open={openFuncionario} onOpenChange={setOpenFuncionario}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openFuncionario}
                className="w-full justify-between"
              >
                {valueFuncionario ? valueFuncionario : "Select funcionário..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search funcionário..." />
                <CommandList>
                  <CommandEmpty>No empresa found.</CommandEmpty>
                  <CommandGroup>
                    {funcionarios.map((funcionario) => (
                      <CommandItem
                        key={funcionario.func}
                        onSelect={() => {
                          setValueFuncionario(funcionario.func);
                          setOpenFuncionario(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueFuncionario === funcionario.func
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {funcionario.func}
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
            className="h-12 w-full bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none"
            value={funcionarioPercent}
            onChange={handleFuncionarioPercentChange}
            placeholder="Digite a porcentagem"
          />
        </div>
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Empresa %</Label>
          <Input
            className="h-12 w-full bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none"
            value={empresaPercent}
            onChange={handleEmpresaPercentChange}
            placeholder="Digite a porcentagem"
          />
        </div>
        <Button className="h-24 bg-[#7788FA] hover:bg-blue-300 cursor-pointer">
          Salvar
        </Button>
      </div>

      {/* Tabela */}
      <div className="mt-16 overflow-auto max-h-[400px]">
        <Table className="border rounded-2xl overflow-hidden">
          <TableCaption>Lista de Todas as Empresas</TableCaption>
          <TableHeader className="bg-[#7788FA]">
            <TableRow>
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
                <TableCell>{item.empresa}</TableCell>
                <TableCell>{item.funcionario}</TableCell>
                <TableCell>{item.cheque}</TableCell>
                <TableCell>{item.funcionarioPerc}</TableCell>
                <TableCell>{item.empresaPerc}</TableCell>
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

export default Company;
