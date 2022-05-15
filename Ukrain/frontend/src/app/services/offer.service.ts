import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Offer } from "../types/types";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { C } from "src/app/types/const";


@Injectable({
    providedIn: 'root'
})
export class OfferStateService {
    private count: number = 0;

    private readonly emitter: Subject<void>;
    private readonly offer!: BehaviorSubject<Offer | undefined>;
    private readonly offers!: BehaviorSubject<Offer[]>;

    constructor(
        private readonly router: Router,
        private readonly http: HttpClient
    ) {

        this.offer = new BehaviorSubject<Offer | undefined>(undefined);
        this.offers = new BehaviorSubject<Offer[]>([]);

        this.emitter = new Subject<void>();
        this.emitter.subscribe(() => this.loadData());
        this.emitter.next();
    }

    public get asObservable(): Observable<Offer | undefined> {
        return this.offer.asObservable();
    }

    public get dataObservable(): Observable<Offer[]> {
        return this.offers.asObservable();
    }

    public updateCurrentoffer(offer: Offer) {
        this.offer.next(offer);
        this.router.navigate(["all_offers"]);
    }

    public realod(): void {

        let myCoolString = C.API + "offers";
        this.http.get<Offer[]>(myCoolString).subscribe((data: Offer[]) => {
            this.offers.next(data);
        }, error => {
            console.log(error)
        })
    }

    public updateData(): void {
        this.emitter.next();
    }

    public async notifyDataIncrement(newoffer: Offer): Promise<void> {
        this.count = this.count + 1;
        this.offers.next([...this.offers.value, newoffer]);
    }

    public async loadData(): Promise<void> {
        let myCoolString = C.API + "offers"
        this.http.get<Offer[]>(myCoolString).subscribe((data: Offer[]) => {
            this.offers.next(data);
        }, error => {
            console.log(error)
        } )
    }
}