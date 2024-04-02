/** @format */

import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
	selector: "app-products",
	standalone: true,
	imports: [RouterOutlet, RouterModule],
	templateUrl: "./products.component.html",
	styleUrl: "./products.component.scss",
})
export class ProductsComponent {}
