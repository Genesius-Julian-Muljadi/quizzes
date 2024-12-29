import names from '../lists/names'
import domains from '../lists/emaildomains'
import axios from 'axios'

export async function AddUsers(n?: number) {
  for (let i = 0; i < (n ? n : 1); i++) {
    const firstName: string = names[Math.floor(Math.random() * names.length)]
    const lastName: string =
      Math.random() * 10 > 1 ? names[Math.floor(Math.random() * names.length)] : ''
    const email: string =
      firstName.toLowerCase() +
      lastName.toLowerCase() +
      '@' +
      domains[Math.floor(Math.random() * domains.length)]
    const password: string = firstName + lastName + '123!'

    try {
      await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL + '/data/users', {
        email: email,
        name: firstName + ' ' + lastName,
        password: password,
      })
      console.log('Added user ' + (i + 1))
    } catch (err) {
      console.log(err)
    }
  }
}
