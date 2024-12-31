import { QnA } from 'interfaces/database_tables'
import { ReactNode } from 'react'

export default function QnAAccordion(
  { qNumber }: { qNumber: number },
  { qna }: { qna: QnA },
  { children }: { children: ReactNode }
) {
  return (
    <div
      className="group block w-full"
      aria-disabled="false"
      data-dui-accordion-container
      data-dui-accordion-mode="all-open"
    >
      <div
        className="flex w-full cursor-pointer items-center justify-between py-5 text-left text-stone-800 dark:text-white"
        data-dui-accordion-toggle
        data-dui-accordion-target="#allOpenAccordion1"
        aria-expanded="true"
      >
        <div className="flex flex-col gap-1">
          <p className="font-medium">{`${qNumber}. ${qna.question}`}</p>
          <p className={`${qna.multiple ? '' : 'hidden '}font-light text-sm italic pl-2`}>
            Select all correct answers
          </p>
        </div>
        <svg
          data-dui-accordion-icon
          width="1.5em"
          height="1.5em"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
          className="h-4 w-4 rotate-180"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
      <div
        id="allOpenAccordion1"
        className="overflow-hidden border-b border-stone-200 transition-all duration-300 dark:border-stone-700"
      >
        {children}
      </div>
    </div>
  )
}
