import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdComponent } from "./ad/ad.component";
import { CustomerComponent } from "./customer/customer.component";
import { InfoComponent } from "./info.component";

const routes: Routes = [
	{
		path: "",
		component: InfoComponent,
		children: [
			{
				path: "ad",
				component: AdComponent,
			},
			{
				path: "customers",
				component: CustomerComponent,
			},
			{ path: "", redirectTo: "ad", pathMatch: "full" },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class InfoRoutingModule {}
