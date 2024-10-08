'use client';

import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { usePathname, useRouter } from 'next/navigation';
import { isLoggedIn, loginToPwBackend, logoutFromPwBackend } from './pw-login';
import { getMessageAndSignature, isLoggedInToAgora, loginToAgora, signOutFromAgora } from './agora-login';
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
  loginAddress: {value: `0x${string}` | undefined, confirmed: boolean},
  setLoginAddress: (value: AuthContextType['loginAddress']) => void,
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
  loginAddress: {value: undefined, confirmed: true},
  setLoginAddress: () => {},
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

  const [loginAddress, setLoginAddress] = useState<AuthContextType['loginAddress']>({confirmed: true, value: undefined});

  useAuth();

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
        loginAddress,
        setLoginAddress
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
    loginAddress,
    setLoginAddress,
    // setShowBhModal,
  } = useContext(AuthContext);

  // const [loginFlowDangling, setLoginFlowDangling] = useState(false)
  const { address: connectedAddress, chainId } = useAccount();
  const prevAddress = usePrevious(connectedAddress);
  const { signMessageAsync } = useSignMessage();

  const router = useRouter();
  const path = usePathname();

  const signOut = async (redirectToLanding: boolean = true) => {
    signOutFromAgora();
    logoutFromPwBackend();
    setLoggedToAgora('initial');
    setLoginAddress({value: undefined, confirmed: true});
    setLoggedToPw(LogginToPwBackendState.Initial);
    setIsNewUser(false);
    if (redirectToLanding) router.push('/');
  };

  useEffect(() => {
    const loggedInAddress = localStorage.getItem('loggedInAddress');
    if (loggedInAddress) setLoginAddress({value: loggedInAddress as `0x${string}`, confirmed: true});
  }, []);

  useEffect(() => {
    if (!prevAddress && !loginAddress.value && connectedAddress) {
      setLoginAddress({value: connectedAddress, confirmed: true});
    }
    else if (prevAddress && connectedAddress !== prevAddress && !path.includes('comparison')) {
      signOut();
    } 
    else if (prevAddress && connectedAddress !== prevAddress && path.includes('comparison')) {
      setLoginAddress({...loginAddress, confirmed: false});
    } 
  }, [connectedAddress, prevAddress, path]);

  const redirectToComparisonPage = useCallback(() => {
    if (typeof loggedToAgora !== 'object' || loggedToPw !== LogginToPwBackendState.LoggedIn) return;
    const category = loggedToAgora.category;
    router.push(`/comparison/${category}`);
  }, [loggedToAgora, loggedToPw, router]);

  const checkLoggedInToPwAndAgora = useCallback(async () => {

    if (!loginAddress.value) return;

    const loggedInToAgora = await isLoggedInToAgora(loginAddress.value);
    if (loggedInToAgora) setLoggedToAgora(loggedInToAgora);
    else setLoggedToAgora('error');

    const validToken = await isLoggedIn();
    if (validToken) {
      setLoggedToPw(LogginToPwBackendState.LoggedIn);
    } else setLoggedToPw(LogginToPwBackendState.Error);

  }, [loginAddress.value]);

  useEffect(() => {
    checkLoggedInToPwAndAgora();
  }, [checkLoggedInToPwAndAgora]);

  const doLoginFlow = useCallback(async (addressParam?: `0x${string}`) => {
    console.log('Running the check login flow');
    const address = addressParam ?? connectedAddress 
    if (loginInProgress || !address || !chainId) return;
    // setLoginAddress({value: connectedAddress, confirmed: false})
    let message;
    let signature;

    try {
      console.log('chking agora exp');
      const loggedInToAgora = await isLoggedInToAgora(address);
      if (loggedInToAgora) setLoggedToAgora(loggedInToAgora);
      else {
        const {message: val1, signature: val2} = await getMessageAndSignature(address, chainId, signMessageAsync);
        message = val1;
        signature = val2;
        console.log('loggin to agora');
        setLoginInProgress(true);
        const res = await loginToAgora(message, signature);
        setLoggedToAgora(res);
      }
    }
    catch (e) {
      console.log('agora err');
      setLoggedToAgora('error');
      setLoginInProgress(false);
      return;
    }

    try {
      console.log('Checking pw token if exists?');
      const validToken = await isLoggedIn();
      if (validToken) {
        console.log('vt:', validToken);
        setLoggedToPw(LogginToPwBackendState.LoggedIn);
      }
      else {
        if (!message || !signature) {
          const {message: val1, signature: val2} = await getMessageAndSignature(address, chainId, signMessageAsync);
          message = val1;
          signature = val2;
        }
        setLoginInProgress(true);
        console.log('Logging to pw');
        const res = await loginToPwBackend(
          chainId,
          address,
          message,
          signature
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
      return;
    }
    finally {
      setLoginInProgress(false);
    }

  }, [chainId, connectedAddress]);

  useEffect(() => {
    if (loggedToPw === LogginToPwBackendState.LoggedIn && typeof loggedToAgora === 'object' && loggedToAgora.isBadgeholder === true) {
      redirectToComparisonPage();
    }
  }, [loggedToAgora, loggedToPw, redirectToComparisonPage]);

  // Set up axios interceptors
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        if (error.response && error.response.status === 401) {
          signOut();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      // Remove the interceptor when the component unmounts
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

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
    loginAddress,
    setLoginAddress,
    redirectToComparisonPage,
    // setShowBhModal,
    doLoginFlow,
  };
};
