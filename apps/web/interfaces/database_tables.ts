interface User {
  id: number
  name: string
  email: string
  password: string
  dateCreated?: Date
}

interface Answer {
  id?: number
  answer: string
  correct: boolean
}

interface QnA {
  id?: number
  quizID?: number
  question: string
  multiple: boolean
  answers: Answer[]
}

interface Quiz {
  id?: number
  userID?: number
  title: string
  qCount: number
  qnas: QnA[]
  dateCreated?: Date
  updated?: Date
}

export type { User, Answer, QnA, Quiz }
