/*
  Warnings:

  - Added the required column `title` to the `Quizzes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quizzes` ADD COLUMN `title` VARCHAR(30) NOT NULL;
