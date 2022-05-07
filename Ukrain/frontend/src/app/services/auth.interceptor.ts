import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpEvent, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { SnackService } from "./snack.service";

@Injectable()
export class AuthentInterceptor implements HttpInterceptor {

    constructor(
        //public userSessionService: UserSessionService,
        private router: Router,
        private readonly snackService: SnackService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token: string | null = sessionStorage.getItem("token")

        if (token) {
            req = req.clone({ withCredentials: true })
        } else {
            this.router.navigateByUrl('/login')
            this.snackService.error("You are not loged in!")
        }



        return next.handle(req).pipe(
            catchError(err => {
                if (err.status === 404 && "http://localhost:4200/login" === err.url) {
                    console.info("redirect  to /login")
                    this.router.navigateByUrl('/login')
                    this.snackService.error("You are not loged in!")
                }
                if (err.status === 401) {
                    // currently not needed                
                }
                return throwError(err);
            }
            )
        );
    }
}
