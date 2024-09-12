import { axiosInstance } from '../axiosInstance'

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      logoutFromPwBackend()
    }
    return Promise.reject(error)
  },
)

export const isLoggedIn = async () => {
  if (!localStorage.getItem('auth')) return false
  try {
    const { data } = await axiosInstance.get<Number>('/auth/isloggedin')
    return data
  }
  catch (err) {
    return false
  }
}

// const fetchNonce = async () => {
//   try {
//     const { data } = await axios.get<string>('/auth/nonce')
//     return data
//   } catch (err) {
//     console.error(err)
//   }
// }

// function generateRandomString(length: number): string {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }

export const loginToPwBackend = async (
  chainId: number,
  address: string,
  signFunction: ({ message }: { message: string }) => Promise<string>,
) => {
  // const nonce = await fetchNonce()
  // const nonce = generateRandomString(16

  const message = 'Signing in to Pairwise servers'

  // const message = AGORA_SIGN_IN

  const signature = await signFunction({ message })

  // Verify signature
  const { data } = await axiosInstance.post<{ token: string, isNewUser: boolean }>(
    '/auth/login',
    {
      ...{ message, signature: `${signature}`, address, chainId },
    },
  )

  const token = data.token
  window.localStorage.setItem('auth', token)
  window.localStorage.setItem('loggedInAddress', address)
  axiosInstance.defaults.headers.common['auth'] = token

  return data
}

export const logoutFromPwBackend = async () => {
  try {
    window.localStorage.removeItem('auth')
    window.localStorage.removeItem('loggedInAddress')
    if (axiosInstance.defaults.headers.common['auth']) {
      delete axiosInstance.defaults.headers.common['auth']
    }
    // await axios.post('/auth/logout')
  }
  catch (err) {
    console.error(err)
  }
}
