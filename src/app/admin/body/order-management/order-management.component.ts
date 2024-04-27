import { Component, Inject, OnInit, TrackByFunction } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { take } from "rxjs";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule, TitleCasePipe } from "@angular/common";
// import { Component, Inject, OnInit, TrackByFunction } from "@angular/core";

import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from "@angular/forms";
import { ShareService } from "../../../shared/share.service";

@Component({
    selector: "app-order-management",
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
    templateUrl: "./order-management.component.html",
    styleUrl: "./order-management.component.scss",
})
export class OrderManagementComponent implements OnInit {
    ngOnInit(): void {}
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
        private dialogRef: MatDialogRef<OrderManagementComponent>,
        private shareService: ShareService,
        private fb: FormBuilder
    ) {
        // this.myform = this.buildFormGroup();
        // this.getCategories();
        // this.getFlavours();
        // this.getShapes();
        // this.getSizes();
    }
}
