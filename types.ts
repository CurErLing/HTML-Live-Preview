export interface EditorProps {
  code: string;
  onChange: (value: string) => void;
  language?: string;
}

export interface PreviewProps {
  code: string;
  autoRefresh: boolean;
}

export interface ToolbarProps {
  onClear: () => void;
  onDownload: () => void;
  onAiGenerate: (prompt: string) => Promise<void>;
  isAiLoading: boolean;
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  runPreview: () => void;
}

export enum ViewMode {
  SPLIT = 'SPLIT',
  CODE = 'CODE',
  PREVIEW = 'PREVIEW'
}