import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { DetailedReportComponent } from "./detailed-report/detailed-report.component";
import { OverAllComponent } from "./over-all/over-all.component";

const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            {
                path: "detailed-report",
                component: DetailedReportComponent,
            },
            {
                path: "overall",
                component: OverAllComponent,
            },
            { path: "**", redirectTo: "overall", pathMatch: "full" },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
