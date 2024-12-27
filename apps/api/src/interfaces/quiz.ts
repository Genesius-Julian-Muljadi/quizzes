export interface Answer {
  id: number;
  answer: string;
  correct: boolean;
}

export interface QnA {
  id: number;
  question: string;
  multiple: boolean;
  answers: Answer[];
}

export default interface Quiz {
  id: number;
  title: string;
  qnas: QnA[];
}
