export interface Answer {
  id?: number;
  answer: string;
  correct: boolean;
}

export interface QnA {
  id?: number;
  quizID?: number;
  question: string;
  multiple: boolean;
  answers: Answer[];
}

export default interface Quiz {
  id?: number;
  userID?: number;
  title: string;
  qCount: number;
  qnas?: QnA[];
  dateCreated?: Date;
}
