import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { take } from "rxjs";
import { ShareService } from "../../../shared/share.service";
import { OrdersManagementInforComponent } from "./orders-management-infor/orders-management-infor.component";
import { HomeComponent } from "../home/home.component";
import { MatToolbar } from "@angular/material/toolbar";
import { Overlay, OverlayModule } from "@angular/cdk/overlay";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { UserData } from "../customer-management/customer-management.component";
import { MatSnackBar } from "@angular/material/snack-bar";
// import { ProductManagementInfoComponent } from "./product-management-info/product-management-info.component";

@Component({
    selector: "app-order-management",
    standalone: true,
    imports: [
        MatTooltipModule,
        MatPaginatorModule,
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatIconButton,
        MatIcon,
        MatToolbar,
        OverlayModule,
    ],
    templateUrl: "./order-management.component.html",
    styleUrl: "./order-management.component.scss",
})
export class OrderManagementComponent implements OnInit {
    totalBills = 0;
    color: ThemePalette = "accent";
    checked = false;
    disabled = false;
    isOverlayOpen = false;
    ngOnInit(): void {}
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = [
        "id",
        "name",
        "nameCake",
        "phone",
        "orderDate",
        "deliveryStatus",
        "quantity",
        "bill",
        "status",
        "action",
    ];
    dataSource!: MatTableDataSource<any>;
    myform!: FormGroup<any>;

    constructor(
        public dialog: MatDialog,
        private shareService: ShareService,
        private _snackBar: MatSnackBar
    ) {
        this.getData();
    }

    getData() {
        this.shareService
            .getOrders()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    this.dataSource = new MatTableDataSource(dataItems);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    calculateTotalBill() {
        this.totalBills = this.dataSource.data.reduce(
            (acc, item) => acc + parseFloat(item.bill),
            0
        );
    }

    changeStatus(item: any) {
        if (item.status === "active") {
            item.status = "inactive";
        } else {
            item.status = "active";
        }
        let dataJSON = {
            category_id: item.category_id,
            shape_id: item.shape_id,
            size_id: item.size_id,
            flavour_id: item.flavour_id,
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            status: item.status,
        };
        this.shareService
            .updateProduct(dataJSON, item.prod_id)
            .pipe(take(1))
            .subscribe(() => {
                this.openSnackBar1("Updated Successfull");
            });
    }

    openSnackBar1(message: string) {
        const successMessage = message;
        this._snackBar.open(successMessage, "Close", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
            panelClass: ["centered-snack-bar"],
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
        if (filterValue.length >= 3) {
            const searchDigits = filterValue.slice(-3);

            this.dataSource.filterPredicate = (
                data: UserData,
                filter: string
            ) => {
                return data.phone.trim().endsWith(searchDigits);
            };
            this.dataSource.filter = searchDigits;

            if (this.dataSource.filteredData.length > 0) {
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator.firstPage();
            }
        }
    }

    editCustomer(item: any) {
        const dialogRef = this.dialog.open(OrdersManagementInforComponent, {
            data: item,
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
        });
    }
}
