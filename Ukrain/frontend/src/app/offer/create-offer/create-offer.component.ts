import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackService } from 'src/app/services/snack.service';
import { City, County, EMPTY_TYPE, Offer, User } from 'src/app/types/types';
import { HttpClient } from '@angular/common/http';
import { OfferStateService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';
import { C } from 'src/app/types/const';
import { CityService, CountyService } from './county.service';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  public description: string = "";
  public title: string = "";
  public locality: string = "";
  public maxRefuge: number = 0;
  public county: County = {
    id: 0,
    code: '',
    name: ''
  };
  public city: City = {
    id: 0,
    county: this.county,
    name: ''
  };
  public period: string = "";
  public wiling2host: string[] = [];
  public typeOfAccomodation: string[] = [];


  public user: User = EMPTY_TYPE.EMPTRY_USER;
  public counties: County[] | undefined = [];
  public cities: City[] | undefined = [];
  public selectCity: boolean = true;
  public housingType = C.housingType;
  public housingLenght = C.housingLenght;
  public housingOffer = C.housingOffer;



  constructor(
    private readonly snackService: SnackService,
    private readonly http: HttpClient,
    private readonly tx: OfferStateService,
    private readonly userService: UserService,
    private readonly countyService: CountyService,
    private readonly cityService: CityService
  ) {

  }

  ngOnInit(): void {
    this.userService.userObservable().subscribe(user => this.user = user)
    this.countyService.asObservable.subscribe(counties => this.counties = counties)
    this.cityService.asObservable.subscribe(cities => this.cities = cities)
  }

  public matSelect: string[] = []



  public async submit(ngForm: NgForm) {

    console.log(this.matSelect)

    let newOffer: Offer = {
      "description": this.description,
      "appUser": this.user,
      "title": this.title,
      "locality": this.locality,
      "maxRefuge": this.maxRefuge,
      "county": this.county,
      "city": this.city,
      "period": this.period,
      "typeOfAccomodation": this.typeOfAccomodation.join("#"),
      "wiling2host": this.wiling2host.join("#")
    };

    console.log(newOffer)

    let myCoolString = "http://localhost:3000/api/v1/offers/" + this.user.id

    this.http.post(myCoolString, newOffer).subscribe(data => {
      if (data) {
        ngForm.reset();

        newOffer.id = data;
        this.tx.notifyDataIncrement(newOffer)

        this.snackService.info("Offer created succesfully!");
      } else {
        this.snackService.error("Something didn't go as planed :( ")
      }
    },
      err => console.log(err)
    )

  }


  public async onCountyChange(county: County) {
    this.cityService.getCity(county.id);
    this.selectCity = false;

  }
}
