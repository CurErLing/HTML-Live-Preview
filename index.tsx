import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 获取 HTML 中的根元素
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// 创建 React 根节点并渲染主组件 App
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);