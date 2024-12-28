-- DropForeignKey
ALTER TABLE `quiz_answers` DROP FOREIGN KEY `Quiz_Answers_qnaID_fkey`;

-- DropForeignKey
ALTER TABLE `quiz_qna` DROP FOREIGN KEY `Quiz_QnA_quizID_fkey`;

-- DropIndex
DROP INDEX `Quiz_Answers_qnaID_fkey` ON `quiz_answers`;

-- DropIndex
DROP INDEX `Quiz_QnA_quizID_fkey` ON `quiz_qna`;

-- AddForeignKey
ALTER TABLE `Quiz_QnA` ADD CONSTRAINT `Quiz_QnA_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quizzes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz_Answers` ADD CONSTRAINT `Quiz_Answers_qnaID_fkey` FOREIGN KEY (`qnaID`) REFERENCES `Quiz_QnA`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
