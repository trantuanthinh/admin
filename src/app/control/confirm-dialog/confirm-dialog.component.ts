import { Component, Inject, Optional } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from "@angular/material/dialog";

@Component({
    selector: "app-confirm-dialog",
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    templateUrl: "./confirm-dialog.component.html",
    styleUrl: "./confirm-dialog.component.scss",
})
export class ConfirmDialogComponent {
    title: any;
    confirmMessage: any;
    submitBtn: any;
    cancelBtn: any;
    public actionSubmit: string = "ok";
    public actionCancel: string = "cancel";

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public dialogRef: MatDialogRef<ConfirmDialogComponent>
    ) {
        this.title = dialogData.title;
        this.confirmMessage = dialogData.confirmMessage;
        this.submitBtn = dialogData.submitBtn;
        this.cancelBtn = dialogData.cancelBtn;
    }

    confirm(action: string) {
        this.dialogRef.close({ action: action });
    }
}
