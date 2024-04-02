/** @format */

import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
	selector: "app-systems",
	standalone: true,
	imports: [RouterOutlet, RouterModule],
	templateUrl: "./systems.component.html",
	styleUrl: "./systems.component.scss",
})
export class SystemsComponent {}
