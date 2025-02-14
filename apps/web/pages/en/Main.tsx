import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { Quiz } from 'interfaces/database_tables'
import SomethingWentWrong from '@/components/SomethingWentWrong'

const MAX_DISPLAY = 10

export default function Home({ quizzes }: { quizzes: Quiz[] }) {
  try {
    if (!quizzes) return null
    return (
      <>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pb-8 pt-6 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Quizzes
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!quizzes || !quizzes.length ? 'No quizzes found.' : null}
            {quizzes.slice(0, MAX_DISPLAY).map((quiz) => {
              const { id, title, qCount, dateCreated, updated } = quiz
              return (
                <li key={id} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <div className="flex flex-col gap-2">
                        <dl className="hidden sm:inline">
                          <dt className="text-gray-500 dark:text-gray-400">Created on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-600 dark:text-gray-300">
                            <time dateTime={new Date(dateCreated!).toISOString()}>
                              {formatDate(
                                new Date(dateCreated!).toISOString(),
                                siteMetadata.locale
                              )}
                            </time>
                          </dd>
                        </dl>
                        <dl>
                          <dt className="text-gray-500 dark:text-gray-400">Last updated on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-600 dark:text-gray-300">
                            <time dateTime={new Date(updated!).toISOString()}>
                              {formatDate(new Date(updated!).toISOString(), siteMetadata.locale)}
                            </time>
                          </dd>
                        </dl>
                      </div>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/quiz/${id}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                              {`${qCount} question${qCount === 1 ? '' : 's'}`}
                            </div>
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/quiz/${id}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Take quiz: "${title}"`}
                          >
                            Take quiz &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {quizzes.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/quiz"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All quizzes"
            >
              All Quizzes &rarr;
            </Link>
          </div>
        )}
      </>
    )
  } catch (err) {
    return <SomethingWentWrong err={err} />
  }
}
