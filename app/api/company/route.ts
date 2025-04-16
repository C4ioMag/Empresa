import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST - Cadastrar empresa
export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    const company = await prisma.company.create({
      data: { name },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao cadastrar empresa" },
      { status: 500 }
    );
  }
}

// GET - Buscar todas as empresas
export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar empresas" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar empresa
export async function PUT(request: Request) {
  try {
    const { id, name } = await request.json();

    if (!id || !name) {
      return NextResponse.json(
        { error: "ID e Nome são obrigatórios" },
        { status: 400 }
      );
    }

    const updated = await prisma.company.update({
      where: { id: Number(id) },
      data: { name },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar empresa" },
      { status: 500 }
    );
  }
}

// DELETE - Excluir empresa por ID
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    if (isNaN(Number(id))) {
      return NextResponse.json(
        { error: "ID deve ser um número válido" },
        { status: 400 }
      );
    }

    // Verificar se a empresa tem funcionários associados
    const employees = await prisma.employee.findMany({
      where: { companyId: Number(id) },
    });

    if (employees.length > 0) {
      return NextResponse.json(
        {
          error:
            "Não é possível excluir a empresa porque existem funcionários associados.",
        },
        { status: 400 }
      );
    }

    // Deletar a empresa
    const deleted = await prisma.company.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Erro ao deletar empresa:", error);
    return NextResponse.json(
      { error: "Erro ao deletar empresa" },
      { status: 500 }
    );
  }
}
