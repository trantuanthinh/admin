import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule, TitleCasePipe } from "@angular/common";
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
    category = new FormControl("");
    shape = new FormControl("");
    size = new FormControl("");
    flavour = new FormControl("");
    quantity = new FormControl("");
    trackByFn!: TrackByFunction<number>;

    inputdata: any;
    editdata: any;
    closemessage = "closed using directive";
    categoryList: any = [];
    sizeList: any = [];
    shapeList: any = [];
    flavourList: any = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private ref: MatDialogRef<ProductManagementInfoComponent>,
        private buildr: FormBuilder,
        private shareService: ShareService,
        private fb: FormBuilder
    ) {
        this.myform = this.buildFormGroup();
        this.getCategories();
        this.getFlavours();
        this.getShapes();
        this.getSizes();
    }

    buildFormGroup() {
        let entity = {
            name: this.name,
            category: this.category,
            shape: this.shape,
            size: this.size,
            flavour: this.flavour,
            quantity: this.quantity,
        };
        return this.fb.group(entity);
    }

    ngOnInit(): void {
        // this.inputdata = this.data;
        // if (this.inputdata.code > 0) {
        //     this.setpopupdata(this.inputdata.code);
        // }
    }

    closepopup() {
        this.ref.close("Closed using function");
    }

    SaveUser() {
        // this.service.Savecustomer(this.myform.value).subscribe((res) => {
        //     this.closepopup();
        // });
    }

    saveCustomer() {
        let valueForm = this.myform.value;
        let dataJSON = {
            name: valueForm.name,
            category: valueForm.category.category_id,
            shape: valueForm.shape.shape_id,
            size: valueForm.size.size_id,
            flavour: valueForm.flavour.flavour_id,
            quantity: valueForm.quantity,
        };
        console.log(dataJSON);
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
        // this.dialogRef.close(null);
    }
}
