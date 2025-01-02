// import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'
import axios from 'axios'
import MainEn from '../pages/en/Main'
import { Quiz } from 'interfaces/database_tables'
import SomethingWentWrong from '@/components/SomethingWentWrong'

export default async function Page() {
  // const sortedPosts = sortPosts(allBlogs)
  // const posts = allCoreContent(sortedPosts)
  // return <MainEn posts={posts} />
  try {
    const quizzesRaw = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getAllQuizzes')
    const quizzes: Quiz[] = quizzesRaw.data.data

    return <MainEn quizzes={quizzes} />
  } catch (err) {
    return <SomethingWentWrong err={err} />
  }
}
