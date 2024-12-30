'use client'

import { AddQuizzes } from 'databasepopulation/populators/addquizzes'
import { AddUsers } from 'databasepopulation/populators/addusers'
import { DeleteAllData } from 'databasepopulation/populators/deleteall'

export default function DatabasePopulationPage() {
  const addUserCount = 30
  const addQuizCount = 70

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Database Population
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          These buttons are used to populate the database with random data.
        </p>
      </div>
      <div className="flex flex-col gap-4 pb-8 pt-6 *:mx-auto">
        <button
          onClick={() => AddUsers(addUserCount)}
          className="rounded border border-black px-2 py-1 dark:border-white"
        >
          Add {addUserCount} users
        </button>
        <button
          onClick={() => AddQuizzes(addQuizCount)}
          className="rounded border border-black px-2 py-1 dark:border-white"
        >
          Add {addQuizCount} quizzes
        </button>
        <button
          onClick={() => DeleteAllData()}
          className="rounded border border-black px-2 py-1 dark:border-white"
        >
          Delete all data
        </button>
      </div>
    </div>
  )
}
