import { Component, OnDestroy } from "@angular/core";

@Component({
    selector: "simple-base",
    template: "",
})
export class SimpleBaseComponent implements OnDestroy {
    public offset: number = 7;

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
}
