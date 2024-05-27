type SidebarItem = {
  name: string;
  path: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children?: SidebarItem[];
};
