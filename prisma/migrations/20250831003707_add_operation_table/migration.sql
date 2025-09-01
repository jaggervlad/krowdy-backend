-- CreateTable
CREATE TABLE "public"."Operation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "plantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Operation" ADD CONSTRAINT "Operation_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "public"."Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
