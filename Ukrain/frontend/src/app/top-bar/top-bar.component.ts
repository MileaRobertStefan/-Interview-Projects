import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { EMPTY_TYPE, User } from '../types/types';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public lastName: string = "";
  public firstName: string = "";

  public user: User = EMPTY_TYPE.EMPTRY_USER;

  public subtitle: string = "You must log in to use the application";

  constructor(private readonly router: Router,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.userObservable().subscribe(
      (user: User) => {
        this.user = user

        if (user != EMPTY_TYPE.EMPTRY_USER) {
          this.subtitle = `${this.user.lastName} ${this.user.firstName}`
        }


      }
    )
  }



  login() {
    this.router.navigate(["/login"])
  }
  offers() {
    this.router.navigate(["/all_offers"])
  }

  register() {
    this.router.navigate(["/registration"])
  }

  seeMyOffers(){
    this.router.navigate(["/myoffers"])
  }
  postOffer(){
    this.router.navigate(["/new_offer"])
  }

  home(){
    this.router.navigate([""])
  }

}
