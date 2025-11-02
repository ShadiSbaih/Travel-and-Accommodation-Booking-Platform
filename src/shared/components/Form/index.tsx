import type { FormHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    error?: string;
    footer?: ReactNode;
}

function Form({
    children,
    title,
    subtitle,
    error,
    footer,
    className,
    ...props
}: FormProps) {
    return (
        <div className="w-full max-w-md">
            <form
                className={cn(
                    'bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md',
                    className
                )}
                {...props}
            >
                {(title || subtitle) && (
                    <div className="mb-6">
                        {title && (
                            <h1 className="text-2xl font-bold text-center dark:text-white mb-2">
                                {title}
                            </h1>
                        )}
                        {subtitle && (
                            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-4">{children}</div>

                {footer && <div className="mt-6">{footer}</div>}
            </form>
        </div>
    );
}

export default Form;