'use client'

import { Field, Form, Formik, FormikProps } from 'formik'
import { LoginSchema } from '../../../lib/validationSchemas/en/loginSchema'
import { LoginUser } from 'interfaces/loginform'
import axios from 'axios'
import ErrorHandler from 'errorhandler/error-handler'
import Swal from 'sweetalert2'
import BasicSpinner from 'assets/BasicSpinner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPageEn() {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const router = useRouter()

  const postLogin = async (params: LoginUser) => {
    try {
      const API: string = process.env.NEXT_PUBLIC_BASE_API_URL + '/auth/login'
      const output = await axios.post(
        API,
        {
          email: params.email,
          password: params.password,
        },
        { withCredentials: true }
      )

      if (!output) throw Error();

      Swal.fire({
        icon: 'success',
        title: 'Login success!',
      })
      // Vercel cookie issue fix
      document.cookie = `access_token=${output.data.cookie}; expires=${new Date(new Date().valueOf() + 1200000)}`

      router.push('/')
      router.refresh()
    } catch (err) {
      setSubmitted(false)
      ErrorHandler(err)
    }
  }

  return (
    <div className="flex h-auto w-auto flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Welcome Back</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          setSubmitted(true)
          postLogin(values)
        }}
      >
        {(props: FormikProps<LoginUser>) => {
          const { values, errors, touched, handleChange } = props

          return (
            <Form className="flex w-[85%] flex-col gap-3 rounded bg-zinc-400 px-6 py-8 shadow-lg dark:bg-zinc-200 sm:w-[60%] sm:p-12">
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
                  aria-label="Log in button"
                >
                  Log in
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
