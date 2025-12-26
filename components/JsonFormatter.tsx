import React, { useState } from 'react';
import { TrashIcon, CopyIcon, JsonIcon, DownloadIcon } from './Icon';

interface JsonFormatterProps {
  onBack: () => void;
}

const JsonFormatter: React.FC<JsonFormatterProps> = ({ onBack }) => {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const formatJson = (minify: boolean = false) => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message || '无效的 JSON 格式');
      setOutput('');
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      // 可选：添加一个临时的复制成功提示
    }
  };

  const handleClear = () => {
    if (confirm('确定要清空所有内容吗？')) {
      setInput('');
      setOutput('');
      setError(null);
    }
  };

  const loadSample = () => {
    const sample = {
      "project": "开发者工具箱",
      "version": 1.0,
      "features": ["HTML预览", "JSON格式化"],
      "active": true,
      "metadata": {
        "created": "2024-05-20",
        "author": "User"
      }
    };
    setInput(JSON.stringify(sample));
    setOutput('');
    setError(null);
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
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
             <JsonIcon />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-gray-100 hidden sm:block group-hover:text-white transition-colors">
            JSON <span className="text-gray-400 font-normal group-hover:text-gray-300">格式化工具</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
            <button 
                onClick={loadSample}
                className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded border border-gray-700 hover:border-gray-500 transition-colors hidden sm:block"
            >
                加载示例
            </button>
            <div className="h-6 w-px bg-gray-800 mx-2 hidden sm:block"></div>
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
        
        {/* Input Section */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-gray-800 h-1/2 md:h-full">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">输入</span>
                <span className="text-xs text-gray-500">粘贴 JSON 字符串</span>
            </div>
            <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 w-full bg-gray-950 p-4 text-sm font-mono text-gray-300 focus:outline-none resize-none"
                placeholder='{"key": "value"}'
                spellCheck={false}
            />
        </div>

        {/* Controls (Middle on Desktop, Middle on Mobile) */}
        <div className="flex md:flex-col items-center justify-center gap-4 p-4 bg-gray-900 border-b md:border-b-0 md:border-r border-gray-800 z-10 shadow-lg">
            <button 
                onClick={() => formatJson(false)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-indigo-900/20 whitespace-nowrap"
            >
                格式化
            </button>
            <button 
                onClick={() => formatJson(true)}
                className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-gray-700 whitespace-nowrap"
            >
                压缩
            </button>
        </div>

        {/* Output Section */}
        <div className="flex-1 flex flex-col h-1/2 md:h-full relative">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-gray-800">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">结果</span>
                <div className="flex gap-2">
                    <button 
                        onClick={handleCopy}
                        disabled={!output}
                        className="text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="复制结果"
                    >
                        <CopyIcon />
                    </button>
                </div>
            </div>
            
            <div className="relative flex-1 bg-gray-950 w-full overflow-hidden">
                {error ? (
                    <div className="absolute inset-0 p-4 text-red-400 font-mono text-sm bg-red-900/10">
                        <strong>Error:</strong> {error}
                    </div>
                ) : (
                    <textarea 
                        readOnly
                        value={output}
                        className="w-full h-full bg-gray-950 p-4 text-sm font-mono text-green-400 focus:outline-none resize-none"
                        placeholder="结果将显示在这里..."
                    />
                )}
            </div>
        </div>

      </main>
    </div>
  );
};

export default JsonFormatter;