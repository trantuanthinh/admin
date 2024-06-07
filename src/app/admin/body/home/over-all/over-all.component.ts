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
import { ShareService } from "../../../../shared/share.service";
import { CommonModule } from "@angular/common";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatToolbar } from "@angular/material/toolbar";
import { Overlay, OverlayModule } from "@angular/cdk/overlay";
import {
    Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
} from "@angular/router";
import { NavigationItem } from "../../../admin-navbar/navbar-items.interface";
import { SharePropertyService } from "../../../../shared/share-property.service";
import { HomeComponent } from "../home.component";
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
    selector: "app-over-all",
    standalone: true,
    imports: [
        MatPaginatorModule,
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        RouterOutlet,
        MatSortModule,
        ReactiveFormsModule,
        CommonModule,
        MatIconButton,
        MatIcon,
        MatToolbar,
        OverlayModule,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: "./over-all.component.html",
    styleUrl: "./over-all.component.scss",
})
export class OverAllComponent {
    ngOnInit(): void {}
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    totalBills = 0;
    totalCost = 0;
    totalProfit = 0;
    orderCount = 0;
    currentDate: string = "";
    displayedColumns: string[] = ["id", "name", "photo", "quantity"];
    dataSource!: MatTableDataSource<UserData>;
    isOverlayOpen = false;
    myform!: FormGroup<any>;

    constructor(
        public dialog: MatDialog,
        private shareService: ShareService,
        private router: Router,
        private sharePropertyService: SharePropertyService
    ) {
        this.getData();
        this.calculateTotalBill();
        this.setCurrentDate();
        this.calculateTotalCost();
        this.countOrders();
    }

    navigateToDetailedReport() {
        this.router.navigate(["/admin/home/detailed-report"]);
    }

    getData() {
        this.shareService
            .getProducts()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    let filteredItems = dataItems.filter(
                        (item) => item.quantity <= 5
                    );
                    for (let item of dataItems) {
                        item.src = this.shareService.getProdPhotoURL(
                            item.image
                        );
                    }
                    this.dataSource = new MatTableDataSource(filteredItems);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    setCurrentDate() {
        this.currentDate = this.sharePropertyService.setCurrentDate();
    }

    countOrders() {
        this.shareService
            .getOrders()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    this.orderCount = res?.data?.length || 0;
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    calculateTotalBill() {
        this.shareService
            .getOrders()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    this.totalBills = dataItems.reduce(
                        (acc: number, item: any) =>
                            acc + (parseFloat(item.total_price) || 0),
                        0
                    );
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    calculateTotalCost() {
        this.shareService
            .getOrders()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    this.totalCost = dataItems.reduce(
                        (acc: number, item: any) =>
                            acc + (parseFloat(item.total_origin_price) || 0),
                        0
                    );
                    this.totalProfit = this.totalBills - this.totalCost;
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    calculateProfit() {
        this.totalProfit = this.totalBills - this.totalCost;
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
        const dialogRef = this.dialog.open(OverAllComponent, {
            data: item,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
            // this.animal = result;
        });
    }
}
