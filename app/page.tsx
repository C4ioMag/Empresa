"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const emailPermitido = "domingos@gmail.com";
  const senhaPermitida = "domingos";

  const handleLogin = () => {
    if (email === emailPermitido && senha === senhaPermitida) {
      router.push("/menu");
    } else {
      setErro("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Lado esquerdo - Banner */}
      <div className="w-2/3 bg-[#7788FA] text-white flex flex-col items-start justify-center p-14 relative">
        <Image
          src="/images/logoBranca.svg"
          alt="Logo"
          width={250}
          height={250}
          className="mb-16 mt-16"
        />
        <h2 className="text-5xl font-bold mt-4">
          Manage your files the best way
        </h2>
        <p className="mt-4 text-start">
          Awesome, weve created the perfect place for you to store all your
          documents.
        </p>
        <Image
          src="/images/imagemLogin.svg"
          alt="Image"
          width={400}
          height={400}
          className="mt-auto mx-auto w-40 sm:w-52 md:w-64 lg:w-80 xl:w-80 2xl:w-[450px] h-auto"
        />
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full flex flex-col justify-center items-center bg-white p-10">
        <h2 className="text-4xl font-bold text-gray-700 mb-6">Login</h2>
        <div className="w-150">
          {/* Campo Usuário */}
          <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
            <Label className="mb-3 font-light">Username</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-8 w-full bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none"
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-5 bg-white p-3 rounded-xl shadow-lg border-none">
            <Label className="mb-3 font-light">Password</Label>
            <Input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="h-8 w-full bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:ring-0 focus-visible:outline-none"
            />
          </div>

          {/* Mensagem de erro */}
          {erro && <p className="text-red-500 mb-3">{erro}</p>}

          {/* Botão Login */}
          <Button
            onClick={handleLogin}
            className="w-full mt-5 bg-[#7788FA] text-white py-3 cursor-pointer rounded-full h-16 hover:bg-[#5a4dcf] shadow-lg shadow-[#7788FA]"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
