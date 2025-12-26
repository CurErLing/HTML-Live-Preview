import React, { useEffect, useRef } from 'react';
import { PreviewProps } from '../types';

/**
 * 预览组件
 * 使用 iframe 渲染 HTML 代码，提供安全的沙箱环境
 */
const Preview: React.FC<PreviewProps> = ({ code, autoRefresh }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // 维护一个内部状态 activeCode，用于控制实际渲染给 iframe 的代码
  const [activeCode, setActiveCode] = React.useState(code);

  // 防抖逻辑 (Debounce)
  // 当开启自动刷新时，用户输入会触发 code 变化
  // 我们延迟 800ms 再更新 activeCode，避免 iframe 频繁刷新导致闪烁或性能问题
  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setTimeout(() => {
      setActiveCode(code);
    }, 800); // 800ms 防抖时间

    return () => clearTimeout(timer); // 清除上一次的定时器
  }, [code, autoRefresh]);

  // 手动模式处理
  // 如果自动刷新被关闭，只有当父组件强制传递新 code 时（例如点击"运行"），
  // 我们才可能需要更新，但在当前逻辑中，如果关闭自动刷新，
  // 我们通常依赖父组件传递的 props 变化来决定是否更新。
  // 注意：当从自动切换回手动，或手动点击运行时，这个 Effect 确保 activeCode 及时更新。
  useEffect(() => {
    if (!autoRefresh) {
      setActiveCode(code);
    }
  }, [code, autoRefresh]);

  return (
    <div className="w-full h-full bg-white flex flex-col">
       {/* 预览头部状态栏 */}
       <div className="flex-none px-4 py-2 bg-gray-100 border-b border-gray-200 text-gray-500 text-xs font-semibold tracking-wider uppercase flex justify-between items-center">
        <span>预览</span>
        <span className="flex items-center gap-1">
          {/* 状态指示灯 */}
          <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          {autoRefresh ? '实时' : '手动'}
        </span>
      </div>
      
      {/* Iframe 容器 */}
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          title="Live Preview"
          srcDoc={activeCode} // 使用 srcDoc 直接渲染字符串内容
          className="absolute inset-0 w-full h-full border-none bg-white"
          // 沙箱设置：允许脚本、模态框、表单、弹窗和同源资源，但不允许顶层导航等不安全操作
          sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
        />
      </div>
    </div>
  );
};

export default Preview;