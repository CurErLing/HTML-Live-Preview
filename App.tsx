import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import HtmlPreview from './components/HtmlPreview';
import JsonFormatter from './components/JsonFormatter';
import MarkdownPreview from './components/MarkdownPreview';

const App: React.FC = () => {
  // 简单的路由状态管理
  const [currentPage, setCurrentPage] = useState<string>('landing');
  
  // 主题状态管理，默认关闭暗黑模式（即默认为白色模式）
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // 导航处理
  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 渲染页面
  return (
    // 使用 Tailwind 的 dark 类名控制策略
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="font-sans antialiased text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-white h-screen w-screen overflow-hidden transition-colors duration-300">
        {currentPage === 'landing' && (
          <LandingPage 
            onNavigate={navigate} 
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        )}
        
        {currentPage === 'html-preview' && (
          <HtmlPreview onBack={() => navigate('landing')} />
        )}

        {currentPage === 'json-formatter' && (
          <JsonFormatter onBack={() => navigate('landing')} />
        )}

        {currentPage === 'markdown-preview' && (
          <MarkdownPreview onBack={() => navigate('landing')} />
        )}
      </div>
    </div>
  );
};

export default App;