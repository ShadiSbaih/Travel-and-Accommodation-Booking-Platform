import { type InputHTMLAttributes, forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/shared/utils/cn';

const inputVariants = cva(
    'w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500',
                filled: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-0 focus:ring-2 focus:ring-primary-500',
                flushed: 'bg-transparent border-b-2 border-gray-300 dark:border-gray-600 rounded-none focus:border-primary-500 px-0',
            },
            size: {
                sm: 'text-sm py-1.5 px-2',
                md: 'text-base py-2 px-3',
                lg: 'text-lg py-3 px-4',
            },
            error: {
                true: 'border-red-500 focus:ring-red-500',
            },
        },
        defaultVariants: {
            variant: 'outline',
            size: 'md',
        },
    }
);

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    rightIcon?: React.ReactNode;
    variant?: 'outline' | 'filled' | 'flushed';
    size?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant,
            size,
            label,
            error,
            helperText,
            rightIcon,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        id={inputId}
                        ref={ref}
                        className={cn(
                            inputVariants({ variant, size, error: !!error }),
                            rightIcon && 'pr-10',
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                {helperText && !error && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;