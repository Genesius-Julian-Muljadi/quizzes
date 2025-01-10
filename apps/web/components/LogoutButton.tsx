'use client'

import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'

export default function LogoutButton({ mobile }: { mobile: boolean }) {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
  const router = useRouter()

  if (mobile) {
    return (
      <button
        className="mb-4 py-2 pr-4 text-2xl font-bold tracking-widest text-gray-900 outline outline-0 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
        onClick={() => {
          router.push('/')
          removeCookie('access_token', { path: '/' })
          // Vercel cookie issue fix
          document.cookie = `access_token=-; expires=${new Date(0)}`
          router.refresh()
        }}
      >
        Log out
      </button>
    )
  } else {
    return (
      <button
        className="block font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
        onClick={() => {
          router.push('/')
          removeCookie('access_token', { path: '/' })
          // Vercel cookie issue fix
          document.cookie = `access_token=-; expires=${new Date(0)}`
          router.refresh()
        }}
      >
        Log out
      </button>
    )
  }
}
