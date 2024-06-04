import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatToolbar } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { take } from "rxjs";
import { ShareService } from "../../../shared/share.service";
import { UserData } from "../customer-management/customer-management.component";
import { OrderManagementDetailComponent } from "./orders-management-detail/orders-management-detail.component";
import { ConfirmDialogComponent } from "../../../control/confirm-dialog/confirm-dialog.component";
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
        CommonModule,
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
        if (item.active_status === "active") {
            item.active_status = "inactive";
        } else {
            item.active_status = "active";
        }
        let dataJSON = {
            cus_id: item.cus_id,
            delivery_status: item.delivery_status,
            active_status: item.active_status,
            total_unit: item.total_unit,
            total_origin_price: item.total_origin_price,
            quanttotal_priceity: item.total_price,
        };
        this.shareService
            .updateOrder(dataJSON, item.order_id)
            .pipe(take(1))
            .subscribe(() => {
                this.openSnackBar("Updated Successfull");
            });
    }

    deleteOrder(item: any) {
        let config: any = {
            data: {
                title: "Order",
                submitBtn: "Yes",
                cancelBtn: "No",
                confirmMessage: "Do you want to delete?",
            },
        };
        const dialogRef = this.dialog.open(ConfirmDialogComponent, config);
        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe({
                next: (resConfirm: any) => {
                    if (resConfirm && resConfirm.action === "ok") {
                        this.shareService
                            .deleteOrder(item.prod_id)
                            .pipe(take(1))
                            .subscribe(() => {
                                this.openSnackBar("Deleted Successfully");
                                this.getData();
                            });
                    }
                },
            });
    }

    openSnackBar(message: string) {
        const successMessage = message;
        this._snackBar.open(successMessage, "Close", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
            panelClass: ["centered-snack-bar"],
        });
    }

    detailOrders(item: any) {
        let config: any = {};
        config.data = {
            target: "detail",
            item: item,
        };
        this.openFormDialog(config);
    }
    openFormDialog(config: any) {
        config.disableClose = true;
        config.panelClass = "dialog-form-l";
        config.maxWidth = "80vw";
        config.autoFocus = true;
        let dialogRef = this.dialog.open(
            OrderManagementDetailComponent,
            config
        );
        dialogRef.afterClosed().subscribe((result) => {
            this.getData();
            console.log("The dialog was closed");
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
}
