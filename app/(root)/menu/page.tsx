import { Separator } from "@/components/ui/separator";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import React from "react";

const Corpo = () => {
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
          <div className="bg-white p-5 rounded-2xl flex flex-col items-center w-full">
            <Image
              src="/images/empresaLogo.svg"
              alt="Empresa Logo"
              width={80}
              height={80}
            />
            <h1 className="mb-3 text-xl font-bold">Empresas</h1>
            <Separator className="mb-3" />
            <p className="mb-3 text-gray-500 font-light text-sm">
              Último update
            </p>
            <p>152</p>
          </div>

          {/* Funcionários */}
          <div className="bg-white p-5 rounded-2xl flex flex-col items-center w-full">
            <Image
              src="/images/funcLogo.svg"
              alt="Empresa Logo"
              width={80}
              height={80}
            />
            <h1 className="mb-3 text-xl font-bold">Funcionários</h1>
            <Separator className="mb-3" />
            <p className="mb-3 text-gray-500 font-light text-sm">
              Último update
            </p>
            <p>201</p>
          </div>

          {/* Cheque */}
          <div className="bg-white p-5 rounded-2xl flex flex-col items-center w-full">
            <Image
              src="/images/chequeLogo.svg"
              alt="Empresa Logo"
              width={80}
              height={80}
            />
            <h1 className="mb-3 text-xl font-bold">Cheques</h1>
            <Separator className="mb-3" />
            <p className="mb-3 text-gray-500 font-light text-sm">
              Último update
            </p>
            <p>15</p>
          </div>

          {/* Dinheiro */}
          <div className="bg-white p-5 rounded-2xl flex flex-col items-center w-full">
            <Image
              src="/images/dinheiroLogo.svg"
              alt="Empresa Logo"
              width={80}
              height={80}
            />
            <h1 className="mb-3 text-xl font-bold">Dinheiro</h1>
            <Separator className="mb-3" />
            <p className="mb-3 text-gray-500 font-light text-sm">
              Último update
            </p>
            <p>$150,000.00</p>
          </div>
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

export default Corpo;
