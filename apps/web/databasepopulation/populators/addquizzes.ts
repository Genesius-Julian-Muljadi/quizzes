import words from '../lists/words'
import axios from 'axios'
import { Answer, QnA, Quiz, User } from 'interfaces/database_tables'

function capitalizeString(string: string): string {
  let capitalized: string = ''
  let firstLetter: boolean = true
  for (let i = 0; i < string.length; i++) {
    if (firstLetter) {
      capitalized = capitalized + string[i].toUpperCase()
      firstLetter = false
    } else {
      capitalized = capitalized + string[i]
    }
    if (/\s/.test(string[i])) {
      firstLetter = true
    } else continue
  }

  return capitalized
}

function assembleAnswer(words: string[]): Answer {
  const num: number = Math.floor(Math.random() * 3) + 1 // Answer has 1-3 words
  let answer: string = ''
  for (let i = 0; i < num; i++) {
    answer += ' ' + words[Math.floor(Math.random() * words.length)]
  }
  answer = answer.slice(1)

  const correct: boolean = Math.random() * 2 > 1 // Random correct or wrong
  // Quiz validation will fail later if question has no correct answers

  return {
    answer: answer,
    correct: correct,
  }
}

function validateAnswers(answers: Answer[]): number {
  let correctCount: number = 0

  for (let k in answers) {
    if (answers[k].correct) correctCount++
  }
  if (correctCount === 0) {
    const index = Math.floor(Math.random() * answers.length)
    answers[index].correct = true
  }

  return correctCount
}

function assembleQnA(words: string[]): QnA {
  const num: number = Math.floor(Math.random() * 5) + 4 // Question has 4-8 words
  let question: string = ''
  for (let i = 0; i < num; i++) {
    question += ' ' + words[Math.floor(Math.random() * words.length)]
  }
  question = question.slice(1)

  const aCount: number = Math.floor(Math.random() * 3) + 2 // Question has 2-4 answer choices
  const answers: Answer[] = []
  for (let i = 0; i < aCount; i++) {
    const answer: Answer = assembleAnswer(words)
    answers.push(answer)
  }

  const correctCount = validateAnswers(answers);

  return {
    question: question,
    multiple: correctCount !== 1,
    answers: answers,
  }
}

function assembleQuiz(words: string[], user: User): Quiz {
  // User ID
  const userID: number = user.id

  // Title
  const title: string =
    words[Math.floor(Math.random() * words.length)] +
    ' ' +
    words[Math.floor(Math.random() * words.length)]

  // Question Count
  const qCount: number = Math.floor(Math.random() * 16) + 5 // Quiz has 5-20 questions

  // QnAs
  const qnas: QnA[] = []
  for (let i = 0; i < qCount; i++) {
    const qna: QnA = assembleQnA(words)
    qnas.push(qna)
  }

  const creationDate: Date = new Date(
    new Date(user.dateCreated).valueOf() +
      Math.ceil(Math.random() * (new Date().valueOf() - new Date(user.dateCreated).valueOf()))
  )

  return {
    userID: userID,
    title: title,
    qCount: qCount,
    qnas: qnas,
    dateCreated: creationDate,
  }
}

export async function AddQuizzes(n?: number) {
  const userRaw = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/data/users')
  const users: User[] = userRaw.data.data

  const wordChoices: string[] = capitalizeString(words).split('\n')

  for (let i = 0; i < (n ? n : 1); i++) {
    const user: User = users[Math.floor(Math.random() * users.length)]

    const newQuiz: Quiz = assembleQuiz(wordChoices, user)

    try {
      const quiz = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL + '/data/quiz', {
        quiz: newQuiz,
      })
      console.log('Added quiz ' + (i + 1))
    } catch (err) {
      console.log(err)
    }
  }
}
