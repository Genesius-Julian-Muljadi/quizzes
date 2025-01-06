'use client'

import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'

export default function LogoutButton() {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
  const router = useRouter()

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
