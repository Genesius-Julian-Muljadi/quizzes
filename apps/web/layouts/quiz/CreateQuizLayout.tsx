import { ReactNode } from 'react'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
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
  const { values, touched, errors, handleChange } = formikProps

  return (
    <SectionContainer>
      <ScrollTop />
      <article>
        <div>
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <div>
                <Field
                  type="text"
                  name="title"
                  onChange={handleChange}
                  values={values.title}
                  disabled={submitted}
                  placeholder="Title..."
                  aria-label="Insert title text box"
                  className="mt-2 flex h-auto w-full items-center rounded bg-gray-100 px-2 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 focus:outline-1 focus:ring-zinc-600 dark:bg-gray-900 dark:text-gray-100 sm:px-4 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
                />
                {touched.title && errors.title ? (
                  <div
                    aria-label={`Error message: ${String(errors.title)}`}
                    className="mt-2 flex flex-col text-center text-lg text-red-600"
                  >
                    <span>{String(errors.title)}</span>
                  </div>
                ) : null}
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
