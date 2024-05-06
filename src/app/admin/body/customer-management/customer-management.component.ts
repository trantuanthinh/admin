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
export class CustomerManagementComponent implements OnInit {
    ngOnInit(): void {}
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = [
        "id",
        "firstName",
        "lastName",
        "phone",
        "email",
        "gender",
        "birthday",
        "action",
    ];
    dataSource!: MatTableDataSource<any>;
    myform!: FormGroup<any>;

    constructor(public dialog: MatDialog, private shareService: ShareService) {
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
                    this.dataSource = new MatTableDataSource(res.data);
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
        const dialogRef = this.dialog.open(CustomerManagementInfoComponent, {
            data: item,
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
        });
    }
}
