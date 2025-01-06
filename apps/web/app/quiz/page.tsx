import { genPageMetadata } from 'app/seo'
import QuizList from '@/layouts/quiz/QuizListLayout'
import { Quiz } from 'interfaces/database_tables'
import axios from 'axios'

const POSTS_PER_PAGE = 10

export const metadata = genPageMetadata({ title: 'Quiz' })

export default async function QuizPage() {
  const quizzesRaw = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getAllQuizzes')
  const posts: Quiz[] = quizzesRaw.data.data
  const pageNumber = 1
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
      title="All Quizzes"
    />
  )
}
