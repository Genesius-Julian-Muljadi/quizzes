import { genPageMetadata } from 'app/seo'
import axios from 'axios'
import { History, Quiz } from 'interfaces/database_tables'
import CompletedQuizEn from 'pages/en/completed/page'
import VerifyTokenServer from 'verifytoken/verifytokenserver'

const POSTS_PER_PAGE = 20

export const metadata = genPageMetadata({ title: 'History' })

export default async function Page() {
  const token = await VerifyTokenServer()
  if (!token) throw new Error('You must be logged in to view this page.')

  const historyRaw = await axios.get(
    process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getHistory/' + token.id
  )
  const histories: History[] = historyRaw.data.data

  const quizzesRaw = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getAllQuizzes')
  const quizzes: Quiz[] = quizzesRaw.data.data

  return <CompletedQuizEn pageLimit={POSTS_PER_PAGE} histories={histories} quizzes={quizzes} />
}
