import React from 'react';
import { UserCircle, ChevronDown, LogOut } from 'lucide-react';
import { useDisconnect } from 'wagmi';
import { useAuth } from '../../context/AuthContext';

interface UserMenuProps {
  address: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function UserMenu({ address, isOpen, setIsOpen }: UserMenuProps) {
  const { disconnectAsync: disconnect } = useDisconnect();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await disconnect();
      logout();
      setIsOpen(false);
    } catch (error) {
      console.error('退出失败:', error);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
      >
        <UserCircle className="w-6 h-6" />
        <span>{formatAddress(address)}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">个人资料</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">设置</a>
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogOut className="w-4 h-4" />
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}