-- CreateTable
CREATE TABLE "Quiz_History" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "quizID" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Quiz_History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quiz_History" ADD CONSTRAINT "Quiz_History_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz_History" ADD CONSTRAINT "Quiz_History_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
