import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { SnackService } from "src/app/services/snack.service";
import { C } from "src/app/types/const";
import { City, County } from "src/app/types/types";

@Injectable({
    providedIn: 'root'
})
export class CountyService {
    private readonly county!: BehaviorSubject<County[] | undefined>;

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly snackService: SnackService
    ) {
        this.county = new BehaviorSubject<County[] | undefined>([]);
        this.getCounty();
    }

    public async getCounty() {
        this.county.next(await this.http.get<County[]>(C.API + "county").toPromise());
    }

    public get asObservable(): Observable<County[] | undefined> {
        return this.county.asObservable();
    }
}

@Injectable({
    providedIn: 'root'
})
export class CityService {
    private readonly city!: BehaviorSubject<City[] | undefined>;

    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly snackService: SnackService
    ) {
        this.city = new BehaviorSubject<City[] | undefined>([]);
    }

    public async getCity(county_id: number) {
        this.city.next(await this.http.get<City[]>(C.API + county_id).toPromise());
    }

    public get asObservable(): Observable<City[] | undefined> {
        return this.city.asObservable();
    }

}