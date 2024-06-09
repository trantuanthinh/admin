import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Inject, Optional, TrackByFunction } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs";
import { CustomValidator } from "../../../../shared/CustomValidator";
import { SharePropertyService } from "../../../../shared/share-property.service";
import { ShareService } from "../../../../shared/share.service";

@Component({
    selector: "app-designed-product-management-detail",
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        FormsModule,
        ScrollingModule,
        MatDatepickerModule,
        MatIconModule,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: "./designed-product-management-detail.component.html",
    styleUrl: "./designed-product-management-detail.component.scss",
})
export class DesignedProductManagementDetailComponent {
    offset = 7;
    target: string = "Add";
    myform!: FormGroup;
    trackByFn!: TrackByFunction<number>;
    element: any = {};
    element2: any = {};
    productsList: any[] = [
        "flavour",
        "name",
        "originPrice",
        "price",
        "quantity",
        "shape",
        "type",
    ];

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<DesignedProductManagementDetailComponent>,
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
            id: [
                this.dialogData.item ? this.dialogData.item.des_prod_id : "",
                [Validators.required],
            ],
            name: [
                this.dialogData.item ? this.dialogData.item.name : "",
                [Validators.required],
            ],
            price: [
                this.dialogData.item ? this.dialogData.item.price : "",
                [Validators.required],
            ],
            category: [
                this.dialogData.item ? this.dialogData.item.category : "",
                [Validators.required, CustomValidator.numeric],
            ],
            size: [
                this.dialogData.item ? this.dialogData.item.size : "",
                [Validators.required],
            ],
            flavour: [
                this.dialogData.item ? this.dialogData.item.flavour : "",
                [Validators.required],
            ],
            shape: [
                this.dialogData.item ? this.dialogData.item.shape : "",
                [Validators.required],
            ],
            message: [
                this.dialogData.item ? this.dialogData.item.message : "",
                [Validators.required],
            ],
        });
    }

    getData() {
        let formGroup = this.buildFormGroup();
        let id = formGroup.get("id")?.value;
        this.shareService
            .getDesProductID(id)
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
