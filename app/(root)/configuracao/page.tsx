import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";
import React from "react";

const Settings = () => {
  return (
    <div className="bg-gray-100 flex flex-col p-10 h-screen rounded-4xl">
      <h1 className="text-[25px] font-bold mb-10 text-zinc-700 flex items-center gap-2">
        <Settings2 className="w-10 h-10" />
        Configurações
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">Nome</Label>
          <Input className="h-12 w-200 bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none" />
        </div>
        <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
          <Label className="mb-3">E-mail</Label>
          <Input className="h-12 w-200 bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none" />
        </div>
        <Button className="h-12 w-80 cursor-pointer bg-[#7288FA] rounded-full hover:bg-blue-400">
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default Settings;
