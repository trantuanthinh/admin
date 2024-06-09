import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { Component, Inject, Optional } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: "app-customer-management-detail",
    standalone: true,
    imports: [CommonModule, MatInputModule, MatCardModule, ScrollingModule, MatIconModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: "./customer-management-detail.component.html",
    styleUrl: "./customer-management-detail.component.scss",
})
export class CustomerManagementDetailComponent {
    offset = 7;
    target: string = "Add";
    myform!: FormGroup;
    customer: any = {};

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
        private dialogRef: MatDialogRef<CustomerManagementDetailComponent>,
        private fb: FormBuilder,
        private _snackBar: MatSnackBar
    ) {
        this.getData();
    }

    getData() {
        this.customer = this.dialogData.item;
    }
    close() {
        this.dialogRef.close();
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
