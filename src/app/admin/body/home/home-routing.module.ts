import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { DetailedReportComponent } from "./detailed-report/detailed-report.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "detailed-report", component: DetailedReportComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
