export interface ItemProps {
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Item({ selected, disabled, className, children }: ItemProps) {
  return (
    <div
      data-brkta-item
      data-selected={selected ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      className={className}
      aria-selected={selected}
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
}

export interface ItemLeadingProps {
  className?: string;
  children?: React.ReactNode;
}

export function ItemLeading({ className, children }: ItemLeadingProps) {
  return <div data-brkta-item-leading className={className}>{children}</div>;
}

export interface ItemBodyProps {
  className?: string;
  children?: React.ReactNode;
}

export function ItemBody({ className, children }: ItemBodyProps) {
  return <div data-brkta-item-body className={className}>{children}</div>;
}

export interface ItemTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export function ItemTitle({ className, children }: ItemTitleProps) {
  return <div data-brkta-item-title className={className}>{children}</div>;
}

export interface ItemDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

export function ItemDescription({ className, children }: ItemDescriptionProps) {
  return <div data-brkta-item-description className={className}>{children}</div>;
}

export interface ItemTrailingProps {
  className?: string;
  children?: React.ReactNode;
}

export function ItemTrailing({ className, children }: ItemTrailingProps) {
  return <div data-brkta-item-trailing className={className}>{children}</div>;
}
