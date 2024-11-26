import React from 'react';
import { Store, Activity, ShoppingCart, ChevronDown } from 'lucide-react';

interface SidebarProps {
  isMenuOpen: boolean;
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
}

export default function Sidebar({ isMenuOpen, activeMenu, setActiveMenu }: SidebarProps) {
  const menuItems = [
    {
      title: '一级市场',
      icon: <Store className="w-5 h-5" />,
      submenu: ['代币发行', '流动性管理', '预售管理', '发行日历']
    },
    {
      title: '二级市场',
      icon: <ShoppingCart className="w-5 h-5" />,
      submenu: ['交易中心', '订单管理', '投资组合', '交易历史']
    },
    {
      title: '市场监控',
      icon: <Activity className="w-5 h-5" />,
      submenu: ['实时价格', '市场深度', '交易量分析', '异常监测']
    }
  ];

  return (
    <aside className={`fixed left-0 top-[57px] h-[calc(100vh-57px)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${isMenuOpen ? 'w-64' : 'w-20'}`}>
      <nav className="p-4">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200
                ${activeMenu === item.title 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800'}`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {isMenuOpen && <span>{item.title}</span>}
              </div>
              {isMenuOpen && (
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === item.title ? 'rotate-180' : ''}`} />
              )}
            </button>
            
            {isMenuOpen && activeMenu === item.title && (
              <div className="ml-4 mt-2 space-y-1">
                {item.submenu.map((subItem, subIndex) => (
                  <a
                    key={subIndex}
                    href="#"
                    className="block p-2 pl-8 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800 text-sm"
                  >
                    {subItem}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}