import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyOffersStateService } from 'src/app/services/myoffers.service';
import { OfferStateService } from 'src/app/services/offer.service';
import { SnackService } from 'src/app/services/snack.service';
import { UserService } from 'src/app/services/user.service';
import { C } from 'src/app/types/const';
import { EMPTY_TYPE, Offer, PendingOffer, User } from 'src/app/types/types';




@Component({
  selector: 'app-view-all-my-offers',
  templateUrl: './view-all-my-offers.component.html',
  styleUrls: ['./view-all-my-offers.component.scss']
})
export class ViewAllMyOffersComponent implements OnInit {

   pendingOffers: PendingOffer[][] = [];

  dataSource: Offer[] = [];
  private subs: Subscription[] = [];

  public user: User = EMPTY_TYPE.EMPTRY_USER;

  constructor(
    private readonly snackService: SnackService,
    private readonly http: HttpClient,
    private readonly userService: UserService,
    private readonly myofferService: MyOffersStateService
  ) { }


    public parse(v:any):string {
      return JSON.stringify(v)
    }
  
  ngOnInit(): void {

    this.userService.userObservable().subscribe(user => {
      this.user = user
      if (this.user != EMPTY_TYPE.EMPTRY_USER && this.user) {
        this.myofferService.loadData(this.user.id)
      }
    })


    this.myofferService.dataObservable.subscribe(data => { 
  
      let promiseVector: Promise<any>[] = [];

      data.forEach( (value) => { promiseVector.push(   this.http.get( C.API + "pending_offers/getbyofferid/" + value.id).toPromise() )
      })

      Promise.all(promiseVector).then( values => {this.pendingOffers = values; console.log(values)})
      this.dataSource = data; 
    })
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async asta() {
    this.myofferService.loadData(this.user.id)
  }
}
