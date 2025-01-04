'use client'

import Accordion from '@/components/Accordion'
import AnswerContainer from '@/components/quiz/AnswerContainer'
import QnAAccordion from '@/components/quiz/QnAAccordion'
import TakeQuizContainer from '@/components/quiz/TakeQuizContainer'
import TakeQuizInputField from '@/components/quiz/TakeQuizInputField'
import TakeQuizLayout from '@/layouts/quiz/TakeQuizLayout'
import BasicSpinner from 'assets/BasicSpinner/BasicSpinner'
import axios from 'axios'
import ErrorHandler from 'errorhandler/error-handler'
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikProps } from 'formik'
import { Answer, QnA, Quiz } from 'interfaces/database_tables'
import { Submit_Quiz } from 'interfaces/quiz_submission'
import { TakeQuizSchema } from 'lib/validationSchemas/en/takeQuizSchema'
import { useRouter } from 'next/navigation'
import { createContext, useState } from 'react'
import Swal from 'sweetalert2'

const SubmitContext = createContext<boolean>(false)

export default function TakeQuizEn({ quiz, userID }: { quiz: Quiz; userID: number }) {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const router = useRouter()

  const postTakeQuiz = async (params: Submit_Quiz) => {
    try {
      const API: string = process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/submit/' + userID
      const output = await axios.post(API, { quiz: params })

      if (!output) throw Error()

      Swal.fire({
        icon: 'success',
        title: `Score: ${output.data.data.score}`,
      })

      router.push('/')
      router.refresh()
    } catch (err) {
      setSubmitted(false)
      ErrorHandler(err)
    }
  }

  return (
    <TakeQuizLayout quiz={quiz}>
      <TakeQuizContainer quiz={quiz}>
        <SubmitContext.Provider value={submitted}>
          <Formik
            initialValues={{
              id: quiz.id!.toString(),
              qnas: [],
            }}
            validationSchema={TakeQuizSchema(quiz.qCount)}
            onSubmit={(values) => {
              setSubmitted(true)
              postTakeQuiz(values)
            }}
          >
            {(props: FormikProps<Submit_Quiz>) => {
              const { values, errors, touched, handleChange, setFieldValue, submitCount } = props

              return (
                <Form className="flex w-full flex-col gap-0 bg-transparent px-4 py-8 shadow-lg">
                  <Field type="hidden" name="id" value={quiz.id} />
                  <FieldArray name="qnas">
                    {(arrayHelpers) => (
                      <div>
                        {quiz.qnas.map((qna: QnA, index) => (
                          <div key={`qna-${index}`}>
                            <Field type="hidden" name={`qnas[${index}].id`} value={qna.id} />
                            <QnAAccordion qNumber={index + 1} qna={qna}>
                              <AnswerContainer qna={qna}>
                                {qna.answers.map((answer: Answer, idx) => (
                                  <div key={`answer-${idx}`}>
                                    <div className="flex items-center justify-normal pl-4 sm:pl-6">
                                      <label
                                        className="relative flex cursor-pointer items-center"
                                        htmlFor={`custom-${answer.id}`}
                                      >
                                        <Field
                                          type={qna.multiple ? 'checkbox' : 'radio'}
                                          name={`qnas[${index}].answers`}
                                          onChange={(e) => {
                                            setFieldValue(`qnas[${index}].id`, qna.id?.toString())
                                            handleChange(e)
                                          }}
                                          value={`${answer.id}`}
                                          disabled={submitted}
                                          aria-label={`Answer: ${answer.answer}`}
                                          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-stone-200 shadow-sm transition-all checked:border-stone-800 checked:bg-stone-800 hover:shadow"
                                          id={`custom-${answer.id}`}
                                        />
                                      </label>
                                      <label
                                        className="ml-5 cursor-pointer text-sm text-black dark:text-white"
                                        htmlFor={`custom-${answer.id}`}
                                      >
                                        {answer.answer}
                                        {/* Use this to display correct answers */}
                                        {/* {answer.correct ? ' Correct' : ' Incorrect'} */}
                                      </label>
                                    </div>
                                    <ErrorMessage name={`qnas[${index}].answers`} >
                                      {(err) => {
                                        console.log(err)
                                        return (
                                          <div className="mt-2 flex flex-col text-center text-sm text-red-600">
                                            <span>{err}</span>
                                          </div>
                                        )
                                      }}
                                    </ErrorMessage>
                                  </div>
                                ))}
                              </AnswerContainer>
                            </QnAAccordion>
                          </div>
                        ))}
                        <div className="relative mt-8">
                          <button
                            type="submit"
                            className="mx-auto flex h-12 items-center justify-center rounded bg-blue-600 px-6 text-sm font-semibold text-blue-100 shadow-sm shadow-slate-400 hover:bg-blue-700 sm:w-64"
                            aria-label="Submit button"
                          >
                            <span>Submit Answers</span>
                          </button>
                          <div
                            className={`${submitted ? '' : 'hidden '}absolute right-[15%] top-1/4 transform`}
                          >
                            <BasicSpinner />
                          </div>
                          {touched.qnas && errors.qnas && submitCount > 0 ? (
                            <div className="mt-2 flex flex-col text-center text-sm text-red-600">
                              <span>Please answer all questions</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </Form>
              )
            }}
          </Formik>
        </SubmitContext.Provider>
      </TakeQuizContainer>
    </TakeQuizLayout>
  )
}

export { SubmitContext }
