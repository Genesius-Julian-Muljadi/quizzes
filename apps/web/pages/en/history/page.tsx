import AnswerContainer from '@/components/quiz/AnswerContainer'
import HistoryPostAccordion from '@/components/quiz/HistoryPostAccordion'
import QnAAccordion from '@/components/quiz/QnAAccordion'
import TakeQuizContainer from '@/components/quiz/TakeQuizContainer'
import SomethingWentWrong from '@/components/SomethingWentWrong'
import CompletedQuizListLayout from '@/layouts/quiz/HistoryListLayout'
import TakeQuizLayout from '@/layouts/quiz/TakeQuizLayout'
import { Answer, History, QnA, Quiz } from 'interfaces/database_tables'
import { Submit_Quiz } from 'interfaces/quiz_submission'
import Link from 'next/link'

export default function CompletedQuizEn({
  pageLimit,
  histories,
  quizzes,
}: {
  pageLimit: number
  histories: History[]
  quizzes: Quiz[]
}) {
  try {
    if (!histories || !quizzes) return null

    const pageNumber = 1
    const initialDisplayPosts = histories.slice(
      pageLimit * (pageNumber - 1),
      pageLimit * pageNumber
    )
    const pagination = {
      currentPage: pageNumber,
      totalPages: Math.ceil(histories.length / pageLimit),
    }
    const displayPosts: History[] = initialDisplayPosts.length > 0 ? initialDisplayPosts : histories

    return (
      <CompletedQuizListLayout pagination={pagination} title="Completed quizzes">
        <div>
          {histories.length < 1 ? (
            <div className="text-center">
              <p className="text-lg font-semibold">You haven't taken any quizzes yet!</p>
              <Link
                href="/quiz"
                className="text-lg font-bold text-gray-900 underline hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500"
              >
                Take a quiz!
              </Link>
            </div>
          ) : (
            displayPosts.map((history: History, postIndex) => {
              const quiz = quizzes.find((value: Quiz) => {
                return history.quizID === value.id
              })
              const submission: Submit_Quiz = JSON.parse(history.submission)
              return (
                <div key={`history-history-${postIndex}`}>
                  <HistoryPostAccordion history={history} quiz={quiz}>
                    <TakeQuizLayout quiz={quiz!}>
                      <TakeQuizContainer quiz={quiz!}>
                        <div className="flex w-full flex-col gap-0 bg-transparent px-4 py-8 shadow-lg">
                          <div>
                            {quiz
                              ? quiz.qnas.map((qna: QnA, qnaIndex) => (
                                  <div key={`qna-history-${postIndex}-${qnaIndex}`}>
                                    <QnAAccordion qNumber={qnaIndex + 1} qna={qna}>
                                      <AnswerContainer>
                                        {qna.answers.map((answer: Answer, answerIndex) => {
                                          function checkAnswer(): boolean {
                                            const answers = submission.qnas[qnaIndex].answers
                                            if (Array.isArray(answers)) {
                                              return answers.includes(String(answer.id))
                                            } else {
                                              return answers === String(answer.id)
                                            }
                                          }
                                          return (
                                            <div
                                              key={`answer-history-${postIndex}-${qnaIndex}-${answerIndex}`}
                                            >
                                              <div className="flex items-center justify-normal pl-4 sm:pl-6">
                                                <label
                                                  className="relative flex cursor-pointer items-center"
                                                  htmlFor={`custom-${answer.id}`}
                                                >
                                                  <input
                                                    type={qna.multiple ? 'checkbox' : 'radio'}
                                                    name={`qnas[${qnaIndex}].answers`}
                                                    disabled={true}
                                                    checked={checkAnswer()}
                                                    aria-label={`Answer: ${answer.answer} ${answer.correct ? ' Correct' : ' Incorrect'}`}
                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-stone-200 shadow-sm transition-all checked:border-stone-800 checked:bg-stone-800 hover:shadow"
                                                    id={`custom-${answer.id}`}
                                                  />
                                                </label>
                                                <label
                                                  className="ml-5 cursor-pointer text-sm text-black dark:text-white"
                                                  htmlFor={`custom-${answer.id}`}
                                                >
                                                  {answer.answer}
                                                  <span
                                                    className={`${answer.correct ? 'text-green-400 dark:text-green-600' : 'text-red-500 dark:text-red-700'} font-bold`}
                                                  >
                                                    {answer.correct ? ' Correct' : ' Incorrect'}
                                                  </span>
                                                </label>
                                              </div>
                                            </div>
                                          )
                                        })}
                                      </AnswerContainer>
                                    </QnAAccordion>
                                  </div>
                                ))
                              : null}
                          </div>
                        </div>
                      </TakeQuizContainer>
                    </TakeQuizLayout>
                  </HistoryPostAccordion>
                </div>
              )
            })
          )}
        </div>
      </CompletedQuizListLayout>
    )
  } catch (err) {
    return <SomethingWentWrong err={err} />
  }
}
