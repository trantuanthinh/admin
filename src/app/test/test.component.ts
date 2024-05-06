import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, inject } from "@angular/core";
import { ShareService } from "../shared/share.service";

@Component({
    selector: "app-test",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./test.component.html",
    styleUrl: "./test.component.scss",
})
export class TestComponent implements OnInit {
    http = inject(HttpClient);
    data: any = [];
    src: string = "";

    constructor(private shareService: ShareService) {}

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories() {
        this.src = this.shareService.getProdPhoto("logo.jpg");
        console.log(this.src);
    }

    click() {
        this.getCategories();
    }
}
