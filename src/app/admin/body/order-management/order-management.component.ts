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
import { TableComponent } from "../../../control/table/table.component";
import { ShareService } from "../../../shared/share.service";
// import { ProductManagementInfoComponent } from "./product-management-info/product-management-info.component";
export interface UserData {
    id: string;
    name: string;
    nameCake: string;
    phone: number;
    orderDate: string;
    status: string;
    action: string;
}

@Component({
    selector: "app-order-management",
    standalone: true,
    imports: [
        MatPaginatorModule,
        MatCardModule,
        MatTableModule,
        TableComponent,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        ReactiveFormsModule,
    ],
    templateUrl: "./order-management.component.html",
    styleUrl: "./order-management.component.scss",
})
export class OrderManagementComponent implements OnInit {
    ngOnInit(): void {}
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = [
        "id",
        "name",
        "nameCake",
        "phone",
        "orderDate",
        "status",
        "action",
    ];
    dataSource!: MatTableDataSource<any>;
    myform!: FormGroup<any>;

    constructor(public dialog: MatDialog, private shareService: ShareService) {
        this.getData();
    }

    getData() {
        this.shareService
            .getOrders()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    this.dataSource = new MatTableDataSource(res.data);
                    // this.dataSource = res.data;
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
        const dialogRef = this.dialog.open(OrderManagementComponent, {
            data: item,
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
            // this.animal = result;
        });
    }
}
