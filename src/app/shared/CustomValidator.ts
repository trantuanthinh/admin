import { AbstractControl } from "@angular/forms";

export class CustomValidator {
    static numeric(control: AbstractControl) {
        let val = control.value;
        if (val === null || val === "" || val === undefined) return null;
        if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { invalidNumber: true };
        return null;
    }

    static gender(control: AbstractControl) {
        let val = control.value;
        if (val === null || val === "" || val === undefined) return null;
        if (val !== "male" && val !== "female") return { invalidGender: true };
        return null;
    }
}
