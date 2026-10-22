// Framework-neutral Button contract
// Both @brkta/ui-react and @brkta/ui-angular implement this contract

export const buttonVariants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;
export const buttonAppearances = ["default", "glass"] as const;
export const buttonSizes = [
  "sm",
  "md",
  "lg",
  "icon-sm",
  "icon-md",
  "icon-lg",
] as const;

export interface ButtonContract {
  variant: (typeof buttonVariants)[number];
  appearance: (typeof buttonAppearances)[number];
  size: (typeof buttonSizes)[number];
  disabled: boolean;
  loading: boolean;
  loadingLabel?: string;
  /** Icon component or element placed before label text */
  iconBefore?: unknown;
  /** Icon component or element placed after label text */
  iconAfter?: unknown;
  /** Accessible label for icon-only buttons */
  ariaLabel?: string;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
}
