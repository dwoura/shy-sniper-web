// Mock API endpoints
const MOCK_DELAY = 500;

interface SignInResponse {
  success: boolean;
  token: string;
  user: {
    address: string;
    membershipLevel: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
  };
}

export async function verifySignature(address: string, signature: string, message: string): Promise<SignInResponse> {
  // 模拟API调用验证签名
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  if (!signature) {
    throw new Error('Signature is required');
  }

  return {
    success: true,
    token: 'mock_jwt_token_' + Math.random(),
    user: {
      address,
      membershipLevel: 'bronze'
    }
  };
}