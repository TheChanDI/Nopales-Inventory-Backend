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

//delete new list
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id }: any = body;
    console.log(id, "id backend -->");
    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const inventoryList = await prisma.wine.delete({
      where: { id },
    });
    return NextResponse.json(inventoryList, { status: 200 });
  } catch (error) {
    console.error("Error delete list:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//update item list
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, label, perBox }: any = body;

    const perBoxInt = parseInt(perBox);
    if (isNaN(perBoxInt)) {
      return NextResponse.json(
        { error: "perBox must be a number" },
        { status: 400 }
      );
    }

    const inventoryList = await prisma.wine.update({
      where: { id },
      data: {
        label,
        perBox: perBoxInt,
      },
    });

    console.log(inventoryList, "inventoryList -->");

    return NextResponse.json(inventoryList, { status: 200 });
  } catch (error) {
    console.error("Error update list:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
