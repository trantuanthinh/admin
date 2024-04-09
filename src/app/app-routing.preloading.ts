import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AppRoutingPreloadingStrategy implements PreloadingStrategy {
	preloadedModules: string[] = [];

	preload(route: Route, load: () => Observable<any>): Observable<any> {
		if (route.data && route.data["preload"]) {
			this.preloadedModules.push(route.path!);
			return load();
		}
		return of(null);
	}
}
