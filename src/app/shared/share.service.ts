import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, throwError } from "rxjs";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: "root",
})
export class ShareService {
    // http = inject(HttpClient);
    private PORT: number = 3000;
    private RootEndPointAPI: string = ``;

    private headers = new HttpHeaders();

    constructor(public httpService: HttpService, public http: HttpClient) {
        this.getAPI_URL();
    }

    getAPI_URL() {
        // this.RootEndPointAPI = `http://localhost:${this.PORT}/api`;
        this.RootEndPointAPI = `http://10.30.221.82:${this.PORT}/api`;
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

    //admins
    getAdmins() {
        let baseUrl = this.RootEndPointAPI + `/admins`;
        return this.http.get(baseUrl);
    }

    getAdmin(id: number) {
        let baseUrl = this.RootEndPointAPI + `/admins/${id}`;
        return this.http.get(baseUrl);
    }

    createAdmin(item: any) {
        let baseUrl = this.RootEndPointAPI + `/admins`;
        return this.http.post(baseUrl, item);
    }

    updateAdmin(id: number, item: any) {
        let baseUrl = this.RootEndPointAPI + `/admins/${id}`;
        return this.http.put(baseUrl, item);
    }

    deleteAdmin(id: number) {
        let baseUrl = this.RootEndPointAPI + `/admins/${id}`;
        return this.http.delete(baseUrl);
    }

    //products
    getProducts() {
        let baseUrl = this.RootEndPointAPI + `/products`;
        return this.http.get(baseUrl);
    }

    createProduct(item: any) {
        let baseUrl = this.RootEndPointAPI + `/products`;
        console.log(item);
        return this.http.post(baseUrl, item, { headers: this.headers });
        // return this.http.post(baseUrl, item);
    }

    //sizes
    getSizes() {
        let baseUrl = this.RootEndPointAPI + `/sizes`;
        return this.http.get(baseUrl);
    }

    //shapes
    getShapes() {
        let baseUrl = this.RootEndPointAPI + `/shapes`;
        return this.http.get(baseUrl);
    }

    //flavours
    getFlavours() {
        let baseUrl = this.RootEndPointAPI + `/flavours`;
        return this.http.get(baseUrl);
    }

    //categories
    getCategories() {
        let baseUrl = this.RootEndPointAPI + `/categories`;
        return this.http.get(baseUrl);
    }

    handleError(methodName: string, errorData: HttpErrorResponse | any) {
        let errorResponse: any = {
            status: 0,
            message: "",
        };
        return throwError(() => new Error(errorResponse.message));
    }
}
