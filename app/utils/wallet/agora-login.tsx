import { SIWEConfig } from 'connectkit'
import { SiweMessage } from 'siwe'
import { decodeJwt } from 'jose'
import { JWTPayload, VerifyResponse } from './types'

// TODO: this should probably be an environment variable
// const BASE_URL = `https://vote.optimism.io`
const BASE_URL = `https://cors-anywhere.herokuapp.com/https://vote.optimism.io`
const API_AUTH_PREFIX = '/api/v1/auth'
const LOCAL_STORAGE_JWT_KEY = 'agora-siwe-jwt'
export const AGORA_SIGN_IN = 'Sign in to Agora with Ethereum'

/* There's currently nothing stored on the backend to maintain session state.
// All session state is stateless and stored in the JWT issued by the server.
// Address, nonce, and chainId are all stored in the JWT, along with a particular
// time to live/expiry.
//
// For signOut, the client should remove JWT from storage as applicable, and is otherwise
// a no-op (pending AGORA-2015, or potential JWT-token tracking on our backend DB).
//
// JWT tokens for SIWE should therefore be issued with a short expiry time.
*/

// const isSiweEnabled = () => {
//   return process.env.NEXT_PUBLIC_SIWE_ENABLED === 'true'
// }

export const loginToAgora = async (address: `0x${string}`, chainId: number, signFunc: ({ message }: { message: string }) => Promise<string>,
) => {
  const nonce = await getNonce()
  const message = await createMessage({
    address,
    chainId,
    nonce,
  })

  const signature = await signFunc({ message })

  const isVerified = await verifyMessage({ message, signature })

  return isVerified
}

const getNonce = async () =>
  fetch(`${BASE_URL}${API_AUTH_PREFIX}/nonce`).then(res => res.text())

const createMessage: SIWEConfig['createMessage'] = ({ nonce, address, chainId }) =>
  new SiweMessage({
    version: '1',
    domain: window.location.host,
    uri: window.location.origin,
    statement: AGORA_SIGN_IN,
    address,
    chainId,
    nonce,
  }).prepareMessage()

const verifyMessage = async ({ message, signature }: { message: string, signature: string }) =>
  fetch(`${BASE_URL}${API_AUTH_PREFIX}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      signature,
    }),
  }).then(async (res) => {
    // save JWT from verify to local storage
    const token: VerifyResponse = await res.json()
    localStorage.setItem(LOCAL_STORAGE_JWT_KEY, JSON.stringify(token))
    const payload: JWTPayload = decodeJwt(token.access_token)
    return payload
  })

export const isLoggedInToAgora = (): JWTPayload | false => {
  try {
    // return JWT from local storage
    const session = localStorage.getItem(LOCAL_STORAGE_JWT_KEY)
    if (!session) {
      return false
    }
    const parsedObj: VerifyResponse = JSON.parse(session)
    // decode JWT to get session info
    const decoded: JWTPayload = decodeJwt(parsedObj.access_token)

    if (Date.now() < (decoded.exp * 1000)) return decoded
    else return false
  }
  catch (e) {
    return false
  }
}

export const signOutFromAgora = () => {
  localStorage.removeItem(LOCAL_STORAGE_JWT_KEY)
}
