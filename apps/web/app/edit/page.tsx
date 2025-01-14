import { genPageMetadata } from 'app/seo'
import QuizList from '@/layouts/quiz/QuizListLayout'
import { Quiz } from 'interfaces/database_tables'
import axios from 'axios'
import VerifyTokenServer from 'verifytoken/verifytokenserver'
import SomethingWentWrong from '@/components/SomethingWentWrong'

const POSTS_PER_PAGE = 10

export const metadata = genPageMetadata({ title: 'Quiz' })

export default async function QuizPage() {
  try {
    const token = await VerifyTokenServer()
    if (!token) throw new Error('You must be logged in to view this page.')

    const quizzesRaw = await axios.get(
      process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getAllQuizzes/' + token.id
    )
    const postsUnsorted: Quiz[] = quizzesRaw.data.data
    const posts: Quiz[] = postsUnsorted.sort(
      (quizA, quizB) => new Date(quizB.updated!).valueOf() - new Date(quizA.updated!).valueOf()
    )
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
        title="Edit your Quizzes"
      />
    )
  } catch (err) {
    return <SomethingWentWrong err={err} />
  }
}
