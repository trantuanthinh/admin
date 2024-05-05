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
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { take } from "rxjs";
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
    myform!: FormGroup;
    name = new FormControl("");
    unitPrice = new FormControl("");
    category = new FormControl("");
    shape = new FormControl("");
    size = new FormControl("");
    flavour = new FormControl("");
    quantity = new FormControl("");
    photo = new FormControl("");
    trackByFn!: TrackByFunction<number>;

    inputdata: any;
    editdata: any;
    closemessage = "closed using directive";
    categoryList: any = [];
    sizeList: any = [];
    shapeList: any = [];
    flavourList: any = [];

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
        this.myform = this.buildFormGroup();
        this.getCategories();
        this.getFlavours();
        this.getShapes();
        this.getSizes();
    }

    buildFormGroup() {
        this.name = new FormControl(this.data?.name || "");
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

    ngOnInit(): void {
        // this.inputdata = this.data;
        // if (this.inputdata.code > 0) {
        //     this.setpopupdata(this.inputdata.code);
        // }
    }

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

    setpopupdata(code: any) {
        // this.service.GetCustomerbycode(code).subscribe((item) => {
        // this.editdata = item;
        // this.myform.setValue({
        //     name: this.editdata.name,
        //     email: this.editdata.email,
        //     phone: this.editdata.phone,
        //     status: this.editdata.status,
        // });
        // });
    }

    closeDialog() {
        // this.dialogdialogRef.close(null);
    }
}
