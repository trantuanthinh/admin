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
    ],
    templateUrl: "./customer-management.component.html",
    styleUrl: "./customer-management.component.scss",
})
export class CustomerManagementComponent {
    offset = 7;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ["id", "firstName", "lastName", "phone", "email", "gender", "birthday", "action"];
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
                        item._dob = this.sharePropertyService.convertDateStringToMoment(
                            item.dateOfBirth,
                            this.offset
                        );
                        item.dob = this.sharePropertyService.formatDate(item._dob);
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
    updateCustomer(item: any) {
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
        let dialogRef = this.dialog.open(CustomerManagementInfoComponent, config);
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
    }
}
