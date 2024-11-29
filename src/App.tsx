import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
          <Header 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
          />
          <Sidebar 
            isMenuOpen={isMenuOpen}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />
          <Dashboard isMenuOpen={isMenuOpen} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}