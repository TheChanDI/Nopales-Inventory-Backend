-- CreateTable
CREATE TABLE "InventoryList" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "InventoryList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wine" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "perBox" INTEGER NOT NULL,
    "inventoryListId" INTEGER NOT NULL,

    CONSTRAINT "Wine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wine" ADD CONSTRAINT "Wine_inventoryListId_fkey" FOREIGN KEY ("inventoryListId") REFERENCES "InventoryList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
