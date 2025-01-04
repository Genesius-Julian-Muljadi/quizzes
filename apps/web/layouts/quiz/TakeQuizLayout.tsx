import { ReactNode } from 'react'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { Quiz } from 'interfaces/database_tables'
import siteMetadata from '@/data/siteMetadata'
import ScrollTop from '@/components/ScrollTop'

export default function TakeQuizLayout({ quiz, children }: { quiz: Quiz; children: ReactNode }) {
  return (
    <SectionContainer>
      <ScrollTop />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Created on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <div>
                      {Intl.DateTimeFormat(siteMetadata.locale, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(quiz ? new Date(quiz.dateCreated!) : new Date())}
                    </div>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{quiz ? quiz.title : 'Title'}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr]">
            <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="max-w-none">{children}</div>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
