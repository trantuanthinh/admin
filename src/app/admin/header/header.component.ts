import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { LocalStorageService } from "ngx-localstorage";
import { SharePropertyService } from "../../shared/share-property.service";
import { ShareService } from "../../shared/share.service";

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
    domain = new FormControl(this.localStorage.get("domain"));

    constructor(
        private fb: FormBuilder,
        private shareService: ShareService,
        private sharePropertyService: SharePropertyService,
        private localStorage: LocalStorageService
    ) {}

    getHeadClass(): string {
        let styleClass = "";
        if (this.collapsed && this.screenWidth > 768) {
            styleClass = "head-trimmed";
        } else {
            styleClass = "head-md-screen";
        }
        return styleClass;
    }

    updateDomain() {
        this.shareService.setAPIDomain(this.domain.value);
        // window.location.reload();
    }
}
