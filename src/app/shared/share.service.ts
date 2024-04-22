import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: "root",
})
export class ShareService {
    // http = inject(HttpClient);
    private PORT: number = 3000;
    private wifiIPAddress: string | undefined;
    private RootEndPointAPI: string = ``;

    constructor(public httpService: HttpService, public http: HttpClient) {
        this.getAPI_URL();
    }

    getAPI_URL() {
        this.RootEndPointAPI = `http://localhost:${this.PORT}/api`;
    }

    getAll(url: string): Observable<any> {
        return this.httpService.getItems(url).pipe(
            map((res) => {
                let dataJSON = res;
                // let arrs = dataJSON["value"] as any[];
                // let total = parseInt(dataJSON["@odata.count"], 10);
                // return {
                //     total: total,
                //     value: arrs,
                // };
            })
            // catchError((error) => this.handleError("getItems", error))
        );
    }

    //Admins
    getAdmins() {
        let baseUrl = this.RootEndPointAPI + "/admins";
        return this.http.get(baseUrl);
    }
}
