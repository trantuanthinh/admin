import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule, TitleCasePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit, TrackByFunction } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
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
    inputdata: any;
    editdata: any;
    closemessage = "closed using directive";
    categoryList: any = [];
    sizeList: any = [];
    shapeList: any = [];
    flavourList: any = [];

    myform!: FormGroup;
    name = new FormControl(this.data?.name || "", [Validators.required]);
    unitPrice = new FormControl("", [
        Validators.required,
        CustomValidator.numeric,
    ]);
    category = new FormControl("", [Validators.required]);
    shape = new FormControl("", [Validators.required]);
    size = new FormControl("", [Validators.required]);
    flavour = new FormControl("", [Validators.required]);
    quantity = new FormControl(this.data?.quantity || "", [
        Validators.required,
        CustomValidator.numeric,
    ]);

    photo = new FormControl("", [Validators.required]);
    trackByFn!: TrackByFunction<number>;

    message!: any;
    preview!: any;
    currentFile!: any;
    fileName!: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ProductManagementInfoComponent>,
        private shareService: ShareService,
        private fb: FormBuilder,
        private http: HttpClient
    ) {
        console.log(data);
        this.getCategories();
        this.getFlavours();
        this.getShapes();
        this.getSizes();
        this.myform = this.buildFormGroup();
        let defaultCategory: any = this.categoryList[0];
        console.log(defaultCategory);
        let selectedCategories: any;

        // = this.categoryList.filter(
        //     (item: any) => item.category_id == this.data.category_id
        // );
        // for (const item of this.categoryList) {
        //     if (item.category_id === this.data.category_id) {
        //         selectedCategories = item;
        //         console.log(item);
        //         break;
        //     }
        // }
        console.log(111111111);
        // console.log(selectedCategories);

        // this.category = new FormControl(selectedCategory.type, [
        //     Validators.required,
        // ]);
    }

    buildFormGroup() {
        let entity = {
            name: this?.name,
            category: this?.category,
            shape: this?.shape,
            size: this?.size,
            flavour: this?.flavour,
            quantity: this?.quantity,
            price: this?.unitPrice,
        };
        // let entity = {
        //     name: [item?.name || ""],
        //     category: [item?.category || ""],
        //     shape: [item?.shape || ""],
        //     size: [item?.size || ""],
        //     flavour: [item?.flavour || ""],
        //     quantity: [item?.quantity || ""],
        //     price: [item?.price || ""],
        // };
        return this.fb.group(entity);
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
        if (!this.currentFile) {
            console.log("No file selected!");
            return;
        } else {
            this.shareService
                .uploadProdPhoto(this.currentFile)
                .pipe(take(1))
                .subscribe(() => {});
        }
    }

    closepopup() {
        this.dialogRef.close("Closed using function");
    }

    updateProduct() {
        this.upload();
        let valueForm = this.myform.value;
        let dataJSON = {
            category_id: valueForm.category.category_id,
            shape_id: valueForm.shape.shape_id,
            size_id: valueForm.size.size_id,
            flavour_id: valueForm.flavour.flavour_id,
            name: valueForm.name,
            quantity: valueForm.quantity,
            image: this.fileName,
            price: valueForm.unitPrice,
            status: "active",
        };
        if (this.data == null) {
            this.shareService
                .createProduct(dataJSON)
                .pipe(take(1))
                .subscribe(() => {
                    this.dialogRef.close("OK");
                });
        } else {
            this.shareService
                .updateProduct(dataJSON, this.data.prod_id)
                .pipe(take(1))
                .subscribe(() => {
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
                    this.categoryList = res.data;
                    console.log(res.data);
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
                    this.shapeList = res.data;
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
                    this.sizeList = res.data;
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
                    this.flavourList = res.data;
                },
                error: (error) => console.log("Error: " + error),
            });
    }

    closeDialog() {
        // this.dialogdialogRef.close(null);
    }
}
