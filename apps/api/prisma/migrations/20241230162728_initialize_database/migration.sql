-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quizzes" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "qCount" INTEGER NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz_QnA" (
    "id" SERIAL NOT NULL,
    "quizID" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "multiple" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Quiz_QnA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz_Answers" (
    "id" SERIAL NOT NULL,
    "qnaID" INTEGER NOT NULL,
    "answer" VARCHAR(50) NOT NULL,
    "correct" BOOLEAN NOT NULL,

    CONSTRAINT "Quiz_Answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Quizzes" ADD CONSTRAINT "Quizzes_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_QnA" ADD CONSTRAINT "Quiz_QnA_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_Answers" ADD CONSTRAINT "Quiz_Answers_qnaID_fkey" FOREIGN KEY ("qnaID") REFERENCES "Quiz_QnA"("id") ON DELETE CASCADE ON UPDATE CASCADE;
