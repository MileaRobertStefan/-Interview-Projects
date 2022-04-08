import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackService } from 'src/app/services/snack.service';
import { Offer } from 'src/app/types/types';
import { HttpClient } from '@angular/common/http';
import { OfferStateService } from 'src/app/services/Offer.service';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.scss']
})
export class OfferCreateComponent implements OnInit {
 
  public description:string = "";

  constructor(
    private readonly snackService: SnackService,
    private readonly http: HttpClient,
    private readonly tx:OfferStateService
  ) { 

  }

  ngOnInit(): void {
  }

  public async submit(ngForm: NgForm) {
    let newOffer:Offer = { 
      "description": this.description,
      "postedBy":"Me a good User!"
    };
    
    let myCoolString = "http://localhost:3000/api/v1/offers"
    this.http.post(myCoolString, newOffer).subscribe( data => {
      if( data == true){
        this.snackService.info("Offer created succesfully!");
        ngForm.reset();
        this.tx.notifyDataIncrement(newOffer)

      } else {
        this.snackService.error("Something didn't go as planed :( ")
      }
    })


  }

}
