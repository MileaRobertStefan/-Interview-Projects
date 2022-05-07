import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  public user: User  = EMPTY_TYPE.EMPTRY_USER;
  
  @Input()
  public myOffer: boolean = false;
  @Input()
  public pendingOffers: PendingOffer[] = [];


  displayedColumns: string[] = ['description','accepted', 'user' , 'email','button'];


  constructor(
    private readonly http: HttpClient,
    private readonly snackService: SnackService,
    private readonly userService: UserService,
    public dialog: MatDialog
  ) {

   }

  ngOnInit(): void {
    this.userService.userObservable().subscribe( user => this.user = user)
  }

  apply()
  {

    const dialogRef = this.dialog.open(RefugeMSG, {
      width: '40%',
      height: "20%",
      data: "",
    });

    dialogRef.afterClosed().subscribe(result => {
 
      

      console.log(this.offer)
      let myCoolString = C.API  + "pending_offers/" + this.user.id + "/" + this.offer.id
  
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

  update(){

  }

  delete(){
    
  }

  accept_pending_offer(a: PendingOffer){
    this.http.post(
      C.API + "pending_offers/confirmOffer/" + a.id,
      {}
    ).subscribe(
      data => {  a.accepted = true},
      error => { this.snackService.error("we had a problem.");}
     
    )
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class RefugeMSG {
  constructor(
    public dialogRef: MatDialogRef<ViewSingleOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
