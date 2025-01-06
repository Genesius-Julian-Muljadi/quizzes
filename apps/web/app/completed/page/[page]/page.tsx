import axios from 'axios'
import VerifyTokenServer from 'verifytoken/verifytokenserver'
import SomethingWentWrong from '@/components/SomethingWentWrong'
import PaginatedCompletedQuizEn from 'pages/en/completed/page/[page]/page'
import { History, Quiz } from 'interfaces/database_tables'

const POSTS_PER_PAGE = 20

export const generateStaticParams = async () => {
  try {
    const token = await VerifyTokenServer()
    if (!token) throw new Error('You must be logged in to view this page.')

    const historyRaw = await axios.get(
      process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getHistory/' + token.id
    )
    const histories: History[] = historyRaw.data.data

    const totalPages = Math.ceil(histories.length / POSTS_PER_PAGE)
    const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

    return paths
  } catch (err) {
    console.log(err)
    return []
  }
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  try {
    const params = await props.params
    const token = await VerifyTokenServer()
    if (!token) throw new Error('You must be logged in to view this page.')

    const historyRaw = await axios.get(
      process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getHistory/' + token.id
    )
    const histories: History[] = historyRaw.data.data

    const quizzesRaw = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getAllQuizzes')
    const quizzes: Quiz[] = quizzesRaw.data.data

    return (
      <PaginatedCompletedQuizEn
        pageLimit={POSTS_PER_PAGE}
        params={params}
        histories={histories}
        quizzes={quizzes}
      />
    )
  } catch (err) {
    return <SomethingWentWrong err={err} />
  }
}
