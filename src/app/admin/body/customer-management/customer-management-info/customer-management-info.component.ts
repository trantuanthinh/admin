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
    selector: "app-customer-management-info",
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
    templateUrl: "./customer-management-info.component.html",
    styleUrl: "./customer-management-info.component.scss",
})
export class CustomerManagementInfoComponent {
    ngOnInit(): void {}
    myform!: FormGroup;
    customerName = new FormControl("");
    cakeName = new FormControl("");
    phoneOrder = new FormControl("");
    orderDate = new FormControl("");
    receivedDate = new FormControl("");
    quantity = new FormControl("");
    photo = new FormControl("");
    trackByFn!: TrackByFunction<number>;

    inputdata: any;
    editdata: any;
    closemessage = "closed using directive";
    cakeNameList: any = [];
    sizeList: any = [];
    shapeList: any = [];
    flavourList: any = [];

    message!: any;
    preview!: any;
    currentFile!: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<CustomerManagementInfoComponent>,
        private shareService: ShareService,
        private fb: FormBuilder,
        private http: HttpClient
    ) {
        this.myform = this.buildFormGroup();
        this.getCategories();
        this.getFlavours();
        this.getShapes();
        this.getSizes();
    }

    buildFormGroup() {
        let entity = {
            name: this.customerName,
            cakeName: this.cakeName,
            phoneOrder: this.phoneOrder,
            orderDate: this.orderDate,
            receivedDate: this.receivedDate,
            quantity: this.quantity,
        };
        return this.fb.group(entity);
    }
    selectedFile: File | null = null;

    onFileSelected(event: any) {
        this.message = "";
        this.preview = "";
        const selectedFiles = event.target.files;

        if (selectedFiles) {
            const file: File | null = selectedFiles.item(0);

            if (file) {
                this.preview = "";
                this.currentFile = file;

                const reader = new FileReader();

                reader.onload = (e: any) => {
                    console.log(e.target.result);
                    this.preview = e.target.result;
                };

                reader.readAsDataURL(this.currentFile);
            }
        }
    }

    upload() {
        if (!this.selectedFile) {
            console.log("No file selected!");
            return;
        }
        this.shareService.uploadProdPhoto(this.currentFile).pipe(take(1));
        console.log("Uploading file:", this.selectedFile);
    }

    closepopup() {
        this.dialogRef.close("Closed using function");
    }

    SaveUser() {
        // this.service.Savecustomer(this.myform.value).subscribe((res) => {
        //     this.closepopup();
        // });
    }

    updateProduct() {
        let valueForm = this.myform.value;
        console.log(valueForm);
        let dataJSON = {
            decor_detail_id: 1,
            category_id: valueForm.category.category_id,
            shape_id: valueForm.shape.shape_id,
            size_id: valueForm.size.size_id,
            flavour_id: valueForm.flavour.flavour_id,
            name: valueForm.name,
            quantity: valueForm.quantity,
            image: "cake.jpn",
            price: 25.2,
        };
        // this.shareService
        //     .createProduct(dataJSON)
        //     .pipe(take(1))
        //     .subscribe(() => {
        //         this.dialogRef.close("OK");
        //     });
    }

    getCategories() {
        this.shareService
            .getCategories()
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    this.cakeNameList = res.data;
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
