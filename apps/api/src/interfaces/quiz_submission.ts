export interface Submit_QnA {
  id: string
  answers: string | string[]
}

export interface Submit_Quiz {
  id: string
  qnas: Submit_QnA[]
}
