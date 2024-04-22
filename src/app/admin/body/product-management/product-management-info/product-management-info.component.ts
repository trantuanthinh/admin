import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ShareService } from "../../../../shared/share.service";

@Component({
    selector: "app-product-management-info",
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatCheckboxModule,
        ReactiveFormsModule,
    ],
    templateUrl: "./product-management-info.component.html",
    styleUrl: "./product-management-info.component.scss",
})
export class ProductManagementInfoComponent implements OnInit {
    inputdata: any;
    editdata: any;
    closemessage = "closed using directive";

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private ref: MatDialogRef<ProductManagementInfoComponent>,
        private buildr: FormBuilder,
        private service: ShareService
    ) {}

    ngOnInit(): void {
        this.inputdata = this.data;
        if (this.inputdata.code > 0) {
            this.setpopupdata(this.inputdata.code);
        }
    }

    setpopupdata(code: any) {
        // this.service.GetCustomerbycode(code).subscribe((item) => {
        //     this.editdata = item;
        //     this.myform.setValue({
        //         name: this.editdata.name,
        //         email: this.editdata.email,
        //         phone: this.editdata.phone,
        //         status: this.editdata.status,
        //     });
        // });
    }

    closepopup() {
        this.ref.close("Closed using function");
    }

    myform = this.buildr.group({
        name: this.buildr.control(""),
        email: this.buildr.control(""),
        phone: this.buildr.control(""),
        status: this.buildr.control(true),
    });

    Saveuser() {
        // this.service.Savecustomer(this.myform.value).subscribe((res) => {
        //     this.closepopup();
        // });
    }
}
