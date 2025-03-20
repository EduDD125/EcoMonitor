export interface ISubRoute {
  path: string;
  text: string;
}

export interface IRoute {
  text: string;
  icon: React.JSX.Element;
  subRoutes: ISubRoute[];
}