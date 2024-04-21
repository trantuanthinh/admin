import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { AdminNavbarComponent } from "./admin-navbar/admin-navbar.component";
import { BodyComponent } from "./body/body.component";
import { HeaderComponent } from "./header/header.component";

interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}

@Component({
    selector: "app-admin",
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        HeaderComponent,
        BodyComponent,
        AdminNavbarComponent,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        FlexLayoutModule,
    ],
    templateUrl: "./admin.component.html",
    styleUrl: "./admin.component.scss",
})
export class AdminComponent {
    title = "sidenav";

    currentTitle = "Home";

    isSideNavCollapsed = false;
    screenWidth = 0;

    update($event: string) {
        this.currentTitle = $event;
    }

    onToggleSideNav(data: SideNavToggle): void {
        this.screenWidth = data.screenWidth;
        this.isSideNavCollapsed = data.collapsed;
    }
}
