import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule, IMAGE_CONFIG, TitleCasePipe } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatIconButton } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatToolbar } from "@angular/material/toolbar";
import { Observable, take } from "rxjs";
import { ConfirmDialogComponent } from "../../../control/confirm-dialog/confirm-dialog.component";
import { ShareService } from "../../../shared/share.service";
import { DesignedProductManagementDetailComponent } from "./designed-product-management-detail/designed-product-management-detail.component";

@Component({
    selector: "app-designed-product-management",
    standalone: true,
    imports: [
        CommonModule,
        MatPaginatorModule,
        MatCardModule,
        MatTableModule,
        MatSlideToggleModule,
        MatInputModule,
        MatSortModule,
        MatIcon,
        MatToolbar,
        MatIconButton,
        OverlayModule,
    ],
    providers: [
        TitleCasePipe,
        {
            provide: IMAGE_CONFIG,
            useValue: {
                disableImageSizeWarning: true,
                disableImageLazyLoadWarning: true,
            },
        },
    ],
    templateUrl: "./designed-product-management.component.html",
    styleUrl: "./designed-product-management.component.scss",
})
export class DesignedProductManagementComponent {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    totalBills = 0;
    color: ThemePalette = "accent";
    checked = true;
    disabled = false;
    isOverlayOpen = false;
    displayedColumns: string[] = ["id", "name", "cost", "date", "status", "action"];
    dataSource!: MatTableDataSource<any>;
    myform!: FormGroup<any>;

    constructor(public dialog: MatDialog, private shareService: ShareService, private _snackBar: MatSnackBar) {
        this.getData();
    }

    ngOnInit(): void {}

    getData() {
        this.shareService
            .getDesignedProducts()
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

    detailDesignedProduct(item: any) {
        let config: any = {};
        config.data = {
            target: "detail",
            item: item,
        };
        this.openFormDialogDetail(config);
    }

    openFormDialogDetail(config: any) {
        config.disableClose = true;
        config.panelClass = "dialog-form-l";
        config.maxWidth = "80vw";
        config.autoFocus = true;
        let dialogRef = this.dialog.open(DesignedProductManagementDetailComponent, config);
        dialogRef.afterClosed().subscribe((result) => {
            this.getData();
            console.log("The dialog was closed");
        });
    }

    deleteDesignedProduct(item: any) {
        let config: any = {
            data: {
                title: "Designed Cake ",
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
                            .deleteDesignedProduct(item.des_prod_id)
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
            status: item.status,
        };
        this.shareService
            .updateDesignedProduct(dataJSON, item.des_prod_id)
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
