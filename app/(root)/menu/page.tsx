"use client";

import { Separator } from "@/components/ui/separator";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Corpo = () => {
  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [totalFuncionarios, setTotalFuncionarios] = useState(0);
  const [totalCheques, setTotalCheques] = useState(0);
  const [totalDinheiro, setTotalDinheiro] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empresasRes, funcionariosRes, chequesRes] = await Promise.all([
          fetch("/api/company"),
          fetch("/api/employee"),
          fetch("/api/cheque"),
        ]);

        const empresas = await empresasRes.json();
        const funcionarios = await funcionariosRes.json();
        const cheques = await chequesRes.json();

        setTotalEmpresas(empresas.length);
        setTotalFuncionarios(funcionarios.length);
        setTotalCheques(cheques.length);

        const soma = cheques.reduce(
          (acc: number, item: { cheque: string }) => acc + Number(item.cheque),
          0
        );

        setTotalDinheiro(soma / 100); // Mostra o valor em reais
      } catch (err) {
        console.log("Erro ao buscar dados:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 p-10 h-screen rounded-4xl grid grid-cols-2 gap-10">
      {/* Coluna da esquerda */}
      <div className="flex flex-col gap-10 h-full">
        {/* Dashboard */}
        <div className="bg-[#7788FA] rounded-2xl w-full p-6 flex items-center gap-5">
          <LayoutDashboard className="w-32 h-32 text-white" />
          <div className="flex flex-col">
            <h1 className="text-white text-5xl font-bold">Dashboard</h1>
            <p className="text-white text-sm font-light">Analitics</p>
          </div>
        </div>

        {/* Relatórios */}
        <div className="grid grid-cols-2 gap-5">
          {/* Empresas */}
          <CardResumo
            titulo="Empresas"
            imagem="/images/empresaLogo.svg"
            quantidade={totalEmpresas}
          />

          {/* Funcionários */}
          <CardResumo
            titulo="Funcionários"
            imagem="/images/funcLogo.svg"
            quantidade={totalFuncionarios}
          />

          {/* Cheques */}
          <CardResumo
            titulo="Cheques"
            imagem="/images/chequeLogo.svg"
            quantidade={totalCheques}
          />

          {/* Dinheiro */}
          <CardResumo
            titulo="Dinheiro"
            imagem="/images/dinheiroLogo.svg"
            quantidade={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(totalDinheiro)}
          />
        </div>
      </div>

      {/* Coluna da direita - Atualizações Recentes */}
      <div className="bg-white h-full rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-zinc-700">
          Atualizações Recentes
        </h1>
        <div className="mt-7 flex flex-col items-start gap-3">
          <div className="flex items-center gap-3 hover:bg-gray-50 w-full rounded-lg">
            <Image
              src="/images/funcLogo.svg"
              alt="Empresa Logo"
              width={60}
              height={60}
            />
            <div className="flex flex-col items-start">
              <h1 className="text-base">Henrique Carvalho</h1>
              <p className="text-xs text-gray-400">4:57am, 10 Nov</p>
            </div>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-50 w-full rounded-lg">
            <Image
              src="/images/empresaLogo.svg"
              alt="Empresa Logo"
              width={60}
              height={60}
            />
            <div className="flex flex-col items-start">
              <h1 className="text-base">Walmart</h1>
              <p className="text-xs text-gray-400">10:50am, 16 Jan</p>
            </div>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-50 w-full rounded-lg">
            <Image
              src="/images/funcLogo.svg"
              alt="Empresa Logo"
              width={60}
              height={60}
            />
            <div className="flex flex-col items-start">
              <h1 className="text-base">Rodrigo Silva</h1>
              <p className="text-xs text-gray-400">1:40pm, 15 Mar</p>
            </div>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-50 w-full rounded-lg">
            <Image
              src="/images/empresaLogo.svg"
              alt="Empresa Logo"
              width={60}
              height={60}
            />
            <div className="flex flex-col items-start">
              <h1 className="text-base">Best Buy</h1>
              <p className="text-xs text-gray-400">12:15pm, 10 Fev</p>
            </div>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-50 w-full rounded-lg">
            <Image
              src="/images/empresaLogo.svg"
              alt="Empresa Logo"
              width={60}
              height={60}
            />
            <div className="flex flex-col items-start">
              <h1 className="text-base">Trader Joes</h1>
              <p className="text-xs text-gray-400">10:11pm, 27 Mar</p>
            </div>
          </div>
          <div className="flex items-center gap-3 hover:bg-gray-50 w-full rounded-lg">
            <Image
              src="/images/empresaLogo.svg"
              alt="Empresa Logo"
              width={60}
              height={60}
            />
            <div className="flex flex-col items-start">
              <h1 className="text-base">Publix</h1>
              <p className="text-xs text-gray-400">11:42am, 20 Jul</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para os cards
const CardResumo = ({
  titulo,
  imagem,
  quantidade,
}: {
  titulo: string;
  imagem: string;
  quantidade: string | number;
}) => (
  <div className="bg-white p-5 rounded-2xl flex flex-col items-center w-full">
    <Image src={imagem} alt={`${titulo} Logo`} width={80} height={80} />
    <h1 className="mb-3 text-xl font-bold">{titulo}</h1>
    <Separator className="mb-3" />
    <p className="mb-3 text-gray-500 font-light text-sm">Último update</p>
    <p>{quantidade}</p>
  </div>
);

export default Corpo;
