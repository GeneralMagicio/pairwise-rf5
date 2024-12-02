import React, { useEffect } from 'react';
import { useAuth } from '../AuthProvider';

interface SignInWithWalletProps {
}

const SignInWithWallet: React.FC<SignInWithWalletProps> = () => {
  const { doLoginFlow } = useAuth();

  useEffect(() => {
    doLoginFlow();
  }, []);
  
  return (
    <div className="mx-auto rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-center text-xl font-semibold">Sign in with wallet</h2>
      <p className="mb-6 text-center text-gray-500">
        Automatic signing...
      </p>
    </div>
  );
};

export default SignInWithWallet;
