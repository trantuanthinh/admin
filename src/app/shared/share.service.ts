import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
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
        this.RootEndPointAPI = `http://localhost:${this.PORT}/api`;
    }

    getAll(url: string): Observable<any> {
        return this.http.get(url, { headers: this.headers });
    }

    getItem(url: string): Observable<any> {
        return this.http.get(url, { headers: this.headers });
    }

    createItem(url: string, item: any): Observable<any> {
        return this.http.post(url, item, { headers: this.headers });
    }

    updateItem(url: string, item: any): Observable<any> {
        return this.http.put(url, item, { headers: this.headers });
    }

    deleteItem(url: string): Observable<any> {
        return this.http.delete(url, { headers: this.headers });
    }

    //getPhoto
    getPhoto(photoName: string): string {
        let baseUrl = this.RootEndPointAPI + `/photo/${photoName}`;
        return baseUrl;
    }

    //admins
    getAdmins() {
        let baseUrl = this.RootEndPointAPI + `/admins`;
        return this.getAll(baseUrl);
    }

    getAdmin(id: number) {
        let baseUrl = this.RootEndPointAPI + `/admins/${id}`;
        return this.getItem(baseUrl);
    }

    createAdmin(item: any) {
        let baseUrl = this.RootEndPointAPI + `/admins`;
        return this.createItem(baseUrl, item);
    }

    updateAdmin(id: number, item: any) {
        let baseUrl = this.RootEndPointAPI + `/admins/${id}`;
        return this.updateItem(baseUrl, item);
    }

    deleteAdmin(id: number) {
        let baseUrl = this.RootEndPointAPI + `/admins/${id}`;
        return this.deleteItem(baseUrl);
    }

    //orders
    getOrders() {
        let baseUrl = this.RootEndPointAPI + `/orders`;
        return this.getAll(baseUrl);
    }
    createOrders(item: any) {
        let baseUrl = this.RootEndPointAPI + `/orders`;
        return this.createItem(baseUrl, item);
    }

    //customers
    getCustomers() {
        let baseUrl = this.RootEndPointAPI + `/customers`;
        return this.getAll(baseUrl);
    }
    createCustomers(item: any) {
        let baseUrl = this.RootEndPointAPI + `/customers`;
        return this.createItem(baseUrl, item);
    }

    //products
    getProducts() {
        let baseUrl = this.RootEndPointAPI + `/products`;
        return this.getAll(baseUrl);
    }

    createProduct(item: any) {
        let baseUrl = this.RootEndPointAPI + `/products`;
        return this.createItem(baseUrl, item);
    }

    //sizes
    getSizes() {
        let baseUrl = this.RootEndPointAPI + `/sizes`;
        return this.getAll(baseUrl);
    }

    //shapes
    getShapes() {
        let baseUrl = this.RootEndPointAPI + `/shapes`;
        return this.getAll(baseUrl);
    }

    //flavours
    getFlavours() {
        let baseUrl = this.RootEndPointAPI + `/flavours`;
        return this.getAll(baseUrl);
    }

    //categories
    getCategories() {
        let baseUrl = this.RootEndPointAPI + `/categories`;
        return this.getAll(baseUrl);
    }

    handleError(methodName: string, errorData: HttpErrorResponse | any) {
        let errorResponse: any = {
            status: methodName,
            message: errorData,
        };
        return throwError(() => new Error(errorResponse.message));
    }
}
