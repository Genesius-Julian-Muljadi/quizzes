import { AccessTokenUser } from 'interfaces/accesstokens'
import { verify } from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export default async function VerifyTokenServer(): Promise<AccessTokenUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token_session')?.value

    let decodedToken: AccessTokenUser | null = null
    if (token) {
      decodedToken = jwtDecode(String(token))
      const verified = verify(token, String(process.env.NEXT_PUBLIC_SECRET_KEY))
      if (!verified) {
        throw new Error('Unauthorized token!')
      }
    } else {
      const newToken = cookieStore.get('access_token')?.value
      if (newToken) {
        decodedToken = jwtDecode(String(newToken))
        const verified2 = verify(newToken, String(process.env.NEXT_PUBLIC_SECRET_KEY))
        if (!verified2) {
          throw new Error('Unauthorized token!')
        }
      }
    }

    return decodedToken
  } catch (err) {
    console.log('something went wrong in verifytokenserver')
    console.log('myerror: ' + err)
    throw err
  }
}
