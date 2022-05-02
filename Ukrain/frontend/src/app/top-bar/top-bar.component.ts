import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../types/types';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  public lastName: string = "";
  public firstName: string = "";

  constructor(private readonly router: Router,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.userObservable().subscribe(
      (user: User) => {
        this.lastName = user.lastName;
        this.firstName = user.firstName;
      }
    )
  }


  login() {
    this.router.navigate(["/login"])
  }
  offers() {
    this.router.navigate(["/view-offers"])
  }
}
