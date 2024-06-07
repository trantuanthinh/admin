import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterOutlet } from "@angular/router";
@Component({
    selector: "app-home",
    standalone: true,
    imports: [RouterOutlet, CommonModule],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent {
    @Input() collapsed = false;
    @Input() screenWidth = 0;

    getBodyClass(): string {
        let styleClass = "";
        if (this.collapsed && this.screenWidth > 768) {
            styleClass = "body-trimmed";
        } else if (
            this.collapsed &&
            this.screenWidth <= 768 &&
            this.screenWidth > 0
        ) {
            styleClass = "body-md-screen";
        }
        return styleClass;
    }
}
