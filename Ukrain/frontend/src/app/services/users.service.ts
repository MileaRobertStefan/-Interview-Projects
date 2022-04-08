import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { User } from "../types/types";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserStateService {
    private count: number = 0;

    private readonly emitter: Subject<void>;
    private readonly User!: BehaviorSubject<User | undefined>;
    private readonly Users!: BehaviorSubject<User[]>;

    constructor(
        private readonly router: Router,
        private readonly http: HttpClient
    ) {

        this.User = new BehaviorSubject<User | undefined>(undefined);
        this.Users = new BehaviorSubject<User[]>([]);

        this.emitter = new Subject<void>();
        this.emitter.subscribe(() => this.loadData());
        this.emitter.next();
    }

    public get asObservable(): Observable<User | undefined> {
        return this.User.asObservable();
    }

    public get dataObservable(): Observable<User[]> {
        return this.Users.asObservable();
    }

    public updateCurrentUser(User: User) {
        this.User.next(User);
        this.router.navigate(["view-users"]);
    }


    public updateData(): void {
        this.emitter.next();
    }

    public async notifyDataIncrement(newUser: User): Promise<void> {
        this.count = this.count + 1;
        this.Users.next([...this.Users.value, newUser]);
    }

    private async loadData(): Promise<void> {

        let myCoolString = "http://localhost:3000/api/v1/users"
        this.http.get<User[]>(myCoolString).subscribe((data: User[]) => {
            this.Users.next(data);
        })
    }
}