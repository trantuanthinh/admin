import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { take } from "rxjs";
import { ShareService } from "../../../shared/share.service";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
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
    selector: "app-home",
    standalone: true,
    imports: [
        MatPaginatorModule,
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        ReactiveFormsModule,
        CommonModule,
        // BrowserModule,
        // FormsModule,
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
    ngOnInit(): void {}
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    totalBills = 0;
    totalCost = 0;
    totalProfit = 0;
    currentDate: string = "";
    displayedColumns: string[] = [
        "id",
        "name",
        "photo",
        "cost",
        "quantity",
        "status",
        "action",
    ];
    dataSource!: MatTableDataSource<any>;
    myform!: FormGroup<any>;

    constructor(public dialog: MatDialog, private shareService: ShareService) {
        this.getData();
        this.calculateTotalBill();
        this.setCurrentDate();
        this.calculateTotalCost();
    }
    getData() {
        //     {
        //         id: "123123",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        // ];
        // this.dataSource = new MatTableDataSource(products);
        this.shareService
            .getProducts()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    this.dataSource = new MatTableDataSource(res.data);
                    // this.dataSource = res.data;
                },
                error: (error) => console.log("Error: " + error),
            });
    }
    setCurrentDate() {
        const today = new Date();

        // Format the date to YYYY-MM-DD (required format for input type="date")
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
        const yyyy = today.getFullYear();

        this.currentDate = dd + "-" + mm + "-" + yyyy;
    }

    calculateTotalBill() {
        this.shareService
            .getProducts()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    console.log(dataItems);
                    for (let item of dataItems) {
                        this.totalBills = dataItems.reduce(
                            (acc: number, item: any) =>
                                acc + (parseFloat(item.price) || 0),
                            0
                        );
                    }
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    calculateTotalCost() {
        this.shareService
            .getProducts()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    console.log(dataItems);
                    for (let item of dataItems) {
                        this.totalCost = dataItems.reduce(
                            (acc: number, item: any) =>
                                acc + (parseFloat(item.price) || 0),
                            0
                        );
                        this.totalProfit = this.totalBills - this.totalCost;
                    }
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    ngAfterViewInit() {
        if (this.dataSource) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    editCustomer(item: any) {
        const dialogRef = this.dialog.open(HomeComponent, {
            data: item,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
            // this.animal = result;
        });
    }
}
