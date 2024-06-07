import { Component, OnInit, ViewChild } from "@angular/core";
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
    imports: [],
    templateUrl: "./detailed-report.component.html",
    styleUrls: ["./detailed-report.component.scss"],
})
export class DetailedReportComponent {}
