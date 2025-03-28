import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { NotepadText, Pen, Trash2 } from "lucide-react";
const data = [
  {
    empresa: "Wallmart",
  },
  {
    empresa: "Amazon",
  },
  {
    empresa: "Apple",
  },
  {
    empresa: "Google",
  },
  {
    empresa: "Tesla",
  },
];

const CadastrarEmp = () => {
  return (
    <div className="bg-gray-100 flex flex-col p-10 h-screen rounded-4xl">
      <h1 className="text-[25px] font-bold mb-10 text-zinc-700 flex items-center gap-2">
        <NotepadText className="w-10 h-10" />
        Cadastrar Empresa
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Nome da Empresa</Label>
          <Input className="h-12 w-200 bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none" />
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

export default CadastrarEmp;
