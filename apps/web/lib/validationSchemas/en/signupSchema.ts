import { object, string } from 'yup'

const SignupSchema = object({
  name: string()
    .notOneOf(['admin'], 'Name cannot be admin')
    .min(2, 'Name must contain at least 2 characters.')
    .max(30, 'Name cannot exceed 30 characters.')
    .required('Name is required.'),
  email: string().email('Invalid email format.').required('Please input your email.'),
  password: string()
    .min(6, 'Password contains at least 6 characters.')
    .required('Please input a password.'),
})

export { SignupSchema }
