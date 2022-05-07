import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackService } from 'src/app/services/snack.service';
import { EMPTY_TYPE, Offer, User } from 'src/app/types/types';
import { HttpClient } from '@angular/common/http';
import { OfferStateService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';
import { C } from 'src/app/types/const';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  public description: string = "";
  public user: User = EMPTY_TYPE.EMPTRY_USER;
  constructor(
    private readonly snackService: SnackService,
    private readonly http: HttpClient,
    private readonly tx: OfferStateService,
    private readonly userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.userService.userObservable().subscribe(user => this.user = user)
  }

  public async submit(ngForm: NgForm) {
    let newOffer: Offer = {
      "description": this.description,
      "appUser": this.user
    };

    console.log("did it work?")

    let myCoolString = "http://localhost:3000/api/v1/offers/" + this.user.id

    this.http.post(myCoolString, newOffer).subscribe(data => {
      if (data == true) {
        this.snackService.info("Offer created succesfully!");
        ngForm.reset();
        this.tx.notifyDataIncrement(newOffer)

      } else {
        this.snackService.error("Something didn't go as planed :( ")
      }
    },
      err => console.log(err)

    )


  }
}
