import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const list = await prisma.inventoryList.findMany({
      include: { list: true },
      orderBy: { category: "asc" },
    });

    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    console.error("Error fetching list:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//add new list
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { category, label, perBox }: any = body;

    console.log(body, "body -->");

    if (!category || !label || perBox === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const perBoxInt = parseInt(perBox);
    if (isNaN(perBoxInt)) {
      return NextResponse.json(
        { error: "perBox must be a number" },
        { status: 400 }
      );
    }

    // 1. Try to find existing inventory list by category
    let inventoryList = await prisma.inventoryList.findFirst({
      where: { category },
    });

    // 2. If not found, create it
    if (!inventoryList) {
      inventoryList = await prisma.inventoryList.create({
        data: { category },
      });
    }

    // 3. Create the wine
    const wine = await prisma.wine.create({
      data: {
        label,
        perBox: perBoxInt,
        inventoryListId: inventoryList.id,
      },
    });
    return NextResponse.json(wine, { status: 201 });
  } catch (error) {
    console.error("Error add list:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
