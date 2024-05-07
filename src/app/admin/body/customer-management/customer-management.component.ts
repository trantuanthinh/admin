import { Component, ViewChild } from "@angular/core";
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
import { SimpleBaseComponent } from "../../../shared/simple.base.component";
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
export class CustomerManagementComponent extends SimpleBaseComponent {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ["id", "firstName", "lastName", "phone", "email", "gender", "birthday", "action"];
    dataSource!: MatTableDataSource<any>;
    myform!: FormGroup<any>;

    constructor(
        public dialog: MatDialog,
        private shareService: ShareService,
        private sharePropertyService: SharePropertyService
    ) {
        super();
        this.getData();
    }

    getData() {
        // const products: UserData[] = [
        //     {
        //         id: "1",
        //         name: "John Doe",
        //         phone: "b",
        //         email: 1111,
        //         gender: "1",
        //         birthday: "3",
        //         action: "a",
        //     },
        // ];
        // this.dataSource = new MatTableDataSource(products);
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
