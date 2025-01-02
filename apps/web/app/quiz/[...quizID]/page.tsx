import 'css/prism.css'
import 'katex/dist/katex.css'

import TakeQuizEn from 'pages/en/quiz/takequiz'
import axios from 'axios'
import { Quiz } from 'interfaces/database_tables'

export default async function Page(props: { params: Promise<{ quizID: string[] }> }) {
  const params = await props.params
  const id: string = decodeURI(params.quizID.join('/'))
  const quizRaw = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getQuiz/' + id)
  const quiz: Quiz = quizRaw.data.data

  return <TakeQuizEn quiz={quiz} />
}
