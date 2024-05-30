import { CommonModule, TitleCasePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Observable, take } from "rxjs";
import { ConfirmDialogComponent } from "../../../control/confirm-dialog/confirm-dialog.component";
import { ShareService } from "../../../shared/share.service";
import { ProductManagementInfoComponent } from "./product-management-info/product-management-info.component";
import { MatToolbar } from "@angular/material/toolbar";
import { Overlay, OverlayModule } from "@angular/cdk/overlay";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
@Component({
    selector: "app-product-management",
    standalone: true,
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatInputModule,
        MatSortModule,
        ReactiveFormsModule,
        MatIcon,
        MatToolbar,
        MatIconButton,
        OverlayModule,
    ],
    providers: [TitleCasePipe],
    templateUrl: "./product-management.component.html",
    styleUrls: ["./product-management.component.scss"],
})
export class ProductManagementComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    totalBills = 0;
    color: ThemePalette = "accent";
    checked = true;
    disabled = false;
    isOverlayOpen = false;
    displayedColumns: string[] = [
        "id",
        "name",
        "photo",
        "cost",
        "originalCost",
        "quantity",
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
        this.calculateTotalBill();
    }

    ngOnInit(): void {}

    getData() {
        this.shareService
            .getProducts()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                        console.log(res);
                    }
                    for (let item of dataItems) {
                        item.src = this.shareService.getProdPhotoURL(
                            item.image
                        );
                    }
                    this.dataSource = new MatTableDataSource(dataItems);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.calculateTotalBill();
                },
                error: (error) => console.log("Error: " + error),
            });
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

    ngAfterViewInit() {
        if (this.dataSource) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            // this.calculateTotalBill();
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    addProduct() {
        let config: any = {};
        config.data = {
            target: "add",
        };
        this.openFormDialog(config);
    }

    updateProduct(item: any) {
        let config: any = {};
        config.data = {
            target: "edit",
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
            ProductManagementInfoComponent,
            config
        );
        dialogRef.afterClosed().subscribe((result) => {
            this.getData();
            console.log("The dialog was closed");
        });
    }

    deleteProduct(item: any) {
        let config: any = {
            data: {
                title: "Product",
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
                            .deleteProduct(item.prod_id)
                            .pipe(take(1))
                            .subscribe(() => {
                                this.openSnackBar("Deleted Successfully");
                                this.getData();
                            });
                    }
                },
            });
    }

    showDialogConfirm(config: any) {
        return new Observable((obs) => {
            config.disableClose = true;
            config.panelClass = "dialog-form-sm";
            config.maxWidth = "80vw";
            config.autoFocus = false;
            let dialogRef = this.dialog.open(ConfirmDialogComponent, config);
            dialogRef.afterClosed().subscribe({
                next: (res: any) => {
                    obs.next(res);
                    obs.complete();
                },
            });
        });
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
            originPrice: item.originPrice,
            status: item.status,
        };
        this.shareService
            .updateProduct(dataJSON, item.prod_id)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.openSnackBar("Updated Successfully");
                },
                error: (error) => {
                    console.error("Error updating product:", error);
                    this.openSnackBar("Error updating product");
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
}
