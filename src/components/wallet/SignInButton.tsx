import React from 'react';
import { useSignMessage } from 'wagmi';
import { getSignMessage, verifySignature } from '../../utils/auth';
import { useAuth } from '../../context/AuthContext';

interface SignInButtonProps {
  address: string;
}

export default function SignInButton({ address }: SignInButtonProps) {
  const { signMessageAsync: signMessage, isPending: isSigning } = useSignMessage();
  const { setAuthState } = useAuth();

  const handleSignIn = async () => {
    try {
      const message = getSignMessage();
      const signature = await signMessage({ message });
      
      const isValid = await verifySignature(address, signature, message);
      if (isValid) {
        setAuthState({
          isAuthenticated: true,
          address,
          signature,
        });
      }
    } catch (error) {
      console.error('签名失败:', error);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isSigning}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSigning ? '签名中...' : '签名登录'}
    </button>
  );
}