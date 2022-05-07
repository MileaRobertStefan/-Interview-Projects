import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OfferStateService } from 'src/app/services/offer.service';
import { SnackService } from 'src/app/services/snack.service';
import { Offer } from 'src/app/types/types';

@Component({
  selector: 'app-view-all-offers',
  templateUrl: './view-all-offers.component.html',
  styleUrls: ['./view-all-offers.component.scss']
})
export class ViewAllOffersComponent implements OnInit {

  displayedColumns: string[] = ['postedBy', 'desceription'];
  dataSource:Offer[] = [];
  private subs: Subscription[] = [];

  

  constructor(
    private readonly snackService: SnackService,
    private readonlyhttp: HttpClient,
    private readonly tx:OfferStateService
  ) { }

  ngOnInit(): void {
    this.tx.dataObservable.subscribe( data => {this.dataSource = data; })
  }

  public ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async asta(){
    this.tx.loadData();
  }

}
