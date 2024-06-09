import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { Component, Inject, Optional } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs";
import { SharePropertyService } from "../../../../shared/share-property.service";
import { ShareService } from "../../../../shared/share.service";

@Component({
    selector: "app-designed-product-management-detail",
    standalone: true,
    imports: [CommonModule, MatSelectModule, MatButtonModule, MatCardModule, ScrollingModule, MatIconModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: "./designed-product-management-detail.component.html",
    styleUrl: "./designed-product-management-detail.component.scss",
})
export class DesignedProductManagementDetailComponent {
    offset = 7;
    target: string = "Add";
    designedProduct: any = {};
    customer: any = {};
    designedProductsList: any[] = ["flavour", "name", "originPrice", "price", "quantity", "shape", "type"];

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<DesignedProductManagementDetailComponent>,
        private shareService: ShareService,
        private sharePropertyService: SharePropertyService,
        private _snackBar: MatSnackBar
    ) {
        this.getData();
    }

    close() {
        this.dialogRef.close();
    }

    getData() {
        this.designedProduct = this.dialogData.item;
        let id = this.designedProduct.cus_id;
        this.shareService
            .getCustomer(id)
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any = {};
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    this.customer = dataItems;
                },
                error: (error) => console.log("Error: " + error),
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
