import { Quiz } from 'interfaces/database_tables'
import { ReactNode } from 'react'

export default function TakeQuizContainer({ quiz, children }: { quiz: Quiz; children: ReactNode }) {
  return (
    <div className="mx-auto my-8 rounded-lg border border-gray-600 bg-transparent px-0 py-8 dark:border-gray-300 sm:px-2 sm:py-10">
      <h2 className="mb-4 text-center text-2xl font-medium">{quiz.title}</h2>
      <div className="">{children}</div>
    </div>
  )
}
