import { Component, OnInit } from '@angular/core';
import { Offer } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { SnackService } from '../services/snack.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { OfferStateService } from '../services/Offer.service';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  displayedColumns: string[] = ['postedBy', 'desceription'];
  dataSource:Offer[] = [];
  private subs: Subscription[] = [];

  

  constructor(
    private readonly snackService: SnackService,
    private http: HttpClient,
    private readonly tx:OfferStateService
  ) { }

  ngOnInit(): void {
    // let myCoolString = "http://localhost:3000/api/v1/offers"
    // this.http.get<Offer[]>(myCoolString).subscribe( (data:Offer[]) =>{
    //   this.dataSource = data
    // })
    this.tx.dataObservable.subscribe( data => this.dataSource = data)
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
