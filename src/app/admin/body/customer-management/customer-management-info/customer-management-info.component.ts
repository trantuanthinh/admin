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
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { take } from "rxjs";
import { CustomValidator } from "../../../../shared/CustomValidator";
import { SharePropertyService } from "../../../../shared/share-property.service";
import { ShareService } from "../../../../shared/share.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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
        MatDatepickerModule,
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: "./customer-management-info.component.html",
    styleUrl: "./customer-management-info.component.scss",
})
export class CustomerManagementInfoComponent {
    offset = 7;
    target: string = "Add";
    myform!: FormGroup;
    trackByFn!: TrackByFunction<number>;
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<CustomerManagementInfoComponent>,
        private shareService: ShareService,
        private sharePropertyService: SharePropertyService,
        private fb: FormBuilder,
        private http: HttpClient,
        private _snackBar: MatSnackBar
    ) {
        this.target = this.dialogData.target;
        this.myform = this.buildFormGroup();
    }

    close() {
        this.dialogRef.close();
    }

    buildFormGroup() {
        return this.fb.group({
            firstName: [
                this.dialogData.item ? this.dialogData.item.first_name : "",
                [Validators.required],
            ],
            lastName: [
                this.dialogData.item ? this.dialogData.item.last_name : "",
                [Validators.required],
            ],
            address: [
                this.dialogData.item ? this.dialogData.item.address : "",
                [Validators.required],
            ],
            phone: [
                this.dialogData.item ? this.dialogData.item.phone : "",
                [Validators.required, CustomValidator.numeric],
            ],
            email: [
                this.dialogData.item ? this.dialogData.item.email : "",
                [Validators.required, Validators.email],
            ],
            gender: [
                this.dialogData.item ? this.dialogData.item.gender : "",
                [Validators.required],
            ],
            dob: [
                this.dialogData.item ? this.dialogData.item.dateOfBirth : "",
                [Validators.required],
            ],
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

    submitProduct() {
        let valueForm = this.myform.value;
        let temp = this.sharePropertyService.convertDateStringToMoment(
            valueForm.dob,
            this.offset
        );
        valueForm.dob = this.sharePropertyService.formatDateMYSQL(temp);
        let dataJSON = {
            first_name: valueForm.firstName,
            last_name: valueForm.lastName,
            phone: valueForm.phone,
            email: valueForm.email,
            address: valueForm.address,
            gender: valueForm.gender,
            dateOfBirth: valueForm.dob,
        };
        if (!this.dialogData.item) {
            this.shareService
                .createCustomer(dataJSON)
                .pipe(take(1))
                .subscribe(() => {
                    this.openSnackBar("Created Successful");
                    this.dialogRef.close("OK");
                });
        } else {
            this.shareService
                .updateCustomer(dataJSON, this.dialogData.item.cus_id)
                .pipe(take(1))
                .subscribe(() => {
                    this.openSnackBar("Updated Successful");
                    this.dialogRef.close("OK");
                });
        }
    }

    closepopup() {
        this.dialogRef.close("Closed using function");
    }
}
