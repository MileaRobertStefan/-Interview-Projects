import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackService } from 'src/app/services/snack.service';
import { Offer, User } from 'src/app/types/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public firstName: string = "";
  public lastName: string = ""
  public email: string = "";
  public telephone: string = "";
  public password: string = "";

  constructor(
    private readonly router: Router,
    private readonly snackService: SnackService,
    private readonly http: HttpClient,
    private readonly tx: UserService
  ) { }

  ngOnInit(): void {
    sessionStorage.setItem('token', '');
  }

  public async submit(ngForm: NgForm) {
   
    this.tx.login(this.email, this.password);

  }
}
