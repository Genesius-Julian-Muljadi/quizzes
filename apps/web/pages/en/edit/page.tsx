'use client'

import AnswerContainer from '@/components/quiz/AnswerContainer'
import CreateQnAAccordion from '@/components/quiz/CreateQnAAccordion'
import CreateQuizContainer from '@/components/quiz/CreateQuizContainer'
import CreateQuizLayout from '@/layouts/quiz/CreateQuizLayout'
import BasicSpinner from 'assets/BasicSpinner/BasicSpinner'
import Check from 'assets/Check'
import Trashcan from 'assets/Trashcan'
import X from 'assets/X'
import axios from 'axios'
import ErrorHandler from 'errorhandler/error-handler'
import { ArrayHelpers, ErrorMessage, Field, FieldArray, Form, Formik, FormikProps } from 'formik'
import { Quiz } from 'interfaces/database_tables'
import { Create_Answer, Create_QnA, Create_Quiz } from 'interfaces/quiz_creation'
import { CreateQuizSchema } from 'lib/validationSchemas/en/createQuizSchema'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'

export default function EditQuizEn({ quiz }: { quiz: Quiz }) {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const router = useRouter()

  function convertQuiztoCreateQuiz(quiz: Quiz): Create_Quiz {
    const output: Create_Quiz = { title: quiz.title, qnas: [] }

    for (let i = 0; i < quiz.qnas.length; i++) {
      const qna: Create_QnA = { question: quiz.qnas[i].question, answers: [] }

      for (let j = 0; j < quiz.qnas[i].answers.length; j++) {
        const answer: Create_Answer = {
          answer: quiz.qnas[i].answers[j].answer,
          correct: quiz.qnas[i].answers[j].correct ? 'true' : 'false',
        }

        qna.answers.push(answer)
      }

      output.qnas.push(qna)
    }

    return output
  }

  const postEditQuiz = async (params: Create_Quiz) => {
    try {
      const API: string = process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/edit/' + quiz.id
      const output = await axios.post(API, { quiz: params })

      if (!output) throw Error()

      Swal.fire({
        icon: 'success',
        title: 'Quiz editted!',
      })

      router.push('/edit')
      router.refresh()
    } catch (err) {
      setSubmitted(false)
      ErrorHandler(err)
    }
  }

  return (
    <Formik
      initialValues={convertQuiztoCreateQuiz(quiz)}
      validationSchema={CreateQuizSchema}
      onSubmit={(values) => {
        setSubmitted(true)
        // console.log(values)
        postEditQuiz(values)
      }}
    >
      {(props: FormikProps<Create_Quiz>) => {
        const { values, errors, handleChange, submitCount } = props

        return (
          <Form>
            <CreateQuizLayout formikProps={props} submitted={submitted}>
              <CreateQuizContainer>
                <div className="flex w-full flex-col gap-0 bg-transparent px-4 py-8 shadow-lg">
                  <FieldArray name="qnas">
                    {(arrayHelpers: ArrayHelpers) => (
                      <div>
                        {values.qnas.map((qna: Create_QnA, qnaIndex) => (
                          <div key={`qna-create-${qnaIndex}`}>
                            <CreateQnAAccordion
                              qNumber={qnaIndex + 1}
                              formikProps={props}
                              submitted={submitted}
                              qnaArrayHelpers={arrayHelpers}
                            >
                              <FieldArray name={`qnas[${qnaIndex}].answers`}>
                                {(answersArrayHelpers: ArrayHelpers) => (
                                  <AnswerContainer>
                                    {values.qnas[qnaIndex].answers.map(
                                      (answer: Create_Answer, answerIndex) => (
                                        <div
                                          key={`answer-create-${answerIndex}`}
                                          className="flex flex-col justify-normal gap-3 pl-4 pr-4 sm:pl-6 sm:pr-0"
                                        >
                                          <div className="flex flex-row gap-2">
                                            <Field
                                              type="text"
                                              name={`qnas[${qnaIndex}].answers[${answerIndex}].answer`}
                                              onChange={(e) => {
                                                handleChange(e)
                                              }}
                                              values={
                                                values.qnas[qnaIndex].answers[answerIndex].answer
                                              }
                                              disabled={submitted}
                                              placeholder={`Answer ${answerIndex + 1}`}
                                              aria-label={`Insert answer ${answerIndex + 1} text box`}
                                              id={`create-qnas[${qnaIndex}].answers[${answerIndex}].answer`}
                                              className="mt-2 flex h-10 w-full items-center rounded bg-gray-100 px-2 focus:outline-1 focus:ring-zinc-600 dark:bg-gray-900 dark:text-white sm:h-12 sm:px-4"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => {
                                                answersArrayHelpers.remove(answerIndex)

                                                setTimeout(() => {
                                                  const accordion = document.getElementById(
                                                    `content-create-${qnaIndex + 1}`
                                                  ) as HTMLDivElement
                                                  accordion.style.maxHeight =
                                                    accordion.scrollHeight + 'px'
                                                }, 5)
                                              }}
                                              className="mt-2 grid cursor-pointer text-3xl text-stone-800 dark:text-stone-200"
                                            >
                                              <div className="my-auto size-9 rounded border-2 border-[#86898d] px-[0.4rem] py-[0.32rem] text-slate-200">
                                                <Trashcan />
                                              </div>
                                            </button>
                                          </div>
                                          <ErrorMessage
                                            name={`qnas[${qnaIndex}].answers[${answerIndex}].answer`}
                                          >
                                            {(err) => (
                                              <div
                                                aria-label={`Error message: ${err}`}
                                                className="flex w-full flex-col text-center text-sm text-red-600"
                                              >
                                                <span>{err}</span>
                                              </div>
                                            )}
                                          </ErrorMessage>
                                          <div className="ml-4 flex flex-row gap-1">
                                            <div className="flex items-center justify-normal pl-4 sm:pl-6">
                                              <label
                                                className="relative flex cursor-pointer items-center"
                                                htmlFor={`create-qnas[${qnaIndex}].answers[${answerIndex}].correct-true`}
                                              >
                                                <Field
                                                  type="radio"
                                                  name={`qnas[${qnaIndex}].answers[${answerIndex}].correct`}
                                                  onChange={(e) => {
                                                    handleChange(e)
                                                  }}
                                                  value="true"
                                                  disabled={submitted}
                                                  aria-label="Set answer as correct"
                                                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-stone-200 shadow-sm transition-all checked:border-stone-800 checked:bg-stone-800 hover:shadow dark:checked:border-primary-500 dark:checked:bg-primary-500"
                                                  id={`create-qnas[${qnaIndex}].answers[${answerIndex}].correct-true`}
                                                />
                                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
                                                  <svg
                                                    className="h-3 w-3"
                                                    viewBox="0 0 12 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <circle
                                                      cx="6"
                                                      cy="6"
                                                      r="4"
                                                      fill="currentColor"
                                                    />
                                                  </svg>
                                                </span>
                                              </label>
                                              <label
                                                className="ml-2 cursor-pointer"
                                                htmlFor={`create-qnas[${qnaIndex}].answers[${answerIndex}].correct-true`}
                                              >
                                                <div className="mt-[-0.25rem] size-6">
                                                  <Check />
                                                </div>
                                              </label>
                                            </div>
                                            <div className="flex items-center justify-normal pl-4 sm:pl-6">
                                              <label
                                                className="relative flex cursor-pointer items-center"
                                                htmlFor={`create-qnas[${qnaIndex}].answers[${answerIndex}].correct-false`}
                                              >
                                                <Field
                                                  type="radio"
                                                  name={`qnas[${qnaIndex}].answers[${answerIndex}].correct`}
                                                  onChange={(e) => {
                                                    handleChange(e)
                                                  }}
                                                  value="false"
                                                  disabled={submitted}
                                                  aria-label="Set answer as incorrect"
                                                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-stone-200 shadow-sm transition-all checked:border-stone-800 checked:bg-stone-800 hover:shadow dark:checked:border-primary-500 dark:checked:bg-primary-500"
                                                  id={`create-qnas[${qnaIndex}].answers[${answerIndex}].correct-false`}
                                                />
                                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
                                                  <svg
                                                    className="h-3 w-3"
                                                    viewBox="0 0 12 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <circle
                                                      cx="6"
                                                      cy="6"
                                                      r="4"
                                                      fill="currentColor"
                                                    />
                                                  </svg>
                                                </span>
                                              </label>
                                              <label
                                                className="ml-3 cursor-pointer"
                                                htmlFor={`create-qnas[${qnaIndex}].answers[${answerIndex}].correct-false`}
                                              >
                                                <div className="mt-[-0.25rem] size-4">
                                                  <X />
                                                </div>
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        answersArrayHelpers.push({
                                          answer: '',
                                          correct: 'false',
                                        })

                                        setTimeout(() => {
                                          const accordion = document.getElementById(
                                            `content-create-${qnaIndex + 1}`
                                          ) as HTMLDivElement
                                          accordion.style.maxHeight = accordion.scrollHeight + 'px'
                                        }, 5)
                                      }}
                                      aria-label="Add another answer"
                                      className="mx-4 grid max-h-full min-h-20 cursor-pointer rounded border border-slate-800 text-3xl text-stone-800 dark:border-slate-200 dark:text-stone-200"
                                    >
                                      <div className="m-auto flex">
                                        <p className="m-auto flex flex-row gap-2">
                                          +
                                          <span className="my-auto text-xl">
                                            Add another answer
                                          </span>
                                          +
                                        </p>
                                      </div>
                                    </button>
                                  </AnswerContainer>
                                )}
                              </FieldArray>
                            </CreateQnAAccordion>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              question: '',
                              answers: [
                                {
                                  answer: '',
                                  correct: 'false',
                                },
                              ],
                            })
                          }
                          aria-label="Add another question"
                          className="mt-8 grid h-20 w-full cursor-pointer rounded border border-slate-800 text-3xl text-stone-800 dark:border-slate-200 dark:text-stone-200"
                        >
                          <div className="m-auto flex">
                            <p className="mx-auto flex gap-2">
                              +<span className="my-auto text-xl">Add another question</span>+
                            </p>
                          </div>
                        </button>
                        <div className="relative mt-8">
                          <button
                            type="submit"
                            className="mx-auto flex h-12 items-center justify-center rounded bg-blue-600 px-6 text-sm font-semibold text-blue-100 shadow-sm shadow-slate-400 hover:bg-blue-700 sm:w-64"
                            aria-label="Submit quiz button"
                          >
                            <span>Submit edit</span>
                          </button>
                          <div
                            className={`${submitted ? '' : 'hidden '}absolute right-[15%] top-1/4 transform`}
                          >
                            <BasicSpinner />
                          </div>
                          {(errors.qnas || errors.title) && submitCount > 0 ? (
                            <div className="mt-2 flex flex-col text-center text-sm text-red-600">
                              <span>{'Your quiz has some errors'}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </CreateQuizContainer>
            </CreateQuizLayout>
          </Form>
        )
      }}
    </Formik>
  )
}
