import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TableComponent } from "./control/table/table.component";
import { TestComponent } from "./test/test.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, TableComponent, TestComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {
	title = "Admin";
}
