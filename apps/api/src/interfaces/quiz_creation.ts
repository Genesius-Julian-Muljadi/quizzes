export interface Create_Answer {
  answer?: string
  correct: string // true or false
}

export interface Create_QnA {
  question?: string
  answers: Create_Answer[]
}

export interface Create_Quiz {
  title?: string
  qnas: Create_QnA[]
}
