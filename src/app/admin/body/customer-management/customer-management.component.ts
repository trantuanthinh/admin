import { Component, ViewChild } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Observable, take } from "rxjs";
import { ConfirmDialogComponent } from "../../../control/confirm-dialog/confirm-dialog.component";
import { ShareService } from "../../../shared/share.service";
import { SharePropertyService } from "./../../../shared/share-property.service";
import { CustomerManagementInfoComponent } from "./customer-management-info/customer-management-info.component";
import { MatToolbar } from "@angular/material/toolbar";
import { Overlay, OverlayModule } from "@angular/cdk/overlay";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ThemePalette } from "@angular/material/core";
import { CustomerManagementDetailComponent } from "./customer-management-detail/customer-management-detail.component";

export interface UserData {
    id: string;
    name: string;
    phone: string;
    email: number;
    gender: string;
    birthday: string;
    action: string;
}

@Component({
    selector: "app-customer-management",
    standalone: true,
    imports: [
        MatPaginatorModule,
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        ReactiveFormsModule,
        MatIconButton,
        MatIcon,
        MatToolbar,
        OverlayModule,
        // BrowserModule,
        // BrowserAnimationsModule,
        // MatSlideToggleModule,
    ],
    templateUrl: "./customer-management.component.html",
    styleUrl: "./customer-management.component.scss",
})
export class CustomerManagementComponent {
    offset = 7;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    isOverlayOpen = false;
    // color: ThemePalette = "accent";
    // disabled = false;
    displayedColumns: string[] = [
        "id",
        "firstName",
        "lastName",
        "phone",
        "email",
        "gender",
        "birthday",
        // "status",
        "action",
    ];
    dataSource!: MatTableDataSource<any>;
    myform!: FormGroup<any>;

    constructor(
        public dialog: MatDialog,
        private shareService: ShareService,
        private sharePropertyService: SharePropertyService,
        private _snackBar: MatSnackBar
    ) {
        this.getData();
    }

    getData() {
        this.shareService
            .getCustomers()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    for (let item of dataItems) {
                        item._dob =
                            this.sharePropertyService.convertDateStringToMoment(
                                item.dateOfBirth,
                                this.offset
                            );
                        item.dob = this.sharePropertyService.formatDate(
                            item._dob
                        );
                    }
                    this.dataSource = new MatTableDataSource(dataItems);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    addCustomer() {
        let config: any = {};
        config.data = {
            target: "add",
        };
        this.openFormDialog(config);
    }

    deleteProduct(item: any) {
        let config: any = {
            data: {
                title: "Customer",
                submitBtn: "Yes",
                cancelBtn: "No",
                confirmMessage: "Do you want to delete?",
            },
        };
        this.showDialogConfirm(config)
            .pipe(take(1))
            .subscribe({
                next: (resConfirm: any) => {
                    if (resConfirm && resConfirm.action == "ok") {
                        this.shareService
                            .deleteCustomer(item.cus_id)
                            .pipe(take(1))
                            .subscribe(() => {
                                this.openSnackBar();
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

    openSnackBar() {
        const successMessage = "Deleted Successful";
        this._snackBar.open(successMessage, "Close", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
            panelClass: ["centered-snack-bar"],
        });
    }

    // changeStatus(item: any) {
    //     if (item.status === "active") {
    //         item.status = "inactive";
    //     } else {
    //         item.status = "active";
    //     }
    //     let dataJSON = {
    //         category_id: item.category_id,
    //         shape_id: item.shape_id,
    //         size_id: item.size_id,
    //         flavour_id: item.flavour_id,
    //         name: item.name,
    //         quantity: item.quantity,
    //         image: item.image,
    //         price: item.price,
    //         status: item.status,
    //     };
    //     this.shareService
    //         .updateProduct(dataJSON, item.prod_id)
    //         .pipe(take(1))
    //         .subscribe(() => {
    //             this.openSnackBar1("Updated Successfull");
    //         });
    // }

    // openSnackBar1(message: string) {
    //     const successMessage = message;
    //     this._snackBar.open(successMessage, "Close", {
    //         duration: 2000,
    //         verticalPosition: "bottom",
    //         horizontalPosition: "center",
    //         panelClass: ["centered-snack-bar"],
    //     });
    // }
    updateCustomer(item: any) {
        let config: any = {};
        config.data = {
            target: "edit",
            item: item,
        };
        config.component = CustomerManagementInfoComponent; // Specify the component for updating customer
        this.openFormDialog(config);
    }

    detailCustomer(item: any) {
        let config: any = {};
        config.data = {
            target: "detail",
            item: item,
        };
        config.component = CustomerManagementDetailComponent; // Specify the component for viewing details
        this.openFormDialog(config);
    }

    openFormDialog(config: any) {
        config.disableClose = true;
        config.panelClass = "dialog-form-l";
        config.maxWidth = "80vw";
        config.autoFocus = true;
        let dialogRef = this.dialog.open(config.component, config);
        // let dialogRef = this.dialog.open(
        //     CustomerManagementInfoComponent,
        //     config
        // );
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
