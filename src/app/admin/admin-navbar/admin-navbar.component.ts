import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from "@angular/core";
import { FlexLayoutServerModule } from "@angular/flex-layout/server";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterModule } from "@angular/router";
import { take } from "rxjs";
import { timer } from "rxjs/internal/observable/timer";
import { NavigationItem } from "./navbar-items.interface";

@Component({
	selector: "app-admin-navbar",
	standalone: true,
	imports: [CommonModule, FlexLayoutServerModule, RouterModule, MatSidenavModule, MatExpansionModule, MatIconModule, MatListModule, MatToolbarModule],
	templateUrl: "./admin-navbar.component.html",
	styleUrl: "./admin-navbar.component.scss",
})
export class AdminNavbarComponent {
	public versions: string = "1.0.0";
	public currentUser: any = {
		id: "",
		name: "Admin",
		// pictureUrl: './assets/images/C-Mate-logo-ver-2.png',
	};

	@Input() opened: boolean = true;
	@Output() onToggle: any = new EventEmitter();
	public openedPanel: string = "websiteNews";
	public arrApps: any[] = [];
	constructor(public router: Router, private cdr: ChangeDetectorRef) {
		timer(1000)
			.pipe(take(1))
			.subscribe({
				next: () => {
					this.arrApps.push(this.getManageInfo());
					this.arrApps.push(this.getManageProducts());
					this.arrApps.push(this.getManageSystem());
					this.updateExpand();
				},
			});
	}

	updateStyleProperty() {
		// Update your style property here
		// For example:
		// this.styleProperty = 'none';

		// After updating the property, trigger change detection
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

	log(url: any) {
		console.log("url...." + url);
	}

	getManageInfo(): NavigationItem {
		return {
			type: "group",
			label: "Infomations",
			code: "infomations",
			// icon: "ic_article_48dp",
			children: [
				{
					type: "link",
					label: "Admin",
					code: "admin",
					route: "/admin/info/ad",
					actions: "more-menu",
				},
				{
					type: "link",
					label: "Customer",
					code: "customers",
					route: "/admin/info/customers",
					actions: "more-menu",
				},
			],
		};
	}

	getManageProducts(): NavigationItem {
		return {
			type: "group",
			label: "Products",
			code: "products",
			// icon: "ic_article_48dp",
			children: [
				{
					type: "subheading",
					label: "Products Management",
				},
				{
					type: "link",
					label: "Cakes",
					code: "cakes",
					route: "/admin/products/cakes",
					actions: "more-menu",
				},
				{
					type: "link",
					label: "Macarons",
					code: "macarons",
					route: "/admin/products/macarons",
					actions: "more-menu",
				},
				{
					type: "link",
					label: "Cookies",
					code: "cookies",
					route: "/admin/products/cookies",
					actions: "more-menu",
				},
			],
		};
	}

	getManageSystem(): NavigationItem {
		return {
			type: "group",
			label: "Systems",
			code: "systems",
			// icon: "ic_article_48dp",
			children: [
				{
					type: "subheading",
					label: "Systems Management",
				},
				{
					type: "link",
					label: "Settings",
					code: "settings",
					route: "/admin/systems/settings",
					actions: "more-menu",
				},
				{
					type: "link",
					label: "Theme",
					code: "Theme",
					route: "/admin/systems/theme",
					actions: "more-menu",
				},
			],
		};
	}
}
