export interface BreadcrumbProp {
  name?: string;
  status_route?: boolean;
  route?: string;
}

export const BreadcrumbData = (rootTitle?: string, itemTitle?: string) => {
  const breadcrumbData: BreadcrumbProp[] = [
    { name: rootTitle, status_route: true, route: "/" },
    { name: itemTitle, status_route: false, route: "#" },
  ];

  return breadcrumbData;
};
