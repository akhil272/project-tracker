/*
  Warnings:

  - You are about to alter the column `totalTime` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `totalTime` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "totalTime" SET NOT NULL,
ALTER COLUMN "totalTime" SET DEFAULT 0,
ALTER COLUMN "totalTime" SET DATA TYPE INTEGER;
