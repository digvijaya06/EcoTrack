import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  ...props
}) => {
  const base = 'btn d-inline-flex align-items-center justify-content-center font-weight-medium rounded transition focus:outline-none focus:ring';

  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline-secondary',
    ghost: 'btn-link text-secondary',
  };

  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  return (
    <button
      className={cn(
        base,
        variants[variant],
        sizes[size],
        isLoading && 'cursor-wait opacity-80',
        disabled && 'cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
      ) : (
        leftIcon && <span className="mr-2">{leftIcon}</span>
      )}

      {children}

      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
