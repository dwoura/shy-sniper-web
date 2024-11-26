import React, { useState } from 'react';
import { Zap, Clock, AlertTriangle, Lock, FileSignature, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAccount, useSignMessage } from 'wagmi';
import { verifySignature } from '../services/api';

interface DashboardProps {
  isMenuOpen: boolean;
}

export default function Dashboard({ isMenuOpen }: DashboardProps) {
  const { isAuthenticated, login } = useAuth();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!address) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const message = `Welcome to Shy-Sniper!\n\nPlease sign this message to verify your wallet ownership.\n\nThis action will not trigger any on-chain transactions or gas fees.\n\nTimestamp: ${Date.now()}`;
      
      // 等待用户在 MetaMask 中确认签名
      const signature = await signMessageAsync({ message });
      
      if (!signature) {
        throw new Error('No signature received');
      }

      // 验证签名
      const response = await verifySignature(address, signature, message);
      
      if (response.success) {
        login(response.token, response.user);
      } else {
        throw new Error('Signature verification failed');
      }
    } catch (err) {
      console.error('Sign in failed:', err);
      setError(err instanceof Error ? err.message : '签名验证失败');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <main className={`pt-[57px] transition-all duration-300 ${isMenuOpen ? 'ml-64' : 'ml-20'} bg-white dark:bg-gray-900 min-h-screen`}>
        <div className="flex items-center justify-center min-h-[calc(100vh-57px)]">
          <div className="text-center p-8 max-w-md">
            <div className="flex justify-center mb-4">
              <Lock className="w-16 h-16 text-gray-400 dark:text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              请连接钱包
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              点击右上角的"连接钱包"按钮开始使用
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className={`pt-[57px] transition-all duration-300 ${isMenuOpen ? 'ml-64' : 'ml-20'} bg-white dark:bg-gray-900 min-h-screen`}>
        <div className="flex items-center justify-center min-h-[calc(100vh-57px)]">
          <div className="text-center p-8 max-w-md">
            <div className="flex justify-center mb-4">
              <FileSignature className="w-16 h-16 text-blue-500 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              请完成签名验证
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              签名仅用于验证与获取账户信息，不会产生任何链上交易或 Gas 费用
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-base font-medium transition-colors duration-200 mx-auto disabled:opacity-50 min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  验证中...
                </>
              ) : (
                '签名登录'
              )}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`pt-[57px] transition-all duration-300 ${isMenuOpen ? 'ml-64' : 'ml-20'} bg-white dark:bg-gray-900 min-h-screen`}>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200">狙击状态</h3>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">活跃狙击器</span>
                <span className="text-green-600 dark:text-green-400 font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">成功率</span>
                <span className="text-green-600 dark:text-green-400 font-medium">87.5%</span>
              </div>
              <div className="mt-4">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors duration-200">
                  启动新狙击器
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200">最近活动</h3>
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">代币狙击</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">0x1234...5678</p>
                </div>
                <span className="text-green-600 dark:text-green-400 text-sm">+24.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">NFT 铸造</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">2分钟前</p>
                </div>
                <span className="text-blue-600 dark:text-blue-400 text-sm">进行中</span>
              </div>
            </div>
          </div>

          {/* Risk Alerts */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200">风险提醒</h3>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700/30">
                <p className="text-sm text-red-600 dark:text-red-400">高 Gas 费警告</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">当前: 150 gwei</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/30">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">新代币警告</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">流动性锁定: 否</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}