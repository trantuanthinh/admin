import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AppComponent } from "../../app.component";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
})
export class HeaderComponent {
    @Input() collapsed = false;
    @Input() screenWidth = 0;
    @Input() labelName = "Home";

    url = new FormControl("");

    constructor(private fb: FormBuilder) {}

    getHeadClass(): string {
        let styleClass = "";
        if (this.collapsed && this.screenWidth > 768) {
            styleClass = "head-trimmed";
        } else {
            styleClass = "head-md-screen";
        }
        return styleClass;
    }

    updateURL() {
        console.log(this.url.value);
    }
}
