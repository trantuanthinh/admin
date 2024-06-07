import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BodyComponent } from "./body.component";
import { HomeComponent } from "./home/home.component";
import { ProductManagementComponent } from "./product-management/product-management.component";
import { OrderManagementComponent } from "./order-management/order-management.component";
import { IngredientManagementComponent } from "./ingredient-management/ingredient-management.component";
import { CustomerManagementComponent } from "./customer-management/customer-management.component";

//check-----------------------------------------------------------
import { GetDataComponent } from "./get-data/get-data.component";
import { DetailedReportComponent } from "./home/detailed-report/detailed-report.component";
import { DesignedProductManagementComponent } from "./designed-product-management/designed-product-management.component";
import { OverAllComponent } from "./home/over-all/over-all.component";

const routes: Routes = [
    {
        path: "",
        component: BodyComponent,
        children: [
            {
                path: "home",
                loadChildren: () =>
                    import("./home/home-routing.module").then(
                        (m) => m.HomeRoutingModule
                    ),
            },
            {
                path: "designed-product-management",
                component: DesignedProductManagementComponent,
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
            //check------------------------
            {
                path: "get-data",
                component: GetDataComponent,
            },

            { path: "**", redirectTo: "home", pathMatch: "full" },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BodyRoutingModule {}
