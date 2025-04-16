"use client";

import React, { useEffect, useState } from "react";
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

interface Empresa {
  id: number;
  name: string;
}

interface Funcionario {
  id: number;
  name: string;
  idFuncionario: number;
  company: Empresa;
}

const CadastrarFuncionario = () => {
  const [openEmpresa, setOpenEmpresa] = useState(false);
  const [empresaSelecionada, setEmpresaSelecionada] = useState("");
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [editandoFuncionario, setEditandoFuncionario] =
    useState<Funcionario | null>(null);

  // Buscar empresas cadastradas
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await fetch("/api/company");
        const data = await response.json();
        setEmpresas(data);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      }
    };

    fetchEmpresas();
  }, []);

  // Buscar funcionários cadastrados
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await fetch("/api/employee");
        const data = await response.json();
        setFuncionarios(data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchFuncionarios();
  }, []);

  // Cadastrar ou atualizar funcionário
  const handleSubmit = async () => {
    if (!nomeFuncionario || !empresaSelecionada) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const empresa = empresas.find((e) => e.name === empresaSelecionada);

    if (!empresa) {
      alert("Empresa selecionada não encontrada.");
      return;
    }

    const funcionarioData = {
      name: nomeFuncionario,
      companyId: empresa.id,
    };

    try {
      const response = await fetch("/api/employee", {
        method: editandoFuncionario ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          editandoFuncionario
            ? { ...funcionarioData, id: editandoFuncionario.id }
            : funcionarioData
        ),
      });

      if (response.ok) {
        const novoFuncionario = await response.json();
        setFuncionarios((prev) =>
          editandoFuncionario
            ? prev.map((f) =>
                f.id === editandoFuncionario.id ? novoFuncionario : f
              )
            : [novoFuncionario, ...prev]
        );
        setNomeFuncionario("");
        setEmpresaSelecionada("");
        setEditandoFuncionario(null);
      } else {
        console.error("Erro ao salvar funcionário:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
    }
  };

  // Excluir funcionário
  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este funcionário?")) {
      try {
        const response = await fetch(`/api/employee`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          setFuncionarios((prev) => prev.filter((f) => f.id !== id));
        } else {
          console.error("Erro ao excluir funcionário:", await response.text());
        }
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
      }
    }
  };

  // Preparar edição de funcionário
  const handleEdit = (funcionario: Funcionario) => {
    setEditandoFuncionario(funcionario);
    setNomeFuncionario(funcionario.name);
    setEmpresaSelecionada(funcionario.company.name);
  };

  return (
    <div className="bg-gray-100 flex flex-col p-10 h-screen rounded-4xl">
      <h1 className="text-[25px] font-bold mb-10 text-zinc-700 flex items-center gap-2">
        <UserPlus2 className="w-10 h-10" />
        {editandoFuncionario ? "Editar Funcionário" : "Cadastrar Funcionário"}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Nome do Funcionário</Label>
          <Input
            value={nomeFuncionario}
            onChange={(e) => setNomeFuncionario(e.target.value)}
            className="h-12 w-200 bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none"
          />
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
                {empresaSelecionada || "Select uma empresa..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Buscar empresa..." />
                <CommandList>
                  <CommandEmpty>No empresa found.</CommandEmpty>
                  <CommandGroup>
                    {empresas.map((empresa) => (
                      <CommandItem
                        key={empresa.id}
                        onSelect={() => {
                          setEmpresaSelecionada(empresa.name);
                          setOpenEmpresa(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            empresaSelecionada === empresa.name
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
        <Button
          onClick={handleSubmit}
          className="h-12 w-80 cursor-pointer bg-[#7288FA] rounded-full hover:bg-blue-400"
        >
          {editandoFuncionario ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>

      {/* Tabela */}
      <div className="mt-16 overflow-auto max-h-[400px]">
        <Table className="border rounded-2xl overflow-hidden">
          <TableCaption>Lista de Todas as Empresas</TableCaption>
          <TableHeader className="bg-[#7788FA]">
            <TableRow>
              <TableHead className="text-white text-lg font-light">
                Id
              </TableHead>
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
            {funcionarios.map((funcionario) => (
              <TableRow key={funcionario.id} className="hover:bg-gray-200">
                <TableCell>{funcionario.idFuncionario}</TableCell>
                <TableCell>{funcionario.name}</TableCell>
                <TableCell>{funcionario.company?.name}</TableCell>
                <TableCell className="flex justify-end items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(funcionario)}
                    className="bg-[#7788FA] hover:bg-blue-400 cursor-pointer"
                  >
                    <Pen />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(funcionario.id)}
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

export default CadastrarFuncionario;
