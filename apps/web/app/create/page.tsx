import SomethingWentWrong from '@/components/SomethingWentWrong'
import CreateQuizEn from 'pages/en/create/page'
import VerifyTokenServer from 'verifytoken/verifytokenserver'

export default async function Page() {
  try {
    const token = await VerifyTokenServer()
    if (!token) throw new Error('You must be logged in to view this page.')

    return <CreateQuizEn userID={token.id} />
  } catch (err) {
    return <SomethingWentWrong err={err} />
  }
}
