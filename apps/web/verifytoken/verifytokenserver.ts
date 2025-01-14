import { AccessTokenUser } from 'interfaces/accesstokens'
import { verify } from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

const COOKIE_EXPIRATION_MINUTES = 40

function checkExpired(token: AccessTokenUser): boolean {
  const difference: number = new Date().valueOf() - new Date(token.iat * 1000).valueOf()
  const expired: boolean = difference / (60 * 1000) > COOKIE_EXPIRATION_MINUTES
  if (expired) console.log(difference / (60 * 1000) + ' minutes')

  return expired
}

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

    return decodedToken && !checkExpired(decodedToken) ? decodedToken : null
  } catch (err) {
    // console.log('something went wrong in verifytokenserver')
    // console.log('myerror: ' + err)
    throw err
  }
}
