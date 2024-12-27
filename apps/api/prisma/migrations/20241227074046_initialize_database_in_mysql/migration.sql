-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quizzes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qCount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz_QnA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quizID` INTEGER NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `multiple` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz_Answers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qnaID` INTEGER NOT NULL,
    `answer` VARCHAR(50) NOT NULL,
    `correct` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Quiz_QnA` ADD CONSTRAINT `Quiz_QnA_quizID_fkey` FOREIGN KEY (`quizID`) REFERENCES `Quizzes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz_Answers` ADD CONSTRAINT `Quiz_Answers_qnaID_fkey` FOREIGN KEY (`qnaID`) REFERENCES `Quiz_QnA`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
