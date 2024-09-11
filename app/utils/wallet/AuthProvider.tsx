'use client'

import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { isLoggedIn, alreadyInProgress, loginToPwBackend } from './pw-login'
import { isLoggedInToAgora, loginToAgora } from './agora-login'
import { JWTPayload } from './types'

export enum LogginToPwBackendState {
  Initial,
  Error,
  LoggedIn,
}

interface AuthContextType {
  loginInProgress: boolean | null
  setLoginInProgress: (bool: boolean | null) => void
  loggedToPw: LogginToPwBackendState
  setLoggedToPw: (bool: LogginToPwBackendState) => void
  isNewUser: boolean
  setIsNewUser: (bool: boolean) => void
  loggedToAgora: 'initial' | 'error' | JWTPayload
  setLoggedToAgora: (value: AuthContextType['loggedToAgora']) => void
}

const AuthContext = React.createContext<AuthContextType>({
  loginInProgress: null,
  setLoginInProgress: () => {},
  loggedToPw: LogginToPwBackendState.Initial,
  loggedToAgora: 'initial',
  isNewUser: false,
  setLoggedToPw: () => {},
  setLoggedToAgora: () => {},
  setIsNewUser: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginInProgress, setLoginInProgress] = useState<boolean | null>(
    null,
  )
  const [loggedToPw, setLoggedToPw] = useState(
    LogginToPwBackendState.Initial,
  )
  const [loggedToAgora, setLoggedToAgora] = useState<AuthContextType['loggedToAgora']>('initial')

  const [isNewUser, setIsNewUser] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        loginInProgress,
        setLoginInProgress,
        loggedToAgora,
        setLoggedToAgora,
        loggedToPw,
        setLoggedToPw,
        isNewUser,
        setIsNewUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const {
    loggedToPw,
    setLoggedToPw,
    setIsNewUser,
    isNewUser,
    loggedToAgora,
    loginInProgress,
    setLoggedToAgora,
    setLoginInProgress,
  } = useContext(AuthContext)
  const { address, chainId } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const checkLoginFlow = useCallback(async () => {
    if (address && chainId) {
      try {
        const validToken = await isLoggedIn()
        if (validToken) setLoggedToPw(LogginToPwBackendState.LoggedIn)
        else if (!alreadyInProgress) {
          const res = await loginToPwBackend(
            chainId,
            address,
            signMessageAsync,
          )
          if (res.isNewUser) {
            setIsNewUser(true)
          }
          setLoggedToPw(LogginToPwBackendState.LoggedIn)
        }
      }
      catch (e) {
        setLoggedToPw(LogginToPwBackendState.Error)
      }
      // By now you're logged-in to PW. Now do Agora...

      try {
        const loggedInToAgora = isLoggedInToAgora()
        if (loggedInToAgora) setLoggedToAgora(loggedInToAgora)
        else {
          const res = await loginToAgora(address, chainId, signMessageAsync)
          setLoggedToAgora(res)
        }
      }
      catch (e) {
        setLoggedToAgora('error')
      }
    }
  }, [address, chainId, setLoggedToAgora, setLoggedToPw, setIsNewUser, signMessageAsync])

  useEffect(() => {
    checkLoginFlow()
  }, [checkLoginFlow])

  return {
    loggedToPw,
    setLoggedToPw,
    setIsNewUser,
    isNewUser,
    loggedToAgora,
    loginInProgress,
    setLoggedToAgora,
    setLoginInProgress,
  }
}
