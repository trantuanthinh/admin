import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
	{
		path: "",
		component: AdminComponent,
		children: [
			{
				path: "info",
				loadChildren: () => import("./info/info-routing.module").then((m) => m.InfoRoutingModule),
			},
			{
				path: "products",
				loadChildren: () => import("./products/products-routing.module").then((m) => m.ProductsRoutingModule),
			},
			{
				path: "systems",
				loadChildren: () => import("./systems/systems-routing.module").then((m) => m.SystemsRoutingModule),
			},
			{ path: "", redirectTo: "info", pathMatch: "full" },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
