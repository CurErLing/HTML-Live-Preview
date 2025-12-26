import React, { useEffect, useRef } from 'react';
import { PreviewProps } from '../types';

const Preview: React.FC<PreviewProps> = ({ code, autoRefresh }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeCode, setActiveCode] = React.useState(code);

  // Debounce logic to prevent flashing if autoRefresh is on
  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setTimeout(() => {
      setActiveCode(code);
    }, 800); // 800ms debounce

    return () => clearTimeout(timer);
  }, [code, autoRefresh]);

  // If autoRefresh is off, we expect parent to handle when to push updates, 
  // but for this component, let's just respect the prop "code" if not in auto mode 
  // actually, usually explicit "Run" pushes a new prop.
  useEffect(() => {
    if (!autoRefresh) {
      setActiveCode(code);
    }
  }, [code, autoRefresh]);

  return (
    <div className="w-full h-full bg-white flex flex-col">
       <div className="flex-none px-4 py-2 bg-gray-100 border-b border-gray-200 text-gray-500 text-xs font-semibold tracking-wider uppercase flex justify-between items-center">
        <span>预览</span>
        <span className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          {autoRefresh ? '实时' : '手动'}
        </span>
      </div>
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          title="Live Preview"
          srcDoc={activeCode}
          className="absolute inset-0 w-full h-full border-none bg-white"
          sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
        />
      </div>
    </div>
  );
};

export default Preview;