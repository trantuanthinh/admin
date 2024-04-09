import { Component } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { AdminNavbarComponent } from "./admin-navbar/admin-navbar.component";

@Component({
	selector: "app-admin",
	standalone: true,
	imports: [RouterModule, AdminNavbarComponent, MatSidenavModule, MatButtonModule, FlexLayoutModule],
	templateUrl: "./admin.component.html",
	styleUrl: "./admin.component.scss",
})
export class AdminComponent {
	showFiller = false;
}
