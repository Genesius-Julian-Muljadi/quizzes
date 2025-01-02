import { QnA } from 'interfaces/database_tables'
import { ReactNode } from 'react'

export default function AnswerContainer(
  { qna, children }: { qna: QnA; children: ReactNode }
  // { children }: { children: ReactNode }
) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  )
}
