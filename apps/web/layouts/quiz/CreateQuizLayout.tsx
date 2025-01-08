import { ReactNode } from 'react'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTop from '@/components/ScrollTop'
import { Field, FormikProps } from 'formik'
import { Create_Quiz } from 'interfaces/quiz_creation'

export default function CreateQuizLayout({
  formikProps,
  submitted,
  children,
}: {
  formikProps: FormikProps<Create_Quiz>
  submitted: boolean
  children: ReactNode
}) {
  const { values, errors, touched, handleChange } = formikProps

  return (
    <SectionContainer>
      <ScrollTop />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <div>
                <PageTitle>
                  <Field
                    type="text"
                    name="title"
                    onChange={handleChange}
                    values={values.title}
                    disabled={submitted}
                    placeholder="Insert sick title"
                    aria-label="Insert title text box"
                    className="mt-2 flex h-10 w-full items-center rounded bg-gray-100 px-2 focus:outline-1 focus:ring-zinc-600 dark:bg-gray-900 sm:h-12 sm:px-4"
                  />
                </PageTitle>
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
