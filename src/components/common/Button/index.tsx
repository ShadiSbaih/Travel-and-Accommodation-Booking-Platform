import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/utils/cn";

const buttonStyles = cva(
    // Base styles (common styles shared between all buttons):
    [
        "inline-flex",
        "items-center",
        "justify-center",
        "rounded-md",
        "w-fit",
        "font-semibold",
        "focus:outline-none",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "transition-colors",
        "duration-200",
    ],
    {
        variants: {
            variant: {
                solid: "",
                outline: "border-2 bg-transparent",
                ghost: "bg-transparent border-transparent",
            },
            size: {
                sm: "px-3 py-1.5 text-sm",
                md: "px-4 py-2 text-base",
                lg: "px-6 py-3 text-lg",
                xl: "px-8 py-4 text-xl",
            },
            colorScheme: {
                primary: "",
                secondary: "",
                danger: "",
                success: "",
                warning: "",
                info: "",
                light: "",
                dark: "",
            },
        },
        compoundVariants: [
            // Solid variants
            {
                variant: "solid",
                colorScheme: "primary",
                className:
                    `bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 disabled:bg-primary-300 disabled:hover:bg-primary-300
             dark:bg-primary-600 dark:hover:bg-primary-700 dark:disabled:bg-primary-800 dark:disabled:hover:bg-primary-800`,
            },
            {
                variant: "solid",
                colorScheme: "secondary",
                className:
                    `bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-500 disabled:bg-secondary-300 disabled:hover:bg-secondary-300
             dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:disabled:bg-secondary-800 dark:disabled:hover:bg-secondary-800`,
            },
            {
                variant: "solid",
                colorScheme: "danger",
                className:
                    `bg-danger-500 hover:bg-danger-600 text-white focus:ring-danger-500 disabled:bg-danger-300 disabled:hover:bg-danger-300
             dark:bg-danger-600 dark:hover:bg-danger-700 dark:disabled:bg-danger-800 dark:disabled:hover:bg-danger-800`,
            },
            {
                variant: "solid",
                colorScheme: "success",
                className:
                    `bg-success-500 hover:bg-success-600 text-white focus:ring-success-500 disabled:bg-success-300 disabled:hover:bg-success-300
             dark:bg-success-600 dark:hover:bg-success-700 dark:disabled:bg-success-800 dark:disabled:hover:bg-success-800`,
            },
            {
                variant: "solid",
                colorScheme: "warning",
                className:
                    `bg-warning-500 hover:bg-warning-600 text-white focus:ring-warning-500 disabled:bg-warning-300 disabled:hover:bg-warning-300 
             dark:bg-warning-400 dark:hover:bg-warning-500 dark:disabled:bg-warning-600 dark:disabled:hover:bg-warning-600`,
            },
            {
                variant: "solid",
                colorScheme: "info",
                className:
                    `bg-info-500 hover:bg-info-600 text-white focus:ring-info-500 disabled:bg-info-300 disabled:hover:bg-info-300
             dark:bg-info-600 dark:hover:bg-info-700 dark:disabled:bg-info-800 dark:disabled:hover:bg-info-800`,
            },
            {
                variant: "solid",
                colorScheme: "light",
                className:
                    `bg-light-100 hover:bg-light-200 text-light-900 focus:ring-light-500 disabled:bg-light-50 disabled:hover:bg-light-50
             dark:bg-light-700 dark:hover:bg-light-800 dark:text-white dark:disabled:bg-light-900 dark:disabled:hover:bg-light-900`,
            },
            {
                variant: "solid",
                colorScheme: "dark",
                className:
                    "bg-dark-800 hover:bg-dark-900 text-white focus:ring-dark-500 disabled:bg-dark-600 disabled:hover:bg-dark-600",
            },
            // Outline variants
            {
                variant: "outline",
                colorScheme: "primary",
                className:
                    `text-primary-600 border-primary-500 hover:bg-primary-50 hover:text-primary-700 focus:ring-primary-500 disabled:text-primary-300 disabled:border-primary-200
             dark:text-primary-400 dark:border-primary-600 dark:hover:bg-primary-950 dark:hover:text-primary-300 dark:disabled:text-primary-700 dark:disabled:border-primary-800`,
            },
            {
                variant: "outline",
                colorScheme: "secondary",
                className:
                    `text-secondary-600 border-secondary-500 hover:bg-secondary-50 hover:text-secondary-700 focus:ring-secondary-500 disabled:text-secondary-300 disabled:border-secondary-200
             dark:text-secondary-400 dark:border-secondary-600 dark:hover:bg-secondary-950 dark:hover:text-secondary-300 dark:disabled:text-secondary-700 dark:disabled:border-secondary-800`,
            },
            {
                variant: "outline",
                colorScheme: "danger",
                className:
                    `text-danger-600 border-danger-500 hover:bg-danger-50 hover:text-danger-700 focus:ring-danger-500 disabled:text-danger-300 disabled:border-danger-200
             dark:text-danger-400 dark:border-danger-600 dark:hover:bg-danger-950 dark:hover:text-danger-300 dark:disabled:text-danger-700 dark:disabled:border-danger-800`,
            },
            {
                variant: "outline",
                colorScheme: "success",
                className:
                    `text-success-600 border-success-500 hover:bg-success-50 hover:text-success-700 focus:ring-success-500 disabled:text-success-300 disabled:border-success-200
             dark:text-success-400 dark:border-success-600 dark:hover:bg-success-950 dark:hover:text-success-300 dark:disabled:text-success-700 dark:disabled:border-success-800`,
            },
            {
                variant: "outline",
                colorScheme: "warning",
                className:
                    `text-warning-600 border-warning-500 hover:bg-warning-50 hover:text-warning-700 focus:ring-warning-500 disabled:text-warning-300 disabled:border-warning-200
             dark:text-warning-400 dark:border-warning-500 dark:hover:bg-warning-950 dark:hover:text-warning-300 dark:disabled:text-warning-700 dark:disabled:border-warning-700`,
            },
            {
                variant: "outline",
                colorScheme: "info",
                className:
                    `text-info-600 border-info-500 hover:bg-info-50 hover:text-info-700 focus:ring-info-500 disabled:text-info-300 disabled:border-info-200
             dark:text-info-400 dark:border-info-600 dark:hover:bg-info-950 dark:hover:text-info-300 dark:disabled:text-info-700 dark:disabled:border-info-800`,
            },
            {
                variant: "outline",
                colorScheme: "light",
                className:
                    `text-light-600 border-light-300 hover:bg-light-50 hover:text-light-700 focus:ring-light-500 disabled:text-light-300 disabled:border-light-200
             dark:text-light-400 dark:border-light-600 dark:hover:bg-light-950 dark:hover:text-light-300 dark:disabled:text-light-700 dark:disabled:border-light-800`,
            },
            {
                variant: "outline",
                colorScheme: "dark",
                className:
                    "text-dark-600 border-dark-500 hover:bg-dark-50 hover:text-dark-700 focus:ring-dark-500 disabled:text-dark-300 disabled:border-dark-200",
            },
            // Ghost variants
            {
                variant: "ghost",
                colorScheme: "primary",
                className:
                    `text-primary-600 hover:bg-primary-50 hover:text-primary-700 focus:ring-primary-500 disabled:text-primary-300
             dark:text-primary-400 dark:hover:bg-primary-950 dark:hover:text-primary-300 dark:disabled:text-primary-700`,
            },
            {
                variant: "ghost",
                colorScheme: "secondary",
                className:
                    `text-secondary-600 hover:bg-secondary-50 hover:text-secondary-700 focus:ring-secondary-500 disabled:text-secondary-300
             dark:text-secondary-400 dark:hover:bg-secondary-950 dark:hover:text-secondary-300 dark:disabled:text-secondary-700`,
            },
            {
                variant: "ghost",
                colorScheme: "danger",
                className:
                    `text-danger-600 hover:bg-danger-50 hover:text-danger-700 focus:ring-danger-500 disabled:text-danger-300
             dark:text-danger-400 dark:hover:bg-danger-950 dark:hover:text-danger-300 dark:disabled:text-danger-700`,
            },
            {
                variant: "ghost",
                colorScheme: "success",
                className:
                    `text-success-600 hover:bg-success-50 hover:text-success-700 focus:ring-success-500 disabled:text-success-300
             dark:text-success-400 dark:hover:bg-success-950 dark:hover:text-success-300 dark:disabled:text-success-700`,
            },
            {
                variant: "ghost",
                colorScheme: "warning",
                className:
                    `text-warning-600 hover:bg-warning-50 hover:text-warning-700 focus:ring-warning-500 disabled:text-warning-300
             dark:text-warning-400 dark:hover:bg-warning-950 dark:hover:text-warning-300 dark:disabled:text-warning-700`,
            },
            {
                variant: "ghost",
                colorScheme: "info",
                className:
                    `text-info-600 hover:bg-info-50 hover:text-info-700 focus:ring-info-500 disabled:text-info-300
             dark:text-info-400 dark:hover:bg-info-950 dark:hover:text-info-300 dark:disabled:text-info-700`,
            },
            {
                variant: "ghost",
                colorScheme: "light",
                className:
                    `text-light-600 hover:bg-light-50 hover:text-light-700 focus:ring-light-500 disabled:text-light-300
             dark:text-light-400 dark:hover:bg-light-950 dark:hover:text-light-300 dark:disabled:text-light-700`,
            },
            {
                variant: "ghost",
                colorScheme: "dark",
                className:
                    "text-dark-600 hover:bg-dark-50 hover:text-dark-700 focus:ring-dark-500 disabled:text-dark-300",
            },
        ],
        defaultVariants: {
            variant: "solid",
            size: "md",
            colorScheme: "primary",
        },
    }
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonStyles>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant, size, colorScheme, className, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(buttonStyles({ variant, size, colorScheme, className }))}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export default Button;
