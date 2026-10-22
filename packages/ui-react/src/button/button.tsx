"use client";

import {
  forwardRef,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
  type ReactElement,
} from "react";
import type {
  ButtonAppearance,
  ButtonVariant,
  ButtonSize,
} from "@brkta/ui-core/types/variant";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Surface treatment; use glass for labelled controls floating over media. */
  appearance?: ButtonAppearance;
  /** Size preset */
  size?: ButtonSize;
  /** Show loading indicator and disable interaction */
  loading?: boolean;
  loadingLabel?: string;
  /** Icon or element placed before the label text */
  iconBefore?: ReactNode;
  /** Icon or element placed after the label text */
  iconAfter?: ReactNode;
  /** Accessible label when icon-only or for extra context */
  accessibleLabel?: string;
  /**
   * When true, the button renders its child element instead of a <button>.
   * Useful for composing with anchor tags or Next.js Link.
   * Enabled via React.cloneElement which merges the button's props onto the child.
   */
  asChild?: boolean;
}

export interface ButtonLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  /** Destination rendered by the design-system button recipe as an anchor. */
  href: string;
  /** Visual variant of the button link */
  variant?: ButtonVariant;
  /** Surface treatment; use glass for labelled controls floating over media. */
  appearance?: ButtonAppearance;
  /** Size preset */
  size?: ButtonSize;
  /** Show loading state and suppress pointer interaction */
  loading?: boolean;
  loadingLabel?: string;
  /** Icon or element placed before the label text */
  iconBefore?: ReactNode;
  /** Icon or element placed after the label text */
  iconAfter?: ReactNode;
  /** Accessible label when icon-only or for extra context */
  accessibleLabel?: string;
}

/**
 * BRKTA Button — the single React implementation of the shared Button recipe.
 *
 * Renders a `<button>` element with framework-neutral data attributes
 * (`data-brkta-button`, `data-variant`, `data-size`, `data-loading`, `data-icon-only`)
 * that are targeted by the CSS in `@brkta/ui-core/button/button.css`.
 *
 * --- asChild ---
 * When `asChild` is `true`, the button renders its only child element directly
 * (via `cloneElement`) rather than wrapping it in a `<button>`. This is a
 * simplified version of the Radix Slot pattern — the child receives all
 * outgoing button props merged onto it.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      appearance = "default",
      size = "md",
      loading = false,
      loadingLabel = "Loading",
      disabled = false,
      iconBefore,
      iconAfter,
      children,
      className = "",
      type = "button",
      accessibleLabel,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const isIconOnly = !children && (!!iconBefore || !!iconAfter);

    /**
     * The hover fill expands from where the pointer entered, matching the site header's
     * rail controls and the Angular Button. React removes the handler with the element,
     * so nothing outlives the component.
     *
     * Keyboard focus and touch never reach this, so the CSS default of 50% stands —
     * neither has a meaningful entry point.
     */
    const placeFillOrigin = (event: React.PointerEvent<HTMLButtonElement>) => {
      props.onPointerEnter?.(event);
      if (event.pointerType !== "mouse") return;
      const target = event.currentTarget;
      const box = target.getBoundingClientRect();
      if (box.width === 0 || box.height === 0) return;
      target.style.setProperty("--brkta-button-fill-x", `${event.clientX - box.left}px`);
      target.style.setProperty("--brkta-button-fill-y", `${event.clientY - box.top}px`);
    };

    const commonProps = {
      ref,
      type: asChild ? undefined : type,
      disabled: asChild ? undefined : disabled || loading,
      "data-brkta-button": "",
      "data-variant": variant,
      "data-appearance": appearance,
      "data-size": size,
      "data-loading": loading || undefined,
      "data-icon-only": isIconOnly || undefined,
      "aria-label": accessibleLabel,
      className,
      ...props,
      // After the spread, so a caller's own onPointerEnter is chained rather than lost.
      onPointerEnter: placeFillOrigin,
    };

    // ── asChild: merge props onto the single child element ──────────
    if (asChild) {
      const child = children as
        ReactElement<{ children?: ReactNode }> | undefined;
      if (!isValidElement(child)) {
        throw new Error(
          "Button asChild expects a single valid React element child.",
        );
      }
      return cloneElement(child, {
        ...commonProps,
        // ref is handled by React.forwardRef on the parent
        children: (
          <>
            {loading && (
              <>
                <span className="brkta-button-loader" aria-hidden="true">
                  <span className="brkta-button-loader-dot" />
                  <span className="brkta-button-loader-dot" />
                  <span className="brkta-button-loader-dot" />
                </span>
                <span className="brkta-button-sr-loading sr-only">{loadingLabel}</span>
              </>
            )}
            <span className="brkta-button-content">
              {iconBefore}
              {child.props.children}
              {iconAfter}
            </span>
          </>
        ),
      });
    }

    // ── Default: render a native <button> ──────────────────────────
    return (
      <button {...commonProps}>
        {loading && (
          <>
            <span className="brkta-button-loader" aria-hidden="true">
              <span className="brkta-button-loader-dot" />
              <span className="brkta-button-loader-dot" />
              <span className="brkta-button-loader-dot" />
            </span>
            <span className="brkta-button-sr-loading sr-only">{loadingLabel}</span>
          </>
        )}
        <span className="brkta-button-content">
          {iconBefore}
          {children && <span className="brkta-button-label">{children}</span>}
          {iconAfter}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";

/**
 * BRKTA ButtonLink — the server-component-safe anchor implementation of the
 * shared Button recipe. Use this from Next.js server components instead of
 * passing an anchor through Button's client-side `asChild` clone path.
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      href,
      variant = "primary",
      appearance = "default",
      size = "md",
      loading = false,
      loadingLabel = "Loading",
      iconBefore,
      iconAfter,
      children,
      className = "",
      accessibleLabel,
      ...props
    },
    ref,
  ) => {
    const isIconOnly = !children && (!!iconBefore || !!iconAfter);

    return (
      <a
        {...props}
        ref={ref}
        href={href}
        aria-label={accessibleLabel}
        aria-disabled={loading || undefined}
        data-brkta-button=""
        data-variant={variant}
        data-appearance={appearance}
        data-size={size}
        data-loading={loading || undefined}
        data-icon-only={isIconOnly || undefined}
        className={className}
      >
        {loading && (
          <>
            <span className="brkta-button-loader" aria-hidden="true">
              <span className="brkta-button-loader-dot" />
              <span className="brkta-button-loader-dot" />
              <span className="brkta-button-loader-dot" />
            </span>
            <span className="brkta-button-sr-loading sr-only">{loadingLabel}</span>
          </>
        )}
        <span className="brkta-button-content">
          {iconBefore}
          {children && <span className="brkta-button-label">{children}</span>}
          {iconAfter}
        </span>
      </a>
    );
  },
);

ButtonLink.displayName = "ButtonLink";
