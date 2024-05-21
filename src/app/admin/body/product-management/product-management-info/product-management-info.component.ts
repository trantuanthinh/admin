import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule, TitleCasePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit, Optional, TrackByFunction } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBar } from "@angular/material/snack-bar";
import { take } from "rxjs";
import { CustomValidator } from "../../../../shared/CustomValidator";
import { ShareService } from "../../../../shared/share.service";

@Component({
    selector: "app-product-management-info",
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
    ],
    templateUrl: "./product-management-info.component.html",
    styleUrl: "./product-management-info.component.scss",
    providers: [TitleCasePipe],
})
export class ProductManagementInfoComponent implements OnInit {
    public target: string = "";

    categoryList: any[] = [];
    sizeList: any[] = [];
    shapeList: any[] = [];
    flavourList: any[] = [];

    myform: FormGroup;

    trackByFn!: TrackByFunction<number>;

    message!: any;
    preview!: any;
    currentFile!: any;
    fileName!: any;

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<ProductManagementInfoComponent>,
        private shareService: ShareService,
        private fb: FormBuilder,
        private http: HttpClient,
        private _snackBar: MatSnackBar
    ) {
        this.target = this.dialogData.target;
        console.log(dialogData);
        this.getCategories();
        this.getFlavours();
        this.getShapes();
        this.getSizes();

        this.myform = this.buildFormGroup();
    }

    buildFormGroup() {
        return this.fb.group({
            name: [this.dialogData.item ? this.dialogData.item.name : "", [Validators.required]],
            category: [this.dialogData.item ? this.dialogData.item.category_id : "", [Validators.required]],
            shape: [this.dialogData.item ? this.dialogData.item.shape_id : "", [Validators.required]],
            size: [this.dialogData.item ? this.dialogData.item.size_id : "", [Validators.required]],
            flavour: [this.dialogData.item ? this.dialogData.item.flavour_id : "", [Validators.required]],
            quantity: [this.dialogData.item ? this.dialogData.item.quantity : "", [Validators.required]],
            price: [
                this.dialogData.item ? this.dialogData.item.price : "",
                [Validators.required, CustomValidator.numeric],
            ],
            // photo: [
            //     this.dialogData ? this.dialogData.item.image : "",
            //     [Validators.required],
            // ],
        });
    }

    ngOnInit(): void {}

    onFileSelected(event: any) {
        this.message = "";
        this.preview = "";
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const file: File | null = selectedFiles[0];
            if (file) {
                this.preview = "";
                this.currentFile = file;
                this.fileName = this.currentFile.name;
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.preview = e.target.result;
                };
                reader.readAsDataURL(this.currentFile);
            }
        }
    }

    upload() {
        this.shareService
            .uploadProdPhoto(this.currentFile)
            .pipe(take(1))
            .subscribe(() => {});
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

    submitProduct() {
        if (!this.currentFile) {
            console.log("No file selected!");
        } else {
            this.upload();
        }

        let valueForm: any;
        if (this.myform) {
            valueForm = this.myform.value;
        }
        let dataJSON = {
            category_id: valueForm.category,
            shape_id: valueForm.shape,
            size_id: valueForm.size,
            flavour_id: valueForm.flavour,
            name: valueForm.name,
            quantity: valueForm.quantity,
            image: this.dialogData ? this.dialogData.item.image : this.fileName,
            price: valueForm.price,
            status: "active",
        };
        if (!this.dialogData.item) {
            this.shareService
                .createProduct(dataJSON)
                .pipe(take(1))
                .subscribe(() => {
                    this.openSnackBar("Created Successful");
                    this.dialogRef.close("OK");
                });
        } else {
            this.shareService
                .updateProduct(dataJSON, this.dialogData.item.prod_id)
                .pipe(take(1))
                .subscribe(() => {
                    this.openSnackBar("Updated Successful");
                    this.dialogRef.close("OK");
                });
        }
    }

    getCategories() {
        this.shareService
            .getCategories()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    this.categoryList = dataItems;
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    getShapes() {
        this.shareService
            .getShapes()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    this.shapeList = dataItems;
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    getSizes() {
        this.shareService
            .getSizes()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    this.sizeList = dataItems;
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    getFlavours() {
        this.shareService
            .getFlavours()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    let dataItems: any[] = [];
                    if (res && res.data) {
                        dataItems = res.data;
                    }
                    this.flavourList = dataItems;
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    closepopup() {
        this.dialogRef.close("Closed using function");
    }
}
