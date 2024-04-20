import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    @Input() collapsed = false;
    @Input() screenWidth = 0;
    @Input() labelName = "";

    getHeadClass(): string {
        let styleClass = "";
        if (this.collapsed && this.screenWidth > 768) {
            styleClass = "head-trimmed";
        } else {
            styleClass = "head-md-screen";
        }
        return styleClass;
    }
}
