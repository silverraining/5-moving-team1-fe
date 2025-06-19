declare module 'simplebar-react' {
  import { ComponentType, HTMLAttributes } from 'react';
  
  interface SimpleBarProps extends HTMLAttributes<HTMLDivElement> {
    scrollableNodeProps?: object;
    autoHide?: boolean;
  }

  const SimpleBar: ComponentType<SimpleBarProps>;
  export default SimpleBar;
} 