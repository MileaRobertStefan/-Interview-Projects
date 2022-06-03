import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfferStateService } from 'src/app/services/offer.service';
import { SnackService } from 'src/app/services/snack.service';
import { UserService } from 'src/app/services/user.service';
import { C } from 'src/app/types/const';
import { EMPTY_TYPE, Offer, PendingOffer, User } from 'src/app/types/types';

@Component({
  selector: 'app-view-single-offer',
  templateUrl: './view-single-offer.component.html',
  styleUrls: ['./view-single-offer.component.scss']
})
export class ViewSingleOfferComponent implements OnInit {

  @Input()
  public offer: Offer = EMPTY_TYPE.EMPTY_OFFER
  public user: User = EMPTY_TYPE.EMPTRY_USER;

  @Input()
  public myOffer: boolean = false;
  @Input()
  public pendingOffers: PendingOffer[] = [];


  displayedColumns: string[] = ['description', 'accepted', 'user', 'email', 'button'];


  constructor(
    private readonly http: HttpClient,
    private readonly snackService: SnackService,
    private readonly userService: UserService,
    public dialog: MatDialog,
    private readonly tx: OfferStateService
  ) {


  }

  public wiling2host: string[] = [];
  public typeOfAccomodation: string[] = [];


  ngOnInit(): void {
    console.log(this.offer)
    this.userService.userObservable().subscribe(user => this.user = user)
    this.offer.period;

    try {
      this.offer.wiling2host = (<string>this.offer.wiling2host).split("#");
      this.offer.typeOfAccomodation = (<string>this.offer.typeOfAccomodation).split("#");
    } catch (e) { }
    this.wiling2host = <string[]>this.offer.wiling2host;
    this.typeOfAccomodation = <string[]>this.offer.typeOfAccomodation;

  }


  apply() {
    const dialogRef = this.dialog.open(RefugeMSG, {
      width: '80%',
      height: "40%",
      data: "",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      console.log(this.offer)
      let myCoolString = C.API + "pending_offers/" + this.user.id + "/" + this.offer.id

      this.http.post(myCoolString, result).subscribe(
        succes => {
          this.snackService.info("Succes! The owner will contact you by email. Please check spam too!")
        },
        error => {
          this.snackService.error(" We encounterd an error!")
        }
      );
    });
  }

  update() {
    let tempOffer: Offer =
    {
      description: this.offer.description,
      title: this.offer.title
    }

    console.log("update", this.offer)

    const dialogRef = this.dialog.open(CRUDMSG, {
      width: '60%',
      height: "40%",
      data: tempOffer,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      console.log(result)
      console.log(this.offer)

      this.http.post(
        C.API + "offers/update/" + this.offer.id,
        result
      ).subscribe(data => {
        this.offer.title = result.title;
        this.offer.description = result.description;

        this.tx.realod();

      },
        error => {
          this.snackService.error("we had a problem.");
        })
    })
  }

  delete() {
    console.log("delete", this.offer)
  }

  accept_pending_offer(a: PendingOffer) {
    this.http.post(
      C.API + "pending_offers/confirmOffer/" + a.id,
      {}
    ).subscribe(
      data => { a.accepted = true },
      error => { this.snackService.error("we had a problem."); }

    )
  }

}


@Component({
  selector: 'apply-selector',
  templateUrl: 'apply-selector.html',
})
export class RefugeMSG {
  constructor(
    public dialogRef: MatDialogRef<ViewSingleOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'crud-selector',
  templateUrl: 'crud-selector.html',
})
export class CRUDMSG {
  constructor(
    public dialogRef: MatDialogRef<ViewSingleOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public offer: Offer,
  ) { }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
