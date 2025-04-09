import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Criar novo cheque
export async function POST(request: Request) {
  try {
    const {
      cheque,
      employeePercentual,
      companyPercentual,
      companyId,
      employeeId,
    } = await request.json();

    const newCheque = await prisma.cheque.create({
      data: {
        cheque,
        employeePercentual: parseFloat(employeePercentual),
        companyPercentual: parseFloat(companyPercentual),
        company: {
          connect: { id: companyId },
        },
        employee: {
          connect: { id: employeeId },
        },
      },
    });

    return NextResponse.json(newCheque);
  } catch (error) {
    console.error("Erro ao criar cheque:", error);
    return NextResponse.json(
      { message: "Erro ao criar cheque." },
      { status: 500 }
    );
  }
}

// Buscar todos os cheques
export async function GET() {
  try {
    const cheques = await prisma.cheque.findMany({
      include: {
        company: true,
        employee: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cheques);
  } catch (error) {
    console.error("Erro ao buscar cheques:", error);
    return NextResponse.json(
      { message: "Erro ao buscar cheques." },
      { status: 500 }
    );
  }
}

// Atualizar um cheque
export async function PUT(request: Request) {
  try {
    const {
      id,
      cheque,
      employeePercentual,
      companyPercentual,
      companyId,
      employeeId,
    } = await request.json();

    const updatedCheque = await prisma.cheque.update({
      where: { id },
      data: {
        cheque,
        employeePercentual: parseFloat(employeePercentual),
        companyPercentual: parseFloat(companyPercentual),
        company: {
          connect: { id: companyId },
        },
        employee: {
          connect: { id: employeeId },
        },
      },
    });

    return NextResponse.json(updatedCheque);
  } catch (error) {
    console.error("Erro ao atualizar cheque:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar cheque." },
      { status: 500 }
    );
  }
}

// Deletar um cheque
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await prisma.cheque.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Cheque deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar cheque:", error);
    return NextResponse.json(
      { message: "Erro ao deletar cheque." },
      { status: 500 }
    );
  }
}
