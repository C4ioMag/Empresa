"use client";

import { Pen, TableOfContents, Trash2 } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const data = [
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
  {
    empresa: "Wallmart",
    funcionario: "Rogério",
    cheque: "$2,500.00",
    funcionarioPerc: "2,05",
    empresaPerc: "52,05",
  },
];

const Tabela = () => {
  return (
    <div className="bg-gray-100 flex flex-col p-10 h-screen rounded-4xl">
      <h1 className="text-[25px] font-bold mb-10 text-zinc-700 flex items-center gap-2">
        <TableOfContents className="w-10 h-10" />
        Histórico
      </h1>

      {/* Tabela */}
      <div className="overflow-auto max-h-[400px]">
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

export default Tabela;
