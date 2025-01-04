'use client'

import { ErrorMessage, Field, FormikProps } from 'formik'
import { Answer } from 'interfaces/database_tables'
import { Submit_Quiz } from 'interfaces/quiz_submission'
import { SubmitContext } from 'pages/en/quiz/takequiz'
import { useContext } from 'react'

export default function TakeQuizInputField({
  type,
  formikProps,
  answer,
}: {
  type: string
  formikProps: FormikProps<Submit_Quiz>
  answer: Answer
}) {
  if (type !== 'radio' && type !== 'checkbox') return null

  const submitted = useContext(SubmitContext)
  const { values, errors, touched, handleChange } = formikProps

  return (
    <div className="flex items-center justify-normal pl-4 sm:pl-6">
      <label
        className="relative flex cursor-pointer items-center"
        htmlFor={`custom-${answer.id}`}
      >
        <Field
          type={type}
          name={`qnas[${answer.qnaID}].answers`}
          onChange={handleChange}
          value={`${answer.id}`}
          disabled={submitted}
          aria-label={`Answer: ${answer.answer}`}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-stone-200 shadow-sm transition-all checked:border-stone-800 checked:bg-stone-800 hover:shadow"
          id={`custom-${answer.id}`}
        />
        <ErrorMessage name={`checkbox-group-${answer.qnaID}`} />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
          </svg>
        </span>
      </label>
      <label
        className="ml-5 cursor-pointer text-sm text-black dark:text-white"
        htmlFor={`custom-${answer.id}`}
      >
        {answer.answer}
        {answer.correct ? ' Correct' : ' Incorrect'}
      </label>
    </div>
  )
}
