import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./settings/settings.component";
import { SystemsComponent } from "./systems.component";
import { ThemeComponent } from "./theme/theme.component";

const routes: Routes = [
	{
		path: "",
		component: SystemsComponent,
		children: [
			{
				path: "settings",
				component: SettingsComponent,
			},
			{
				path: "theme",
				component: ThemeComponent,
			},
			// { path: "", redirectTo: "settings", pathMatch: "full" },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SystemsRoutingModule {}
