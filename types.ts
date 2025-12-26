/**
 * 编辑器组件的属性定义
 */
export interface EditorProps {
  code: string;                  // 当前编辑器的代码内容
  onChange: (value: string) => void; // 代码发生变化时的回调函数
  language?: string;             // 语言类型（可选，目前默认为 HTML）
}

/**
 * 预览组件的属性定义
 */
export interface PreviewProps {
  code: string;         // 需要预览的 HTML 代码
  autoRefresh: boolean; // 是否开启自动刷新
}

/**
 * 视图模式枚举
 * 控制主界面的布局显示
 */
export enum ViewMode {
  SPLIT = 'SPLIT',     // 分屏模式（左侧代码，右侧预览）
  CODE = 'CODE',       // 仅代码模式
  PREVIEW = 'PREVIEW'  // 仅预览模式
}