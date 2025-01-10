import { array, boolean, object, string } from 'yup'

// Schema does not contain validation for each QnA having at least 1 correct answer.
// That will happen in API quiz validation.
const CreateQuizSchema = object().shape({
  title: string().required('Quiz has no title!').max(30, 'Title exceeds 30 character limit'),
  qnas: array()
    .of(
      object().shape({
        question: string().required('Please type your question'),
        answers: array()
          .of(
            object().shape({
              answer: string().notRequired().max(50, 'Answer exceeds 50 character limit'),
              correct: boolean(),
            })
          )
          .min(1, 'Question must have at least 1 answer'),
      })
    )
    .min(1, 'Quiz must have at least 1 question'),
})

export { CreateQuizSchema }
