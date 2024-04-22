import { Component, ViewChild } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { UserData } from "../../admin/body/product-management/product-management.component";

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: "se-table",
    templateUrl: "./table.component.html",
    styleUrl: "./table.component.scss",
    standalone: true,
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatFormFieldModule,
    ],
})
export class TableComponent {
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
    dataSource!: MatTableDataSource<UserData>;

    generateData() {
        const products: UserData[] = [
            {
                id: "1",
                name: "John Doe",
                photo: "a",
                cost: 1111,
                quantity: "a",
                status: "a",
                action: "a",
            },
            {
                id: "1",
                name: "John Doe",
                photo: "a",
                cost: 1111,
                quantity: "a",
                status: "a",
                action: "a",
            },
            {
                id: "1",
                name: "John Doe",
                photo: "a",
                cost: 1111,
                quantity: "a",
                status: "a",
                action: "a",
            },
            {
                id: "1",
                name: "John Doe",
                photo: "a",
                cost: 1111,
                quantity: "a",
                status: "a",
                action: "a",
            },
            {
                id: "1",
                name: "John Doe",
                photo: "a",
                cost: 1111,
                quantity: "a",
                status: "a",
                action: "a",
            },
            {
                id: "1",
                name: "John Doe",
                photo: "a",
                cost: 1111,
                quantity: "a",
                status: "a",
                action: "a",
            },
            {
                id: "1",
                name: "John Doe",
                photo: "a",
                cost: 1111,
                quantity: "a",
                status: "a",
                action: "a",
            },
            {
                id: "1",
                name: "John Doe",
                photo: "a",
                cost: 1111,
                quantity: "a",
                status: "a",
                action: "a",
            },
            {
                id: "1",
                name: "John Doe",
                photo: "a",
                cost: 1111,
                quantity: "a",
                status: "a",
                action: "a",
            },
            {
                id: "123123",
                name: "John Doe",
                photo: "a",
                cost: 1111,
                quantity: "a",
                status: "a",
                action: "a",
            },
        ];
        this.dataSource = new MatTableDataSource(products);
    }

    constructor() {
        this.generateData();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
