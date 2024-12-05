-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_deposit" (
    "id" BIGSERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "claim" BOOLEAN NOT NULL,
    "address" VARCHAR(44) NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "tbl_deposit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_deposit" ADD CONSTRAINT "tbl_deposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
