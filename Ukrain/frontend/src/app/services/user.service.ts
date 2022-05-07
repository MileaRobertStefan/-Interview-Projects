import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { C } from "../types/const";
import { EMPTY_TYPE, User } from "../types/types";
import { SnackService } from "./snack.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {
;
    private readonly user: BehaviorSubject<User>;
    
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router,
        private readonly snackService: SnackService
    ) {

        this.user = new BehaviorSubject<User>(EMPTY_TYPE.EMPTRY_USER);
    }

    public async login(username: string, password: string): Promise<void> {
        const formData = new FormData()
        formData.set("username", username);
        formData.set("password", password);
        const headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' })
        const body = `username=${username}&password=${password}`

        this.http.post("http://localhost:3000/processLogin", body, { responseType: 'text', headers: headers, observe: "response", withCredentials: true }).subscribe(
            data => {
                if(! data) return;

                const token = btoa(username + ':' + password)
                sessionStorage.setItem('token', "Basic " + token);
               
                this.snackService.info(`You are loged in!`)
                this.router.navigate(['']);

                this.http.get<User>(C.API + "user/" + username).subscribe(
                    myUser => {
                        myUser.token=token;
                        console.log(myUser);
                        sessionStorage.setItem('id', "" + myUser.id )
                        this.user.next(myUser)
                    },
                    err => {
                        console.log(err)
                    }
                )


            },
            erorr => {
                console.log(erorr);
                this.snackService.error("An error has happend!");
            }
        )



    }

    public userObservable(): Observable<User> {
        return this.user.asObservable();
    }

    public async updateUser(user: User) {

    }

    public get asObservable(): Observable<User | undefined> {
        return this.user.asObservable();
    }

    public get dataObservable(): Observable<User> {
        return this.user.asObservable();
    }

    public async refresh(): Promise<void> {
        await this.updateUser(this.user.getValue());
    }


}
