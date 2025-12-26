import React, { useState, useRef } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { ViewMode } from './types';
import { 
  PlayIcon, 
  RefreshCwIcon, 
  DownloadIcon, 
  TrashIcon, 
  LayoutSplitIcon,
  CodeIcon,
  EyeIcon,
  UploadIcon
} from './components/Icon';

const INITIAL_CODE = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>预览</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen flex items-center justify-center p-4">
    <div class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-float">
        <h1 class="text-4xl font-bold text-white mb-4 text-center">HTML 在线预览</h1>
        <p class="text-indigo-100 text-center mb-6">
            所见即所得。试着在左侧编辑代码看看效果吧！
        </p>
        <div class="flex justify-center gap-4">
            <button class="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-50 transition shadow-lg">
                开始使用
            </button>
            <button class="bg-indigo-600/50 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-600/70 transition border border-white/30">
                了解更多
            </button>
        </div>
    </div>
</body>
</html>`;

const App: React.FC = () => {
  const [code, setCode] = useState<string>(INITIAL_CODE);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SPLIT);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        setCode(content);
      }
    };
    reader.readAsText(file);
    // Reset value so we can load the same file again if needed
    event.target.value = '';
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      {/* Header / Toolbar */}
      <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 lg:px-6 shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <CodeIcon />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-gray-100 hidden sm:block">
            HTML <span className="text-gray-400 font-normal">在线预览</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          {/* Main Controls */}
          <div className="flex bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode(ViewMode.CODE)}
              className={`p-2 rounded-md transition-colors ${viewMode === ViewMode.CODE ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
              title="仅代码"
            >
              <CodeIcon />
            </button>
            <button
              onClick={() => setViewMode(ViewMode.SPLIT)}
              className={`p-2 rounded-md transition-colors hidden sm:block ${viewMode === ViewMode.SPLIT ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
              title="分屏视图"
            >
              <LayoutSplitIcon />
            </button>
            <button
              onClick={() => setViewMode(ViewMode.PREVIEW)}
              className={`p-2 rounded-md transition-colors ${viewMode === ViewMode.PREVIEW ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-gray-200'}`}
              title="仅预览"
            >
              <EyeIcon />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-800 mx-1"></div>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors border border-transparent ${
              autoRefresh 
                ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <RefreshCwIcon className={autoRefresh ? "animate-spin-slow" : ""} />
            <span className="hidden md:inline">{autoRefresh ? '自动运行' : '手动运行'}</span>
          </button>
          
          {!autoRefresh && (
             <button
             onClick={() => setCode(prev => prev + ' ')} // Hack to trigger update in preview component effect
             className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 transition-all"
           >
             <PlayIcon />
             <span>运行</span>
           </button>
          )}

          <div className="h-6 w-px bg-gray-800 mx-1 hidden sm:block"></div>
          
          <div className="relative group">
             <button 
                onClick={handleDownload} 
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="下载 HTML"
             >
               <DownloadIcon />
             </button>
          </div>

          <div className="relative group">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept=".html,.htm,.txt"
            />
             <button 
                onClick={() => fileInputRef.current?.click()} 
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="打开文件"
             >
               <UploadIcon />
             </button>
          </div>

          <button 
            onClick={() => { if(confirm('确定要清空所有代码吗？')) setCode(''); }} 
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            title="清空编辑器"
          >
            <TrashIcon />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative flex">
        
        {/* Editor Pane */}
        <div 
            className={`
                transition-all duration-300 ease-in-out h-full border-r border-gray-800
                ${viewMode === ViewMode.SPLIT ? 'w-1/2 hidden md:block' : ''}
                ${viewMode === ViewMode.CODE ? 'w-full' : ''}
                ${viewMode === ViewMode.PREVIEW ? 'w-0 hidden' : ''}
            `}
        >
          <Editor code={code} onChange={setCode} />
        </div>

        {/* Preview Pane */}
        <div 
            className={`
                transition-all duration-300 ease-in-out h-full
                ${viewMode === ViewMode.SPLIT ? 'w-1/2' : ''}
                ${viewMode === ViewMode.PREVIEW ? 'w-full' : ''}
                ${viewMode === ViewMode.CODE ? 'w-0 hidden' : ''}
                // On mobile, if split, we stack, but for simplicity in this CSS grid we might toggle
                ${viewMode === ViewMode.SPLIT ? 'block w-full md:w-1/2' : ''}
            `}
        >
            <Preview code={code} autoRefresh={autoRefresh} />
        </div>
      </main>

      {/* Mobile view logic adjustor (simple implementation) */}
      <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 p-1 rounded-full shadow-xl border border-gray-700 flex gap-1 z-50">
         <button 
           onClick={() => setViewMode(ViewMode.CODE)}
           className={`p-3 rounded-full ${viewMode === ViewMode.CODE ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
         >
           <CodeIcon />
         </button>
         <button 
           onClick={() => setViewMode(ViewMode.PREVIEW)}
           className={`p-3 rounded-full ${viewMode === ViewMode.PREVIEW ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}
         >
           <EyeIcon />
         </button>
      </div>

    </div>
  );
};

export default App;