import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-localstorage";
import { Observable, catchError, throwError } from "rxjs";
import { HttpService } from "./http.service";
import { SharePropertyService } from "./share-property.service";

@Injectable({
    providedIn: "root",
})
export class ShareService {
    // http = inject(HttpClient);
    private PORT: number = 3000;
    private apiDomain: any = "localhost";
    private RootEndPointAPI: string = ``;

    private headers = new HttpHeaders();

    constructor(
        public httpService: HttpService,
        public http: HttpClient,
        private sharePropertyService: SharePropertyService,
        private localStorage: LocalStorageService
    ) {
        this.setAPIDomain(this.localStorage.get("domain"));
        this.getAPI_URL();
    }

    setAPIDomain(domain: any) {
        if (this.sharePropertyService.isNullOrEmpty(domain)) {
            this.localStorage.set("domain", "localhost");
        } else {
            this.localStorage.set("domain", domain);
        }
        this.apiDomain = this.localStorage.get("domain");
        this.getAPI_URL();
    }

    getAPI_URL() {
        this.RootEndPointAPI = `http://${this.apiDomain}:${this.PORT}/api`;
    }

    getAll(url: string): Observable<any> {
        return this.http
            .get(url, { headers: this.headers })
            .pipe(
                catchError((error) => this.handleError("API Error: ", error))
            );
    }

    getItem(url: string): Observable<any> {
        return this.http
            .get(url, { headers: this.headers })
            .pipe(
                catchError((error) => this.handleError("API Error: ", error))
            );
    }

    createItem(url: string, item: any): Observable<any> {
        return this.http
            .post(url, item, { headers: this.headers })
            .pipe(
                catchError((error) => this.handleError("API Error: ", error))
            );
    }

    updateItem(url: string, item: any): Observable<any> {
        return this.http
            .put(url, item, { headers: this.headers })
            .pipe(
                catchError((error) => this.handleError("API Error: ", error))
            );
    }

    deleteItem(url: string): Observable<any> {
        return this.http
            .delete(url, { headers: this.headers })
            .pipe(
                catchError((error) => this.handleError("API Error: ", error))
            );
    }

    //getProdPhotoURL
    getProdPhotoURL(photoName: string) {
        let baseUrl = this.RootEndPointAPI + `/prod_photo/${photoName}`;
        return baseUrl;
    }

    //uploadProdPhoto
    uploadProdPhoto(file: File): Observable<any> {
        let baseUrl = this.RootEndPointAPI + `/prod_photo`;
        const formData: FormData = new FormData();
        formData.append("file", file);
        return this.http
            .post(baseUrl, formData, { headers: this.headers })
            .pipe(
                catchError((error) => this.handleError("API Error: ", error))
            );
    }

    //getDecorPhotoURL
    getDecorPhotoURL(photoName: string) {
        let baseUrl = this.RootEndPointAPI + `/decor_photo/${photoName}`;
        return baseUrl;
    }

    //uploadProdPhoto
    uploadDecorPhoto(file: File): Observable<any> {
        let baseUrl = this.RootEndPointAPI + `/decor_photo`;
        const formData: FormData = new FormData();
        formData.append("file", file);
        return this.http
            .post(baseUrl, formData, { headers: this.headers })
            .pipe(
                catchError((error) => this.handleError("API Error: ", error))
            );
    }

    //admins
    getAdmins() {
        let baseUrl = this.RootEndPointAPI + `/admins`;
        return this.getAll(baseUrl);
    }

    getAdmin(id: any) {
        let baseUrl = this.RootEndPointAPI + `/admins/${id}`;
        return this.getItem(baseUrl);
    }

    createAdmin(item: any) {
        let baseUrl = this.RootEndPointAPI + `/admins`;
        return this.createItem(baseUrl, item);
    }

    updateAdmin(id: any, item: any) {
        let baseUrl = this.RootEndPointAPI + `/admins/${id}`;
        return this.updateItem(baseUrl, item);
    }

    deleteAdmin(id: any) {
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

    createCustomer(item: any) {
        let baseUrl = this.RootEndPointAPI + `/customers`;
        return this.createItem(baseUrl, item);
    }

    updateCustomer(item: any, id: any) {
        let baseUrl = this.RootEndPointAPI + `/customers/${id}`;
        return this.updateItem(baseUrl, item);
    }

    deleteCustomer(id: any) {
        let baseUrl = this.RootEndPointAPI + `/customers/${id}`;
        return this.deleteItem(baseUrl);
    }

    //products
    getProducts() {
        let baseUrl = this.RootEndPointAPI + `/products`;
        return this.getAll(baseUrl);
    }

    getProduct(id: any) {
        let baseUrl = this.RootEndPointAPI + `/products/${id}`;
        return this.getAll(baseUrl);
    }

    createProduct(item: any) {
        let baseUrl = this.RootEndPointAPI + `/products`;
        return this.createItem(baseUrl, item);
    }

    updateProduct(item: any, id: any) {
        let baseUrl = this.RootEndPointAPI + `/products/${id}`;
        return this.updateItem(baseUrl, item);
    }

    deleteProduct(id: any) {
        let baseUrl = this.RootEndPointAPI + `/products/${id}`;
        return this.deleteItem(baseUrl);
    }

    //sizes
    getSizes() {
        let baseUrl = this.RootEndPointAPI + `/sizes`;
        return this.getAll(baseUrl);
    }

    getSize(id: any) {
        let baseUrl = this.RootEndPointAPI + `/sizes/${id}`;
        return this.getAll(baseUrl);
    }

    //shapes
    getShapes() {
        let baseUrl = this.RootEndPointAPI + `/shapes`;
        return this.getAll(baseUrl);
    }

    getShape(id: any) {
        let baseUrl = this.RootEndPointAPI + `/shapes/${id}`;
        return this.getAll(baseUrl);
    }

    //flavours
    getFlavours() {
        let baseUrl = this.RootEndPointAPI + `/flavours`;
        return this.getAll(baseUrl);
    }

    getFlavour(id: any) {
        let baseUrl = this.RootEndPointAPI + `/flavours/${id}`;
        return this.getAll(baseUrl);
    }

    //categories
    getCategories() {
        let baseUrl = this.RootEndPointAPI + `/categories`;
        return this.getAll(baseUrl);
    }

    getCategory(id: any) {
        let baseUrl = this.RootEndPointAPI + `/categories/${id}`;
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
