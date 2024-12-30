'use client'

import axios from 'axios'
import ErrorHandler from 'errorhandler/error-handler'
import { Field, Form, Formik, FormikProps } from 'formik'
import { SignupUser } from 'interfaces/signupform'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { SignupSchema } from '../../../lib/validationSchemas/en/signupSchema'
import BasicSpinner from 'assets/BasicSpinner'

export default function SignupPageEn() {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const router = useRouter()

  const postSignup = async (params: SignupUser) => {
    try {
      const API: string = process.env.NEXT_PUBLIC_BASE_API_URL + '/auth/register'
      const output = await axios.post(
        API,
        {
          name: params.name,
          email: params.email,
          password: params.password,
        },
        { withCredentials: true }
      )

      if (!output) throw Error();

      Swal.fire({
        icon: 'success',
        title: 'Signup success!',
      })

      router.push('/')
      router.refresh()
    } catch (err) {
      setSubmitted(false)
      ErrorHandler(err)
    }
  }

  return (
    <div className="flex h-auto w-auto flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Sign up to take & create quizzes</h1>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          setSubmitted(true)
          postSignup(values)
        }}
      >
        {(props: FormikProps<SignupUser>) => {
          const { values, errors, touched, handleChange } = props

          return (
            <Form className="flex w-[85%] flex-col gap-3 rounded bg-zinc-400 px-6 py-8 shadow-lg dark:bg-zinc-200 sm:w-[60%] sm:p-12">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-semibold text-black">
                Name{' '}
              </label>
              <Field
                type="text"
                name="name"
                onChange={handleChange}
                values={values.name}
                placeholder="ex: John Doe"
                disabled={submitted}
                aria-label="E-mail text box"
                className="mt-2 flex h-10 w-full items-center rounded bg-gray-100 px-2 text-sm text-black focus:outline-1 focus:ring-zinc-600 sm:h-12 sm:px-4 sm:text-base"
              />
              {touched.name && errors.name ? (
                <div className="text-xs text-red-600">{errors.email}</div>
              ) : null}
            </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-semibold text-black">
                  Email{' '}
                </label>
                <Field
                  type="text"
                  name="email"
                  onChange={handleChange}
                  values={values.email}
                  placeholder="example@domain.com"
                  disabled={submitted}
                  aria-label="E-mail text box"
                  className="mt-2 flex h-10 w-full items-center rounded bg-gray-100 px-2 text-sm text-black focus:outline-1 focus:ring-zinc-600 sm:h-12 sm:px-4 sm:text-base"
                />
                {touched.email && errors.email ? (
                  <div className="text-xs text-red-600">{errors.email}</div>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-semibold text-black">
                  Password{' '}
                </label>
                <Field
                  type="password"
                  name="password"
                  onChange={handleChange}
                  values={values.password}
                  placeholder="Type password here"
                  disabled={submitted}
                  aria-label="Password text box"
                  className={`mt-2 flex h-10 w-full items-center rounded bg-gray-100 px-2 text-sm text-black focus:outline-1 focus:ring-zinc-600 sm:h-12 sm:px-4 sm:text-base`}
                />
                {touched.password && errors.password ? (
                  <div className="text-xs text-red-600">{errors.password}</div>
                ) : null}
              </div>
              <div className="relative mt-8">
                <button
                  type="submit"
                  className="mx-auto flex h-12 items-center justify-center rounded bg-blue-600 px-6 text-sm font-semibold text-blue-100 shadow-sm shadow-slate-400 hover:bg-blue-700 sm:w-64"
                  aria-label="Sign up button"
                >
                  Sign up
                </button>
                <div className={`${submitted ? '' : 'hidden '}absolute right-[15%] top-1/4`}>
                  <BasicSpinner />
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
