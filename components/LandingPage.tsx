import React from 'react';
import { CodeIcon, JsonIcon, MarkdownIcon, SunIcon, MoonIcon } from './Icon';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, isDarkMode, toggleTheme }) => {
  return (
    // 修改背景色为响应式，支持 dark 模式
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col relative overflow-hidden font-sans transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <header className="relative z-10 px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center shadow-lg">
             <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 text-xl">D</span>
           </div>
           <span className="text-xl font-bold text-gray-800 dark:text-gray-200 tracking-tight">开发者工具箱</span>
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white shadow-sm hover:shadow-md transition-all duration-300"
          title={isDarkMode ? "切换到白天模式" : "切换到夜间模式"}
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500 tracking-tight leading-tight">
            构建，预览，发布。
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed">
            专为现代 Web 开发者打造的轻量级工具集合。<br/>无需配置，即开即用。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mx-auto px-4">
           {/* HTML Preview Card */}
           <div 
             onClick={() => onNavigate('html-preview')} 
             className="group relative bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-indigo-500/30">
                  <div className="text-gray-700 dark:text-gray-300">
                    <CodeIcon />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">HTML 在线预览</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  支持 HTML、Tailwind CSS 和 JavaScript 的实时代码编辑器。提供分屏预览、自动刷新和代码下载功能。
                </p>

                <div className="mt-6 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  立即使用 <span className="ml-1">→</span>
                </div>
              </div>
           </div>

           {/* JSON Formatter Card */}
           <div 
             onClick={() => onNavigate('json-formatter')}
             className="group relative bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-purple-500/30">
                   <div className="text-gray-700 dark:text-gray-300">
                     <JsonIcon />
                   </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">JSON 格式化</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  快速验证、美化和压缩 JSON 数据。支持语法错误检测和一键复制，让数据处理更轻松。
                </p>
                 <div className="mt-6 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  立即使用 <span className="ml-1">→</span>
                </div>
              </div>
           </div>

           {/* Markdown Preview Card */}
           <div 
             onClick={() => onNavigate('markdown-preview')}
             className="group relative bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-green-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-1"
           >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-green-500/30">
                   <div className="text-gray-700 dark:text-gray-300">
                     <MarkdownIcon />
                   </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">Markdown 文档</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  编写和预览 Markdown 文档。支持实时渲染、代码高亮和标准 Markdown 语法支持，所写即所得。
                </p>
                 <div className="mt-6 flex items-center text-sm font-medium text-green-600 dark:text-green-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  立即使用 <span className="ml-1">→</span>
                </div>
              </div>
           </div>
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center text-gray-500 dark:text-gray-600 text-sm">
        <p>© 2024 开发者工具箱</p>
      </footer>
    </div>
  );
};

export default LandingPage;