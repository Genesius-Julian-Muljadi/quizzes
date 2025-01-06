'use client'

import { History, Quiz } from 'interfaces/database_tables'
import { ReactNode } from 'react'

export default function HistoryPostAccordion({
  history,
  quiz,
  children,
}: {
  history: History
  quiz: Quiz | undefined
  children: ReactNode
}) {
  if (!quiz) return <div>Quiz not found!</div>

  function toggleAccordion(index: number) {
    const content = document.getElementById(`content-history-${index}`) as HTMLDivElement
    const icon = document.getElementById(`icon-history-${index}`) as HTMLSpanElement

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

  function calculateScore(corrects: number, qnas: number): number {
    return Math.floor((corrects / qnas) * 10000) / 100
  }
  const score: number = calculateScore(history.score, quiz.qCount)

  return (
    <div>
      <div className="border-b border-slate-200">
        <button
          onClick={() => toggleAccordion(history.id ? history.id : 0)}
          type="button"
          className="flex w-full items-center justify-between py-5 text-slate-800 dark:text-slate-200"
        >
          <div>
            <span className="font-bold">{`${quiz.title}`}</span>
          </div>
          <div className="flex flex-row-reverse gap-4">
            <span
              id={`icon-history-${history.id ? history.id : 0}`}
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
            <div className="font-bold">
              {`Score: `}
              <span
                className={`${score >= 80 ? 'text-green-400 dark:text-green-600' : score >= 40 ? 'text-yellow-400 dark:text-yellow-600' : 'text-red-500 dark:text-red-700'}`}
              >
                {`${score}%`}
              </span>
            </div>
          </div>
        </button>
        <div
          id={`content-history-${history.id ? history.id : 0}`}
          className="max-h-0 overflow-auto transition-all duration-300 ease-in-out"
        >
          <div className="pb-5">{children}</div>
        </div>
      </div>
    </div>
  )
}
