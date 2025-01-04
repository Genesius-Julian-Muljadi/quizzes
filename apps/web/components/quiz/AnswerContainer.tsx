import { QnA } from 'interfaces/database_tables'
import { ReactNode } from 'react'

export default function AnswerContainer({ qna, children }: { qna: QnA; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 border-t border-stone-800 pt-3 *:my-auto dark:border-stone-200 sm:grid-cols-2">
      {children}
    </div>
  )
}
