import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Inject, Optional, TrackByFunction } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs";
import { CustomValidator } from "../../../../shared/CustomValidator";
import { SharePropertyService } from "../../../../shared/share-property.service";
import { ShareService } from "../../../../shared/share.service";

@Component({
    selector: "app-customer-management-detail",
    standalone: true,
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        ScrollingModule,
        MatIconModule,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: "./orders-management-detail.component.html",
    styleUrl: "./orders-management-detail.component.scss",
})
export class OrderManagementDetailComponent {
    offset = 7;
    target: string = "Add";
    myform!: FormGroup;
    trackByFn!: TrackByFunction<number>;
    element: any = {};
    element2: any = {};
    productsList: any[] = ["flavour", "name", "originPrice", "price", "quantity", "shape", "type"];

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<OrderManagementDetailComponent>,
        private shareService: ShareService,
        private sharePropertyService: SharePropertyService,
        private fb: FormBuilder,
        private http: HttpClient,
        private _snackBar: MatSnackBar
    ) {
        this.getCus();
        this.getData();
        this.myform = this.buildFormGroup();
    }

    close() {
        this.dialogRef.close();
    }

    buildFormGroup() {
        return this.fb.group({
            id: [this.dialogData.item ? this.dialogData.item.cus_id : "", [Validators.required]],
            firstName: [this.dialogData.item ? this.dialogData.item.first_name : "", [Validators.required]],
            lastName: [this.dialogData.item ? this.dialogData.item.last_name : "", [Validators.required]],
            phone: [
                this.dialogData.item ? this.dialogData.item.phone : "",
                [Validators.required, CustomValidator.numeric],
            ],
            created_at: [this.dialogData.item ? this.dialogData.item.created_at : "", [Validators.required]],
            deliveryStatus: [
                this.dialogData.item ? this.dialogData.item.delivery_status : "",
                [Validators.required],
            ],
            quantity: [this.dialogData.item ? this.dialogData.item.total_unit : "", [Validators.required]],
            bill: [this.dialogData.item ? this.dialogData.item.total_price : "", [Validators.required]],
            status: [this.dialogData.item ? this.dialogData.item.active_status : "", [Validators.required]],
        });
    }

    getData() {
        let formGroup = this.buildFormGroup();
        let id = formGroup.get("id")?.value;
        this.shareService
            .getOrder(id)
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any = {};
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    this.element = dataItems;
                    this.productsList = dataItems.products;
                    console.log(this.productsList);
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    getCus() {
        let formGroup = this.buildFormGroup();
        let id = formGroup.get("id")?.value;
        this.shareService
            .getCustomer(id)
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any = {};
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    this.element2 = dataItems;
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
