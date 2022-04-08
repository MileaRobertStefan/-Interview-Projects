import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackService } from 'src/app/services/snack.service';
import { Offer, User } from 'src/app/types/types';
import { HttpClient } from '@angular/common/http';
import { UserStateService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  public  first_name:string = "";
  public  last_name:string = ""
  public email:string = "";
  public telephone:string = "";

  constructor(
    private readonly snackService: SnackService,
    private readonly http: HttpClient,
    private readonly tx:UserStateService
  ) { }

  ngOnInit(): void {
  }

  public async submit(ngForm: NgForm) {
    
      let myUser:User = {
        "first_name" : this.first_name,
        "last_name": this.last_name,
        "telephone": this.telephone,
        "email": this.email,
        "id": 0
      }

      console.log(myUser)

      this.http.post("http://localhost:3000/api/v1/users", myUser).subscribe( data => {
        if ( data == true){
          this.snackService.info("New accoutn created")
          this.tx.notifyDataIncrement(myUser);
          ngForm.reset();
        } else {
          this.snackService.error("An error has happend!")
        }
      })
  }

}
