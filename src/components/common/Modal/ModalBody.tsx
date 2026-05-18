import type { ReactNode } from 'react';

type BodyProps = {
  children: ReactNode;
  className?: string;
};

export const ModalBody = ({ children, className }: BodyProps) => (
  <div className={`flex-1 overflow-y-auto px-5 py-5 ${className ?? ''}`}>
    {children}
  </div>
);
