/*
  Warnings:

  - The `completed` column on the `Todo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('todo', 'doing', 'done');

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "completed",
ADD COLUMN     "completed" "Status" NOT NULL DEFAULT 'todo';
