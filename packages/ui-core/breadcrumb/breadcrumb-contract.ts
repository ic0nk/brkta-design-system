// Framework-neutral Breadcrumb contract
export interface BreadcrumbItemContract {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbContract {
  items: BreadcrumbItemContract[];
  separator?: unknown; // icon component or string
}
