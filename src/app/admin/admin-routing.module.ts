import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
    {
        path: "",
        component: AdminComponent,
        children: [
            {
                path: "",
                loadChildren: () =>
                    import("./body/body-routing.module").then(
                        (m) => m.BodyRoutingModule
                    ),
            },

            { path: "**", redirectTo: "", pathMatch: "full" },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
