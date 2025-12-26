import React from 'react';
import { EditorProps } from '../types';

const Editor: React.FC<EditorProps> = ({ code, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Insert 2 spaces for tab
      const spaces = "  ";
      const value = target.value;
      
      const newValue = value.substring(0, start) + spaces + value.substring(end);
      onChange(newValue);

      // Move cursor
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 flex flex-col">
      <div className="flex-none px-4 py-2 bg-gray-900 border-b border-gray-800 text-gray-400 text-xs font-semibold tracking-wider uppercase flex justify-between items-center">
        <span>HTML 源码</span>
        <span className="text-gray-600">可编辑</span>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <textarea
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
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