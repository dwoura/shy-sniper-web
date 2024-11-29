// 临时使用模拟数据，之后替换为实际的API实现
const MOCK_DELAY = 500; // 模拟网络延迟

export interface UserResponse {
  address: string;
  membershipLevel: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum';
  registeredAt: string;
  lastLoginAt: string;
}

export async function registerOrLogin(address: string): Promise<UserResponse> {
  // 模拟API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        address,
        membershipLevel: 'bronze', // 默认为青铜会员
        registeredAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      });
    }, MOCK_DELAY);
  });
}