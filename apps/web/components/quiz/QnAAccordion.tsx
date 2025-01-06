'use client'

import { QnA } from 'interfaces/database_tables'
import { ReactNode } from 'react'

export default function QnAAccordion({
  qNumber,
  qna,
  children,
}: {
  qNumber: number
  qna: QnA
  children: ReactNode
}) {
  function toggleAccordion(index: number) {
    const content = document.getElementById(`content-${qna.id}-${index}`) as HTMLDivElement
    const icon = document.getElementById(`icon-${qna.id}-${index}`) as HTMLSpanElement

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

  return (
    <div>
      <div className="border-b border-slate-200">
        <button
          onClick={() => toggleAccordion(qNumber)}
          type="button"
          className="flex w-full items-center justify-between py-5 text-slate-800 dark:text-slate-200"
        >
          <div className="flex flex-col gap-0">
            <span className="font-bold">{`${qNumber}. ${qna.question}`}</span>
            <span
              className={`${qna.multiple ? '' : 'hidden '}font-light pl-4 text-left text-sm italic`}
            >
              Select all correct answers
            </span>
          </div>
          <span
            id={`icon-${qna.id}-${qNumber}`}
            className="text-slate-800 transition-transform duration-300 dark:text-slate-200"
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
          </span>
        </button>
        <div
          id={`content-${qna.id}-${qNumber}`}
          className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
        >
          <div className="pb-5 text-sm text-slate-500">{children}</div>
        </div>
      </div>
    </div>
  )
}
