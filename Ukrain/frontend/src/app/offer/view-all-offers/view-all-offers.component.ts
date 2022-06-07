import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferStateService } from 'src/app/services/offer.service';
import { SnackService } from 'src/app/services/snack.service';
import { UserService } from 'src/app/services/user.service';
import { C } from 'src/app/types/const';
import { City, County, EMPTY_TYPE, Offer, User } from 'src/app/types/types';
import { CountyService } from '../create-offer/county.service';

@Component({
  selector: 'app-view-all-offers',
  templateUrl: './view-all-offers.component.html',
  styleUrls: ['./view-all-offers.component.scss']
})
export class ViewAllOffersComponent implements OnInit {

  public dataSource: Offer[] = [];
  public originalData: Offer[] = [];
  private subs: Subscription[] = [];

  public maxRefuge: number = 0;
  public county: County = {
    id: 0,
    code: '',
    name: 'Any'
  };

  public period: string = "Any";
  public wiling2host: string[] = ["Any"];
  public typeOfAccomodation: string[] = ["Any"];


  public user: User = EMPTY_TYPE.EMPTRY_USER;
  public counties: County[] | undefined = [];
  public cities: City[] | undefined = [];
  public selectCity: boolean = true;
  public housingType = ["Any", ...C.housingType];
  public housingLenght = ["Any", ...C.housingLenght];
  public housingOffer = ["Any", ...C.housingOffer];

  constructor(
    private readonly snackService: SnackService,
    private readonlyhttp: HttpClient,
    private readonly tx: OfferStateService,
    private readonly userService: UserService,
    private readonly countyService: CountyService
  ) { }

  ngOnInit(): void {
    this.tx.dataObservable.subscribe(data => { this.originalData = data;; this.filter(); })
    this.userService.userObservable().subscribe(user => this.user = user)
    this.countyService.asObservable.subscribe(counties => this.counties = [{ "name": 'Any' }, ...(<any[]>counties)])
  }

  filter() {
    let data: Offer[] = this.originalData;

    if (this.county.name != "Any") {
      data = data.filter(value => value.county?.name == this.county.name)
    }

    if (this.period != "Any") {
      data = data.filter(value => value.period == this.period)
    }

    if (this.wiling2host.findIndex(value => value == "Any") == -1) {
      data = data.filter(v => {
        const value: string[] = <string[]>v.wiling2host;
        for (let v of this.wiling2host) {
          if (value.includes(v)) { return true; }

        }
        return false;
      })
    }

    if (this.typeOfAccomodation.findIndex(value => value == "Any") == -1) {
      data = data.filter(v => {
        const value: string[] = <string[]>v.typeOfAccomodation;
        for (let v of this.typeOfAccomodation) {
          if (value.includes(v)) { return true; }

        }
        return false;
      })
    }

    data = data.filter( value => <number>value.maxRefuge >= this.maxRefuge)

    this.dataSource = data
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }


  public async onCountyChange(county: County) {
    this.county = county;
    this.filter();
  }

  public async onPeriodChange(period: string) {
    this.period = period;
    this.filter();
  }

  public async onWiling2hostChange(wiling2host: string[]) {
    this.wiling2host = wiling2host;
    this.filter();
  }

  public async onTypeOfAccomodationChange(typeOfAccomodation: string[]) {
    this.typeOfAccomodation = typeOfAccomodation
    this.filter()
  }

  public async onMaxRefugeChange(county: any) {
    this.filter()
  }

}
