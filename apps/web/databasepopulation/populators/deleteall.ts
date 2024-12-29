import axios from 'axios'

export async function DeleteAllData() {
  try {
    await axios.delete(process.env.NEXT_PUBLIC_BASE_API_URL + '/data')
    console.log('All data deleted')
  } catch (err) {
    console.log(err)
  }
}
