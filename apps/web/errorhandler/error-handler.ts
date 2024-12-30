import Swal from 'sweetalert2'
import { isAxiosError } from 'axios'
export default function ErrorHandler(err: any) {
  console.log(err)
  let message
  if (isAxiosError(err) && err.response?.data.message) {
    message = err.response?.data.message
  } else {
    message = err.message
  }
  Swal.fire({
    icon: 'error',
    title: message,
  })
}
