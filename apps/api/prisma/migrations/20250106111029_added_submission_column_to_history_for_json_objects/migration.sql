/*
  Warnings:

  - Added the required column `submission` to the `Quiz_History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz_History" ADD COLUMN     "submission" JSONB NOT NULL;
