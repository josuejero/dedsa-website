import { forwardRef } from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className = '',
      href,
      external = false,
      children,
      ...props
    },
    ref,
  ) => {
    
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

    
    const variantClasses = {
      primary: 'bg-dsa-red text-white hover:bg-red-700 focus:ring-red-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
      outline:
        'bg-transparent text-dsa-red border border-dsa-red hover:bg-red-50 focus:ring-red-500',
    }[variant];

    
    const sizeClasses = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    }[size];

    
    const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : '';

    
    const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`;

    
    if (href) {
      const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
      return (
        <Link href={href} {...linkProps} className={buttonClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={buttonClasses} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
