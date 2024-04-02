export type NavigationItem =
    | NavigationLink
    | NavigationGroup
    | NavigationSubheading;

export interface NavigationGroup {
    type: 'group';
    code: string;
    label: string;
    icon?: string;
    children: Array<NavigationSubheading | NavigationLink>;
}

export interface NavigationLink {
    type: 'link';
    code: string;
    actions?: 'favorite-menu' | 'more-menu' | 'favorite-only';
    route: string | any;
    label: string;
    icon?: string;
    favorite?: boolean;
    routerLinkActiveOptions?: { exact: boolean };
}

export interface NavigationSubheading {
    type: 'subheading';
    label: string;
    icon?: string;
}
