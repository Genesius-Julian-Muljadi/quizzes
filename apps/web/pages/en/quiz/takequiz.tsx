'use client'

import AnswerContainer from '@/components/quiz/AnswerContainer'
import QnAAccordion from '@/components/quiz/QnAAccordion'
import TakeQuizContainer from '@/components/quiz/TakeQuizContainer'
import TakeQuizInputField from '@/components/quiz/TakeQuizInputField'
import TakeQuizLayout from '@/layouts/quiz/TakeQuizLayout'
import BasicSpinner from 'assets/BasicSpinner'
import { Form, Formik, FormikProps } from 'formik'
import { Answer, QnA, Quiz } from 'interfaces/database_tables'
import { Submit_Quiz } from 'interfaces/quiz_submission'
import { TakeQuizSchema } from 'lib/validationSchemas/en/takeQuizSchema'
import { createContext, useState } from 'react'

const SubmitContext = createContext<boolean>(false)

export default function TakeQuizEn({ quiz }: { quiz: Quiz }) {
  const [submitted, setSubmitted] = useState<boolean>(false)

  return (
    <TakeQuizLayout quiz={quiz}>
      <TakeQuizContainer quiz={quiz}>
        <SubmitContext.Provider value={submitted}>
          <Formik
            initialValues={{
              id: quiz.id!,
              qnas: [],
            }}
            validationSchema={TakeQuizSchema}
            onSubmit={(values) => {
              setSubmitted(true)
              console.log(JSON.stringify(values, null, 2))
              // postLogin(values)
            }}
          >
            {(props: FormikProps<Submit_Quiz>) => {
              const { values, errors, touched, handleChange } = props

              return (
                <Form className="flex w-full flex-col gap-0 bg-transparent px-4 py-8 shadow-lg">
                  {quiz.qnas.map((qna: QnA, index) => (
                    <div key={index}>
                      <QnAAccordion qNumber={index + 1} qna={qna}>
                        <AnswerContainer qna={qna}>
                          {qna.answers.map((answer: Answer, idx) => (
                            <div key={idx}>
                              <TakeQuizInputField
                                type={qna.multiple ? 'checkbox' : 'radio'}
                                formikProps={props}
                                answer={answer}
                              />
                            </div>
                          ))}
                        </AnswerContainer>
                      </QnAAccordion>
                    </div>
                  ))}
                  {/* <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-semibold text-black">
                      Password{' '}
                    </label>
                    <Field
                      type="password"
                      name="password"
                      onChange={handleChange}
                      values={values.password}
                      placeholder="Type password here"
                      disabled={submitted}
                      aria-label="Password text box"
                      className={`mt-2 flex h-10 w-full items-center rounded bg-gray-100 px-2 text-sm text-black focus:outline-1 focus:ring-zinc-600 sm:h-12 sm:px-4 sm:text-base`}
                    />
                    {touched.password && errors.password ? (
                      <div className="text-xs text-red-600">{errors.password}</div>
                    ) : null}
                  </div> */}
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
                  </div>
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
