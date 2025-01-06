'use client';

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function LogoutPage() {
  try {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token'])
    const router = useRouter()

    removeCookie('access_token', { path: '/' })

    useEffect(() => {
      // Vercel cookie issue fix
      document.cookie = `access_token=-; expires=${new Date(0)}`

      router.push('/')
      router.refresh()
    })

    return (
      <div className="grid">
        <p className="m-auto text-lg">Logging out...</p>
      </div>
    )
  } catch (err) {
    console.log(err)
    return null
  }
}
