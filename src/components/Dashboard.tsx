import React from 'react';
import { Zap, Clock, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  isMenuOpen: boolean;
}

export default function Dashboard({ isMenuOpen }: DashboardProps) {
  return (
    <main className={`pt-[57px] transition-all duration-300 ${isMenuOpen ? 'ml-64' : 'ml-20'} bg-slate-50 dark:bg-gray-900 min-h-screen`}>
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
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
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