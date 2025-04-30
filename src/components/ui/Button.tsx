import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isFullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500/50',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-2 focus:ring-slate-200/50 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-slate-200/50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700',
    ghost: 'text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-slate-200/50 dark:text-slate-300 dark:hover:bg-slate-800',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500/50',
  };
  
  // Width classes
  const widthClasses = isFullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = props.disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  // Loading state
  const loadingMarkup = isLoading ? (
    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  ) : null;
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && loadingMarkup}
      {children}
    </button>
  );
}