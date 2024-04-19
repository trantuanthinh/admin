import { Component, Input } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { AdminNavbarComponent } from "./admin-navbar/admin-navbar.component";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
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

    @Input() labelName: string | undefined;

    isSideNavCollapsed = false;
    screenWidth = 0;

    onToggleSideNav(data: SideNavToggle): void {
        this.screenWidth = data.screenWidth;
        this.isSideNavCollapsed = data.collapsed;
    }
}
