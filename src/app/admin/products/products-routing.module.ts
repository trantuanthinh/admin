import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CakesComponent } from "./cakes/cakes.component";
import { CookiesComponent } from "./cookies/cookies.component";
import { MacaronsComponent } from "./macarons/macarons.component";
import { ProductsComponent } from "./products.component";

const routes: Routes = [
	{
		path: "",
		component: ProductsComponent,
		children: [
			{
				path: "cakes",
				component: CakesComponent,
			},
			{
				path: "macarons",
				component: MacaronsComponent,
			},
			{
				path: "cookies",
				component: CookiesComponent,
			},
			// { path: "", redirectTo: "cakes", pathMatch: "full" },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProductsRoutingModule {}
