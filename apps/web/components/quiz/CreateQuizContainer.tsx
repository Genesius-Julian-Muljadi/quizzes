import { ReactNode } from 'react'

export default function CreateQuizContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto my-8 rounded-lg border border-gray-600 bg-transparent px-0 py-8 dark:border-gray-300 sm:px-2 sm:py-10">
      <h2 className="mb-4 text-center text-xl font-medium">Create your quiz!</h2>
      <div className="">{children}</div>
    </div>
  )
}
