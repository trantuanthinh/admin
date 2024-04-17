import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { HomeComponent } from "./home/home.component";
import { ProductManagementComponent } from "./product-management/product-management.component";
import { OrderManagementComponent } from "./order-management/order-management.component";
import { IngredientManagementComponent } from "./ingredient-management/ingredient-management.component";
import { CustomerManagementComponent } from "./customer-management/customer-management.component";

const routes: Routes = [
	{
		path: "",
		component: AdminComponent,
		children: [
			{
				path: "home", 
				component: HomeComponent,
			},
			{
				path: "product-management", 
				component: ProductManagementComponent,
			},
			{
				path: "order-management", 
				component: OrderManagementComponent,
			},
			{
				path: "ingredient-management", 
				component: IngredientManagementComponent,
			},
			{
				path: "customer-management", 
				component: CustomerManagementComponent,
			},
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
			// { path: "", redirectTo: "info", pathMatch: "full" },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
