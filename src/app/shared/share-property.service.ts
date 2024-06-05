import { Injectable } from "@angular/core";
import moment from "moment";

@Injectable({
    providedIn: "root",
})
export class SharePropertyService {
    constructor() {}

    public isNullOrEmpty(data: any) {
        if (data === null || data === "" || data === undefined) {
            return true;
        }
        return false;
    }

    parseOffsetTimezone(offset: any): number {
        if (offset) {
            if (typeof offset === "number") {
                return offset;
            }
            let arrOffset = offset.split(".");
            if (arrOffset.length > 1) {
                return (
                    parseFloat(arrOffset[0] || 0) +
                    parseFloat(arrOffset[1] || 0) / 60
                );
            }
            return parseFloat(arrOffset[0] || 0);
        }
        return 0;
    }

    public convertDateStringToMoment(data: string, offset: any): any {
        if (!this.isNullOrEmpty(data)) {
            if (/Z$/.test(data) === false) {
                data = data + "Z";
            }
            let date: any = moment(data);
            let currentTimezone = this.parseOffsetTimezone(offset) * 60;
            let timezone = date._offset;
            let timespan = 0;
            if (currentTimezone !== timezone) {
                timespan = 0 - (currentTimezone - timezone);
            }
            if (date.isDST()) {
                date.subtract(timespan, "m");
            }
            return date;
        }
        return null;
    }

    public formatDate(data: any): string {
        if (!this.isNullOrEmpty(data)) {
            return data.format("DD/MM/YYYY");
        }
        return "";
    }

    public setCurrentDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return dd + "-" + mm + "-" + yyyy;
    }

    public formatDateMYSQL(data: any): string {
        if (!this.isNullOrEmpty(data)) {
            return data.format("YYYY/MM/DD");
        }
        return "";
    }

    public formatDateTime(data: any): string {
        if (!this.isNullOrEmpty(data)) {
            return data.format("DD/MM/YYYY HH:mm");
        }
        return "";
    }

    public formatDateTimeVi(data: any): string {
        if (!this.isNullOrEmpty(data)) {
            return `${data.format("HH:mm")} ngày ${data.format("DD/MM/YYYY")}`;
        }
        return "";
    }

    public formatTime(data: any): string {
        if (!this.isNullOrEmpty(data)) {
            return data.format("HH:mm");
        }
        return "";
    }
}
