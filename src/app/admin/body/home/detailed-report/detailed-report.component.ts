import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";

interface UserData {
    id: string;
    name: string;
    photo: string;
    cost: number;
    quantity: string;
    status: string;
    action: string;
}

@Component({
    selector: "app-detailed-report",
    standalone: true,
    imports: [MatTabsModule],
    templateUrl: "./detailed-report.component.html",
    styleUrls: ["./detailed-report.component.scss"],
})
export class DetailedReportComponent {}
