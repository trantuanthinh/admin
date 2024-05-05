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
import { ProductManagementInfoComponent } from "./product-management-info/product-management-info.component";

export interface UserData {
    id: string;
    name: string;
    photo: string;
    cost: number;
    quantity: string;
    status: string;
    action: string;
}

@Component({
    selector: "app-product-management",
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
    templateUrl: "./product-management.component.html",
    styleUrls: ["./product-management.component.scss"],
})
export class ProductManagementComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = [
        "id",
        "name",
        "photo",
        "cost",
        "quantity",
        "status",
        "action",
    ];
    dataSource!: MatTableDataSource<any>;
    myform!: FormGroup<any>;

    constructor(public dialog: MatDialog, private shareService: ShareService) {
        this.getData();
    }

    ngOnInit(): void {
        // this.getData();
    }

    getData() {
        // const products: UserData[] = [
        //     {
        //         id: "1",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        //     {
        //         id: "1",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        //     {
        //         id: "1",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        //     {
        //         id: "1",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        //     {
        //         id: "1",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        //     {
        //         id: "1",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        //     {
        //         id: "1",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        //     {
        //         id: "1",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        //     {
        //         id: "1",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        //     {
        //         id: "123123",
        //         name: "John Doe",
        //         photo: "a",
        //         cost: 1111,
        //         quantity: "a",
        //         status: "a",
        //         action: "a",
        //     },
        // ];
        // this.dataSource = new MatTableDataSource(products);
        this.shareService
            .getProducts()
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
    addCustomer() {
        const dialogRef = this.dialog.open(ProductManagementInfoComponent, {
            data: null,
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
        });
    }

    editCustomer(item: any) {
        const dialogRef = this.dialog.open(ProductManagementInfoComponent, {
            data: item,
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed");
        });
    }
}
