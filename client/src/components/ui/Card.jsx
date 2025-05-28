import React from 'react';
import { cn } from '../../utils/cn';

const Card = ({ children, className = '', interactive = false, onClick }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow p-6',
        interactive && 'hover:shadow-lg cursor-pointer transition-shadow',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={cn('text-lg font-bold text-gray-800', className)}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={cn('text-gray-600 mt-1', className)}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={cn('', className)}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={cn('mt-4 pt-4 border-t border-gray-100', className)}>
    {children}
  </div>
);

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
