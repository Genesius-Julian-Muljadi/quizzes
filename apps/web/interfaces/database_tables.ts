interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  pointBalance: number
  referralCode: string
  failedLogins: number
  active: string
  emailVerified: boolean
  dateCreated: Date
  updated: Date
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
}

export type { User, Answer, QnA, Quiz }
