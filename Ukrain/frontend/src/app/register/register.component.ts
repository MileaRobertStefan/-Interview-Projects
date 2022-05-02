import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackService } from 'src/app/services/snack.service';
import { User } from 'src/app/types/types';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public firstName: string = "";
  public lastName: string = ""
  public email: string = "";
  public telephone: string = "";
  public password: string = "";

  constructor(
    private readonly snackService: SnackService,
    private readonly http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  public async submit(ngForm: NgForm) {

    let myUser: User = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "telephone": this.telephone,
      "email": this.email,
      "password": this.password
    }

    console.log(myUser)

    this.http.post("http://localhost:3000/api/v1/registration", myUser).subscribe({
      next: data => {
        console.log(data);
        this.snackService.info(`An email has been seended to ${myUser.email}`)
        // this.tx.notifyDataIncrement(myUser);
        // ngForm.reset();
      },
      error: err => {
        console.log(err)
        this.snackService.error(err.error.message.toLocaleUpperCase())
      }
    })


  }
}
