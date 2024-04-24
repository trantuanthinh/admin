import { CommonModule } from "@angular/common";
import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { FlexLayoutServerModule } from "@angular/flex-layout/server";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NavigationItem } from "./navbar-items.interface";
// import { navbarData } from "./navbar-items.interface";

interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}

@Component({
    selector: "app-admin-navbar",
    standalone: true,
    imports: [
        CommonModule,
        FlexLayoutServerModule,
        RouterModule,
        FontAwesomeModule,
        MatSidenavModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
    ],
    templateUrl: "./admin-navbar.component.html",
    styleUrl: "./admin-navbar.component.scss",
})
export class AdminNavbarComponent implements OnInit {
    public versions: string = "1.0.0";
    public currentUser: any = {
        id: "",
        name: "Admin",
    };
    @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
    @Output() labelName: EventEmitter<string> = new EventEmitter<string>();
    label!: string;

    collapsed = false;
    screenWidth = 0;
    // navData = navbarData;
    @Input() opened: boolean = true;
    @Output() onToggle: any = new EventEmitter();
    public openedPanel: string = "infomations";
    public arrApps: any[] = [];
    constructor(public router: Router, private cdr: ChangeDetectorRef) {
        this.getNavData();
    }

    getNavData() {
        this.arrApps.push(this.getHome());
        this.arrApps.push(this.getProductsManagement());
        this.arrApps.push(this.getOrdersManagement());
        this.arrApps.push(this.getIngredientsManagement());
        this.arrApps.push(this.getCustomersManagement());
    }

    emitTitle(item: string) {
        this.label = item;
        this.labelName.emit(this.label);
    }

    @HostListener("window:resize", ["$event"])
    onResize(event: any) {
        if (typeof window !== "undefined") {
            this.screenWidth = window.innerWidth;
            this.checkScreenWidth();
        }
    }

    ngOnInit(): void {
        //   this.screenWidth = window.innerWidth;
        if (typeof window !== "undefined") {
            this.screenWidth = window.innerWidth;
            this.checkScreenWidth();
        }
        this.label = "Home";
        this.emitTitle(this.label);
    }

    toggleCollapse(): void {
        this.collapsed = !this.collapsed;
        this.onToggleSideNav.emit({
            collapsed: this.collapsed,
            screenWidth: this.screenWidth,
        });
    }

    closeSidenav(): void {
        this.collapsed = false;
        this.onToggleSideNav.emit({
            collapsed: this.collapsed,
            screenWidth: this.screenWidth,
        });
    }

    checkScreenWidth() {
        if (this.screenWidth <= 768) {
            this.collapsed = false;
            this.emitToggleSideNav();
        }
    }

    emitToggleSideNav() {
        this.onToggleSideNav.emit({
            collapsed: this.collapsed,
            screenWidth: this.screenWidth,
        });
    }

    updateStyleProperty() {
        this.cdr.detectChanges();
    }

    onClosed() {
        this.onToggle.emit(false);
    }

    updateExpand() {
        if (this.router.url.startsWith("/admin/info")) {
            this.openedPanel = "infomations";
        } else if (this.router.url.startsWith("/admin/products")) {
            this.openedPanel = "products";
        } else if (this.router.url.startsWith("/admin/systems")) {
            this.openedPanel = "systems";
        }
    }

    onFavorite(item: any) {
        item.favorite = !item.favorite;
    }

    getHome(): NavigationItem {
        return {
            type: "link",
            label: "Home",
            code: "home",
            icon: "fas fa-home",
            route: "/admin/home",
        };
    }

    getProductsManagement(): NavigationItem {
        return {
            type: "link",
            label: "Products Management",
            code: "productsManagement",
            icon: "fas fa-birthday-cake",
            route: "/admin/product-management",
        };
    }

    getOrdersManagement(): NavigationItem {
        return {
            type: "link",
            label: "Orders Management",
            code: "ordersManagement",
            icon: "fas fa-shopping-cart",
            route: "/admin/order-management",
        };
    }

    getIngredientsManagement(): NavigationItem {
        return {
            type: "group",
            label: "Ingredients Management",
            code: "ingredientsManagement",
            icon: "fas fa-cookie-bite",
            children: [
                {
                    type: "link",
                    label: "awdasda",
                    code: "dasdassdaw",
                    route: "/admin/products/cakes",
                },
            ],
        };
    }

    getCustomersManagement(): NavigationItem {
        return {
            type: "link",
            label: "Customers Management",
            code: "customersManagement",
            icon: "fas fa-users",
            route: "/admin/customer-management",
        };
    }
}
