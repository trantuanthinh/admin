/** @format */

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppRoutingPreloadingStrategy } from "./app-routing.preloading";

export const routes: Routes = [
	{
		path: "admin",
		loadChildren: () => import("./admin/admin-routing.module").then((m) => m.AdminRoutingModule),
	},
	{ path: "**", redirectTo: "admin", pathMatch: "full" },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: AppRoutingPreloadingStrategy,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
