import { SignMessageArgs } from 'wagmi/actions';

const SIGN_MESSAGE = "欢迎使用 Shy-Sniper！\n\n请签名此消息以登录应用。\n\n此操作不会产生任何费用。\n\n时间戳：";

export const getSignMessage = () => {
  return `${SIGN_MESSAGE}${Date.now()}`;
};

export const verifySignature = async (address: string, signature: string, message: string) => {
  // 在实际应用中，你可能需要发送到后端验证
  // 这里仅作演示，直接返回true
  return true;
};