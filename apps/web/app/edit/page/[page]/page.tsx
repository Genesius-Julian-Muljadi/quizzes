import QuizList from '@/layouts/quiz/QuizListLayout'
import { Quiz } from 'interfaces/database_tables'
import axios from 'axios'
import VerifyTokenServer from 'verifytoken/verifytokenserver'
import NotFound from 'app/not-found'

const POSTS_PER_PAGE = 10

export const generateStaticParams = async () => {
  const token = await VerifyTokenServer()
  if (!token) return []

  const quizzesRaw = await axios.get(
    process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getAllQuizzes/' + token.id
  )
  const posts: Quiz[] = quizzesRaw.data.data
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const token = await VerifyTokenServer()
  if (!token) throw new Error('You must be logged in to view this page.')

  const quizzesRaw = await axios.get(
    process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getAllQuizzes/' + token.id
  )
  const postsUnsorted: Quiz[] = quizzesRaw.data.data
  const posts: Quiz[] = postsUnsorted.sort(
    (quizA, quizB) => new Date(quizB.updated!).valueOf() - new Date(quizA.updated!).valueOf()
  )
  const params = await props.params
  const pageNumber = parseInt(params.page as string)
  if (pageNumber > Math.ceil(posts.length / POSTS_PER_PAGE)) return <NotFound />

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <QuizList
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="Edit your Quizzes"
    />
  )
}
