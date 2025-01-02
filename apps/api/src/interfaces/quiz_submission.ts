export interface Submit_Answer {
  id: number
}

export interface Submit_QnA {
  id: number
  answers: Submit_Answer | Submit_Answer[]
}

export interface Submit_Quiz {
  id: number
  qnas: Submit_QnA[]
}
