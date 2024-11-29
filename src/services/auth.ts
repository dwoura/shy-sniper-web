import { api } from '../config/axios';
import { User } from '../types/user';
import Cookies from 'js-cookie';

export const authService = {
  async getNonce(): Promise<string> {
    const { data } = await api.get<string>('/api/v1/user/getNonce');
    return data;
  },

  async verify(message: string, signature: string): Promise<string> {

    console.log({
      message,
      signature,
    })
    const { data } = await api.post<string>('/api/v1/user/authLoginSign', {
      message: message,
      signature: signature,
    });
    return data;
  },

  async getSession(): Promise<User | null> {
    try {
      const jwt = Cookies.get('jwt');
      if (!jwt) return null;
      // console.log(jwt)
      const { data } = await api.get<User>('/api/v1/user/getUserInfo', {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      return data;
    } catch (error) {
      Cookies.remove('jwt');
      return null;
    }
  },

  async logout(): Promise<void> {
    await api.post('/api/v1/user/logout');
    Cookies.remove('jwt');
  },
};