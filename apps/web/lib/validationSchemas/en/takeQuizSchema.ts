import { array, mixed, number, object, string } from 'yup'

const TakeQuizSchema = object().shape({
  id: number().required('Submission has no Quiz ID!'),
  qnas: array().of(
    object().shape({
      id: number().required('No QnA ID!'),
      answers: mixed()
        .notOneOf([[]], 'Please select at least one answer.')
        .required('Please select an answer.'),
    })
  ).min(1, 'Quiz should have at least 1 question'),
})

export { TakeQuizSchema }
