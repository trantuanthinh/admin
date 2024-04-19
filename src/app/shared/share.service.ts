import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  http = inject(HttpClient);

  constructor() { }

  getCategories() {
    return this.http.get('http://localhost:3000/api/categories');
  }
}
