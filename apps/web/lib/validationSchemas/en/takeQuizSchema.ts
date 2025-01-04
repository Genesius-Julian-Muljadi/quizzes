import { array, mixed, object, string } from 'yup'

const TakeQuizSchema = (size: number) => {
  return object().shape({
    id: string().required('Submission has no Quiz ID!'),
    qnas: array()
      .of(
        object().shape({
          id: string().required('No QnA ID!'),
          answers: mixed()
            .notOneOf([[]], 'Please select at least one answer')
            .required('Please select an answer'),
        })
      )
      .min(size, 'Please answer all questions'),
  })
}

export { TakeQuizSchema }
