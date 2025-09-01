-- CreateTable
CREATE TABLE "public"."OperationCost" (
    "id" TEXT NOT NULL,
    "operationId" TEXT NOT NULL,
    "volumeRange" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperationCost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."OperationCost" ADD CONSTRAINT "OperationCost_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "public"."Operation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
