import { Fragment } from "react";
import type { BreadcrumbItemContract } from "@brkta/ui-core/breadcrumb/breadcrumb-contract";

export interface BreadcrumbProps {
  items: BreadcrumbItemContract[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav data-brkta-breadcrumb="" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <Fragment key={`${item.href ?? "current"}-${item.label}-${i}`}>
          {item.href && !item.current ? (
            <span data-brkta-breadcrumb-item="">
              <a href={item.href}>{item.label}</a>
            </span>
          ) : (
            <span
              data-brkta-breadcrumb-item=""
              data-current={item.current ? "true" : undefined}
              aria-current={item.current ? "page" : undefined}
            >
              {item.label}
            </span>
          )}
          {i < items.length - 1 && (
            <span
              data-brkta-breadcrumb-separator=""
              aria-hidden="true"
            >
              /
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
