import React from 'react';
import { EditorProps } from '../types';

/**
 * 简单的代码编辑器组件
 * 提供基本的文本编辑功能，支持 Tab 键缩进
 */
const Editor: React.FC<EditorProps> = ({ code, onChange }) => {
  
  // 处理文本输入变化
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // 处理键盘按键事件，特别是 Tab 键
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // 阻止默认的焦点切换行为
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // 插入 2 个空格来模拟 Tab 缩进
      const spaces = "  ";
      const value = target.value;
      
      // 在光标位置拼接字符串
      const newValue = value.substring(0, start) + spaces + value.substring(end);
      onChange(newValue);

      // 重新定位光标位置到插入的空格之后
      // 使用 requestAnimationFrame 确保在 React 渲染更新后设置光标
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col">
      {/* 编辑器头部状态栏 */}
      <div className="flex-none px-4 py-2 bg-gray-900 border-b border-gray-800 text-gray-400 text-xs font-semibold tracking-wider uppercase flex justify-between items-center">
        <span>HTML 源码</span>
        <span className="text-gray-600">可编辑</span>
      </div>
      
      {/* 代码输入区域 */}
      <div className="flex-1 relative overflow-hidden">
        <textarea
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false} // 关闭拼写检查，避免代码被标记错误
          className="absolute inset-0 w-full h-full p-4 bg-gray-950 text-gray-100 font-mono text-sm resize-none focus:outline-none leading-relaxed border-none"
          placeholder="<html>
  <body>
    <h1>你好，世界</h1>
  </body>
</html>"
        />
      </div>
    </div>
  );
};

export default Editor;