import type { Button } from "./index";

/**
 * Button component props type
 * @example
 * ```tsx
 * const props: ButtonProps = {
 *   variant: "solid",
 *   size: "md",
 *   colorScheme: "primary",
 *   onClick: () => console.log("clicked")
 * };
 * ```
 */
export type ButtonProps = React.ComponentProps<typeof Button>;

/**
 * Button variant types
 */
export type ButtonVariant = "solid" | "outline" | "ghost";

/**
 * Button size types
 */
export type ButtonSize = "sm" | "md" | "lg" | "xl";

/**
 * Button color scheme types
 */
export type ButtonColorScheme =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "light"
  | "dark";
