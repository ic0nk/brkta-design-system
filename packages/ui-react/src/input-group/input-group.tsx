export interface InputGroupProps {
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function InputGroup({ disabled, invalid, className, children }: InputGroupProps) {
  return (
    <div
      data-brkta-input-group
      data-disabled={disabled ? '' : undefined}
      data-invalid={invalid ? '' : undefined}
      className={className}
    >
      {children}
    </div>
  );
}

export interface InputGroupAddonProps {
  className?: string;
  children?: React.ReactNode;
}

export function InputGroupAddon({ className, children }: InputGroupAddonProps) {
  return (
    <div data-brkta-input-group-addon className={className}>
      {children}
    </div>
  );
}
