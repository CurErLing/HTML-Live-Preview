import React, { useState, useEffect } from 'react';
import { parse } from 'marked';
import { MarkdownIcon, TrashIcon, CopyIcon } from './Icon';

interface MarkdownPreviewProps {
  onBack: () => void;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ onBack }) => {
  const [markdown, setMarkdown] = useState<string>('# Hello Markdown\n\n开始输入你的内容...\n\n- 支持实时预览\n- 支持 **粗体** 和 *斜体*\n- 代码高亮\n\n```javascript\nconsole.log("Hello World");\n```');
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    // 简单的同步转换
    const converted = parse(markdown) as string;
    setHtml(converted);
  }, [markdown]);

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(html);
  };

  const handleClear = () => {
    if (confirm('确定要清空所有内容吗？')) {
      setMarkdown('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 lg:px-6 shadow-md z-10 flex-none">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={onBack}
          title="返回目录"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-105 transition-transform">
             <MarkdownIcon />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-gray-100 hidden sm:block group-hover:text-white transition-colors">
            Markdown <span className="text-gray-400 font-normal group-hover:text-gray-300">文档预览</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
            <button 
                onClick={handleCopyHtml}
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded border border-gray-700 hover:border-gray-500 transition-colors"
                title="复制 HTML 源码"
            >
                <CopyIcon />
                <span className="hidden sm:inline">复制 HTML</span>
            </button>
            <div className="h-6 w-px bg-gray-800 mx-1 hidden sm:block"></div>
            <button 
                onClick={handleClear} 
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                title="清空"
            >
                <TrashIcon />
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col md:flex-row">
        
        {/* Editor Section */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-gray-800 h-1/2 md:h-full">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Markdown 编辑</span>
            </div>
            <textarea 
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="flex-1 w-full bg-gray-950 p-4 text-sm font-mono text-gray-300 focus:outline-none resize-none leading-relaxed"
                placeholder="# 请输入 Markdown 内容..."
                spellCheck={false}
            />
        </div>

        {/* Preview Section */}
        <div className="flex-1 flex flex-col h-1/2 md:h-full bg-white text-gray-900">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">实时预览</span>
            </div>
            
            <div className="flex-1 overflow-auto p-8">
                {/* 使用 Tailwind Typography 插件的 prose 类来美化渲染后的 HTML */}
                <article 
                    className="prose prose-slate max-w-none prose-pre:bg-gray-100 prose-pre:text-gray-800"
                    dangerouslySetInnerHTML={{ __html: html }} 
                />
            </div>
        </div>

      </main>
    </div>
  );
};

export default MarkdownPreview;