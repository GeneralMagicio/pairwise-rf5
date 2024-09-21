'use client';

import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { useRouter } from 'next/navigation';
import { isLoggedIn, loginToPwBackend, logoutFromPwBackend } from './pw-login';
import { isLoggedInToAgora, loginToAgora, signOutFromAgora } from './agora-login';
import { JWTPayload } from './types';
import { axiosInstance } from '../axiosInstance';
import { usePrevious } from '../methods';

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
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loginInProgress, setLoginInProgress] = useState<boolean | null>(
    null,
  );
  const [loggedToPw, setLoggedToPw] = useState(
    LogginToPwBackendState.Initial,
  );
  const [loggedToAgora, setLoggedToAgora] = useState<AuthContextType['loggedToAgora']>('initial');

  const [isNewUser, setIsNewUser] = useState(false);

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
  );
};

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
    // setShowBhModal,
  } = useContext(AuthContext);

  // const [loginFlowDangling, setLoginFlowDangling] = useState(false)
  const { address, chainId } = useAccount();
  const prevAddress = usePrevious(address);
  const { signMessageAsync } = useSignMessage();
  const [temp, setTemp] = useState(0);
  const router = useRouter();

  const signOut = async () => {
    signOutFromAgora();
    logoutFromPwBackend();
    setLoggedToAgora('initial');
    setLoggedToPw(LogginToPwBackendState.Initial);
    setIsNewUser(false);
    router.push('/landing');
  };

  useEffect(() => {
    if (prevAddress && address !== prevAddress) signOut();
  }, [address, prevAddress]);

  const redirectToComparisonPage = useCallback(() => {
    if (typeof loggedToAgora !== 'object') return;
    const category = loggedToAgora.category;
    router.push(`/comparison/${category}`);
  }, [loggedToAgora]);

  const checkLoginFlow = useCallback(async () => {
    console.log('Running the check login flow');
    if (loginInProgress) return;
    if (!address || !chainId) return;
    try {
      console.log('Checking pw token if exists?');
      const validToken = await isLoggedIn();
      if (validToken) {
        console.log('vt:', validToken);
        setLoggedToPw(LogginToPwBackendState.LoggedIn);
      }
      else {
        setLoginInProgress(true);
        console.log('Logging to pw');
        const res = await loginToPwBackend(
          chainId,
          address,
          signMessageAsync,
        );
        if (res.isNewUser) {
          setIsNewUser(true);
        }
        setLoggedToPw(LogginToPwBackendState.LoggedIn);
      }
    }
    catch (e) {
      console.log('pw error', e);
      setLoggedToPw(LogginToPwBackendState.Error);
      setLoginInProgress(false);
      return;
    }
    // By now you're logged-in to PW. Now do Agora...

    try {
      if (!LogginToPwBackendState.LoggedIn) return;
      console.log('chking agora exp');
      const loggedInToAgora = isLoggedInToAgora();
      if (loggedInToAgora) setLoggedToAgora(loggedInToAgora);
      else {
        console.log('loggin to agora');
        setLoginInProgress(true);
        const res = await loginToAgora(address, chainId, signMessageAsync);
        setLoggedToAgora(res);
      }
    }
    catch (e) {
      console.log('agora err');
      setLoggedToAgora('error');
    }
    finally {
      setLoginInProgress(false);
    }

    setLoginInProgress(false);
  }, [address, temp]);

  useEffect(() => {
    if (typeof loggedToAgora === 'object') {
      if (loggedToAgora.isBadgeholder === true) {
        redirectToComparisonPage();
      }
    }
  }, [loggedToAgora, redirectToComparisonPage]);

  // Set up axios interceptors
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response && error.response.status === 401) {
          signOut();
          setTemp(temp + 1);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      // Remove the interceptor when the component unmounts
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [temp]);

  // useEffect(() => {
  //   if (address) {
  //     console.log('running because address is', address)
  //     checkLoginFlow()
  //   }
  // }, [address])

  return {
    loggedToPw,
    isNewUser,
    loggedToAgora,
    loginInProgress,
    signOut,
    redirectToComparisonPage,
    // setShowBhModal,
    checkLoginFlow,
  };
};
