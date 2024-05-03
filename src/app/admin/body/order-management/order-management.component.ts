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
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { OrdersManagementInforComponent } from "./orders-management-infor/orders-management-infor.component";
import { ThemePalette } from "@angular/material/core";
// import { ProductManagementInfoComponent } from "./product-management-info/product-management-info.component";
export interface UserData {
    id: string;
    name: string;
    nameCake: string;
    phone: number;
    orderDate: string;
    receiveDate: string;
    quantity: string;
    status: string;
    action: string;
}

@Component({
    selector: "app-order-management",
    standalone: true,
    imports: [
        MatTooltipModule,
        MatPaginatorModule,
        MatCardModule,
        MatTableModule,
        TableComponent,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
    ],
    templateUrl: "./order-management.component.html",
    styleUrl: "./order-management.component.scss",
})
export class OrderManagementComponent implements OnInit {
    color: ThemePalette = "accent";
    checked = false;
    disabled = false;
    ngOnInit(): void {}
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = [
        "id",
        "name",
        "nameCake",
        "phone",
        "orderDate",
        "receiveDate",
        "quantity",
        "status",
        "action",
    ];
    dataSource!: MatTableDataSource<any>;
    myform!: FormGroup<any>;

    constructor(public dialog: MatDialog, private shareService: ShareService) {
        this.getData();
    }

    getData() {
        const products: UserData[] = [
            {
                id: "1",
                name: "John Doe",
                nameCake: "b",
                phone: 1111,
                receiveDate: "1",
                orderDate: "",
                quantity: "a",
                status: "a",
                action: "a",
            },
        ];
        this.dataSource = new MatTableDataSource(products);
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
        // const dialogRef = this.dialog.open(OrdersManagementInforComponent, {
        //     data: item,
        // });
        // dialogRef.afterClosed().subscribe((result) => {
        //     console.log("The dialog was closed");
        // });
    }
}
