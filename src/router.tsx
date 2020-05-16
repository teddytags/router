import { h, render, VElement, Component, unmountComponent } from "teddytags";
let basename: string,
  container: HTMLElement,
  routes: Partial<Route>[] = [];

export class Router {
  routes: Route[];
  basename: string;
  container: HTMLElement;
  constructor(options: RouterOptions) {
    this.container = container = options.container;
    this.routes = routes = options.routes;
    this.basename = basename = options.basename || "";
    const route = async () => {
      await loadRoute(this.basename, this.container, ...this.routes);
    };
    window.addEventListener("popstate", async () => {
      unmountComponent(this.container);
      await route();
    });
    route();
  }
}
const loadRoute = async (
  basename: string,
  container: HTMLElement,
  ...routeSegments: Route[]
) => {
  const paths = window.location.pathname.split("/");
  paths.map((path) => {
    let basenameRemoved: boolean;
    if (`/${path}` === basename && !basenameRemoved) {
      paths.splice(paths.indexOf(path), 1);
      basenameRemoved = true;
    }
  });
  const pathSegments = paths.length > 1 ? paths.splice(1) : "";
  const matchedRoute = matchRouteToURL(pathSegments, routeSegments);
  const toRender = await matchedRoute.render(matchedRoute.params);
  const titleElement = document.head.querySelector("title");
  titleElement.innerHTML = matchedRoute.title || titleElement.innerHTML;
  await render(toRender, container);
};
const matchRouteToURL = (
  urlSegments: string[] | "",
  routeSegments: Route[]
) => {
  interface routeParams {
    [prop: string]: string;
  }
  const routeParams: routeParams = {};
  // Get the 404 route
  const route404 = routeSegments.filter((route) => route.path === "404")[0];
  // Try and match the URL to a route.
  const matchedRoute = routeSegments.find((route: Route) => {
    // We assume that the route path always starts with a slash, and so
    // the first item in the segments array  will always be an empty
    // string. Slice the array at index 1 to ignore this empty string.
    const routePathSegments = route.path.split("/").slice(1);
    // If there are different numbers of segments, then the route does not match the URL.
    if (
      routePathSegments.length !== urlSegments.length &&
      !routePathSegments.includes(":endOfPath")
    ) {
      return false;
    }

    // If each segment in the url matches the corresponding segment in the route path,
    // or the parameter requests till end of path,
    // or the route path segment starts with a ':' then the route is matched.
    const match = routePathSegments.every((routePathSegment, i) => {
      return (
        routePathSegment === urlSegments[i] ||
        routePathSegment[0] === ":" ||
        routePathSegment === ":endOfPath"
      );
    });
    // If the route matches the URL, pull out any params from the URL.
    if (match === true) {
      routePathSegments.forEach((segment, i) => {
        if (segment === ":endOfPath") {
          //urlSegments is always an array herem, but a workaround to fool TS with
          if (Array.isArray(urlSegments)) {
            const propName = "endOfPath";
            const url = urlSegments.slice(1, urlSegments.length);
            routeParams.endOfPath = decodeURIComponent(url.join("/"));
          }
        }
        if (segment[0] === ":" && segment !== ":endOfPath") {
          const propName = segment.slice(1);
          routeParams[propName] = decodeURIComponent(urlSegments[i]);
        }
      });
    }
    return match;
  });
  if (matchedRoute) return { ...matchedRoute, params: routeParams };
  else return { ...route404, params: {} };
};
export class Link extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    window.history.pushState({}, "", this.props.path);
    const route = async () => {
      unmountComponent(container);
      await loadRoute(basename, container, ...routes);
    };
    route();
  }
  render() {
    return (
      <a
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          this.handleClick();
        }}
        href={this.props.path}
      >
        {this.props.name}
      </a>
    );
  }
}
interface LinkProps {
  path: string;
  name: string;
}
interface RouterOptions {
  container: HTMLElement;
  basename?: string;
  routes: Route[];
}

interface Route {
  path?: string;
  title?: string;
  render?(params: object): VElement;
}
