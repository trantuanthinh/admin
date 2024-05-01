export type NavigationItem = NavigationLink | NavigationGroup;

export interface NavigationGroup {
    type: "group";
    code: string;
    label: string;
    icon?: string;
    children: Array<NavigationLink>;
}

export interface NavigationLink {
    type: "link";
    label: string;
    code: string;
    route: string | any;
    icon?: string;
}
