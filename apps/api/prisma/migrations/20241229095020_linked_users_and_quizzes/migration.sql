/*
  Warnings:

  - Added the required column `userID` to the `Quizzes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quizzes` ADD COLUMN `userID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Quizzes` ADD CONSTRAINT `Quizzes_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
