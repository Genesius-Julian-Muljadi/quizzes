'use client'

import Trashcan from 'assets/Trashcan'
import { ArrayHelpers, ErrorMessage, Field, FormikProps } from 'formik'
import { Create_Quiz } from 'interfaces/quiz_creation'
import { ReactNode } from 'react'

export default function CreateQnAAccordion({
  qNumber,
  formikProps,
  submitted,
  qnaArrayHelpers,
  children,
}: {
  qNumber: number
  formikProps: FormikProps<Create_Quiz>
  submitted: boolean
  qnaArrayHelpers: ArrayHelpers
  children: ReactNode
}) {
  function toggleAccordion(index: number) {
    const content = document.getElementById(`content-create-${index}`) as HTMLDivElement
    const icon = document.getElementById(`icon-create-${index}`) as HTMLSpanElement

    // SVG for Down icon
    const downSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        `

    // SVG for Up icon
    const upSVG = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
            <path fillRule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
          </svg>
        `

    // Toggle the content's max-height for smooth opening and closing
    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
      content.style.maxHeight = '0'
      if (icon) icon.innerHTML = upSVG
    } else {
      content.style.maxHeight = content.scrollHeight + 'px'
      if (icon) icon.innerHTML = downSVG
    }
  }

  const { values, handleChange } = formikProps

  return (
    <div>
      <div className="border-b border-slate-200">
        <div className="grid grid-cols-1 grid-rows-1">
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex flex-col gap-2 py-5">
            <div className="flex w-full items-center justify-between text-slate-800 *:z-10 dark:text-slate-200">
              <div className="mr-4 flex w-full flex-col gap-0 sm:mr-6">
                <div className="flex flex-row gap-2">
                  <span className="my-auto font-bold">{`${qNumber}.`}</span>
                  <Field
                    type="text"
                    name={`qnas[${qNumber - 1}].question`}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    values={values.qnas[qNumber - 1].question}
                    disabled={submitted}
                    placeholder="Your question"
                    aria-label={`Insert question text box as question ${qNumber}`}
                    className="mt-2 flex h-10 w-full items-center rounded bg-gray-100 px-2 font-bold focus:outline-1 focus:ring-zinc-600 dark:bg-gray-900 sm:h-12 sm:px-4"
                  />
                </div>
              </div>
              <div className="flex flex-row-reverse gap-4">
                <button
                  type="button"
                  id={`icon-create-${qNumber}`}
                  onClick={() => toggleAccordion(qNumber)}
                  className="my-auto cursor-pointer text-slate-800 transition-transform duration-300 dark:text-slate-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    qnaArrayHelpers.remove(qNumber - 1)
                  }}
                  className="mt-2 text-3xl text-stone-800 dark:text-stone-200"
                >
                  <div className="size-9 rounded border-2 border-[#86898d] px-[0.4rem] py-[0.32rem] text-slate-200 hover:border-[3px] hover:bg-stone-100 active:animate-ping dark:hover:bg-stone-800">
                    <Trashcan />
                  </div>
                </button>
              </div>
            </div>
            <ErrorMessage name={`qnas[${qNumber - 1}].question`}>
              {(err) => (
                <div
                  aria-label={`Error message: ${err}`}
                  className="mt-2 flex flex-col text-center text-sm text-red-600"
                >
                  <span>{err}</span>
                </div>
              )}
            </ErrorMessage>
          </div>
          <button
            type="button"
            onClick={() => toggleAccordion(qNumber)}
            className="col-start-1 col-end-2 row-start-1 row-end-2 h-full w-full cursor-pointer bg-transparent"
            id={`accordion-background-${qNumber}`}
          />
        </div>
        <div
          id={`content-create-${qNumber}`}
          className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="pb-5 text-sm text-slate-500">{children}</div>
        </div>
      </div>
    </div>
  )
}
