import 'css/prism.css'
import 'katex/dist/katex.css'

import TakeQuizEn from 'pages/en/quiz/takequiz'
import axios from 'axios'
import { Quiz } from 'interfaces/database_tables'
import VerifyTokenServer from 'verifytoken/verifytokenserver'
import SomethingWentWrong from '@/components/SomethingWentWrong'

export default async function Page(props: { params: Promise<{ quizID: string[] }> }) {
  try {
    const params = await props.params
    const id: string = decodeURI(params.quizID.join('/'))
    const quizRaw = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/quiz/getQuiz/' + id)
    const quiz: Quiz = quizRaw.data.data

    const token = await VerifyTokenServer()

    return <TakeQuizEn quiz={quiz} userID={token!.id} />
  } catch (err) {
    return <SomethingWentWrong err={err} />
  }
}
