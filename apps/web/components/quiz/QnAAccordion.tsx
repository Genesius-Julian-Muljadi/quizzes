import { QnA } from 'interfaces/database_tables'
import { ReactNode } from 'react'

export default function QnAAccordion(
  { qNumber, qna, children }: { qNumber: number; qna: QnA; children: ReactNode }
  // { qna }: { qna: QnA },
  // { children }: { children: ReactNode }
) {
  return (
    <div
      className="block w-full"
      aria-disabled="false"
      data-dui-accordion-container
      data-dui-accordion-mode="exclusive"
    >
      <div
        className="flex w-full cursor-pointer items-center justify-between py-5 text-left text-stone-800 dark:text-white"
        data-dui-accordion-toggle
        data-dui-accordion-target={`#allOpenAccordion${qNumber}`}
        aria-expanded="true"
      >
        <div className="flex flex-col gap-0">
          <p className="font-bold">{`${qNumber}. ${qna.question}`}</p>
          <p className={`${qna.multiple ? '' : 'hidden '}font-light pl-4 text-sm italic`}>
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
        id={`allOpenAccordion${qNumber}`}
        className="overflow-hidden transition-all duration-300"
      >
        {children}
      </div>
    </div>
  )
}
