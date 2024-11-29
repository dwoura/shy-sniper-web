import { SIWEConfig } from 'connectkit';
import { SiweMessage } from 'siwe';
import { authService } from '../services/auth';
import { useAuthStore } from '../stores/useAuthStore';
import Cookies from 'js-cookie';

const domain = window.location.host;
const origin = window.location.origin;

export const siweConfig: SIWEConfig = {
  getNonce: async () => {
    return await authService.getNonce();
  },

  createMessage: ({ nonce, address, chainId }) => {
    return new SiweMessage({
      version: '1',
      domain,
      uri: origin,
      address,
      chainId,
      nonce,
      statement: 'Welcome to Shy-Sniper!',
    }).prepareMessage();
  },

  verifyMessage: async ({ message, signature }) => {
    try {
      const jwt = await authService.verify(message, signature);
      if (jwt) {
        Cookies.set('jwt', jwt, { expires: 7 }); // JWT 有效期7天
        useAuthStore.getState().setJWT(jwt);
        return true;
      }
      return false;
    } catch (error) {
      console.error('验证签名失败:', error);
      return false;
    }
  },

  getSession: async () => {
    try {
      const user = await authService.getSession();
      if (user) {
        useAuthStore.getState().setUser(user);
        const siweSession = {
          address: user.address,
          chainId: 1, // 默认使用以太坊主网
        }
        // window.location.href = '/';
        return siweSession;
      }
      return null;
    } catch (error) {
      console.error('获取会话失败:', error);
      return null;
    }
  },

  signOut: async () => {
    try {
      // 一次性清除所有状态
      Cookies.remove('jwt');
      useAuthStore.getState().logout();
      // 可选：通知后端
      //await authService.logout().catch(() => {});
      return true;
    } catch (error) {
      console.error('退出登录失败:', error);
      return false;
    }
  },
  enabled: true,
  //nonceRefetchInterval: 300000, // 5分钟
  //sessionRefetchInterval: 300000, // 5分钟
  signOutOnDisconnect: true,
  signOutOnAccountChange: true,
  signOutOnNetworkChange: true,
};