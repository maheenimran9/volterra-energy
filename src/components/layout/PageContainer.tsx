import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};
