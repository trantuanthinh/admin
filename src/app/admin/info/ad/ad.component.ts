import { Component } from "@angular/core";
import { TableComponent } from "../../../control/table/table.component";

@Component({
	selector: "app-ad",
	standalone: true,
	imports: [TableComponent],
	templateUrl: "./ad.component.html",
	styleUrl: "./ad.component.scss",
})
export class AdComponent {}
