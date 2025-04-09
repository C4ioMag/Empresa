import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Criar funcionário
export async function POST(request: Request) {
  const { name, companyId } = await request.json();

  const employee = await prisma.employee.create({
    data: {
      name,
      company: {
        connect: { id: companyId },
      },
    },
  });

  return NextResponse.json(employee);
}

// Listar funcionários
export async function GET() {
  const employees = await prisma.employee.findMany({
    include: { company: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(employees);
}

// Atualizar funcionário
export async function PUT(request: Request) {
  const { id, name, companyId } = await request.json();

  const updatedEmployee = await prisma.employee.update({
    where: { id },
    data: {
      name,
      company: {
        connect: { id: companyId },
      },
    },
  });

  return NextResponse.json(updatedEmployee);
}

// Deletar funcionário
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
  }

  await prisma.employee.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Funcionário deletado com sucesso" });
}
