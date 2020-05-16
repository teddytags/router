import { VElement, Component } from "teddytags";
declare class Router {
    routes: Route[];
    basename: string;
    container: HTMLElement;
    constructor(options: RouterOptions);
}
declare class Link extends Component<LinkProps> {
    constructor(props: LinkProps);
    handleClick(): void;
    render(): JSX.Element;
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
export { Router, Link };
