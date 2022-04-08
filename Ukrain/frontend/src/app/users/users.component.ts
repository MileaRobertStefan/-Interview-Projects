import { Component, OnInit } from '@angular/core';
import { User } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { SnackService } from '../services/snack.service';
import { UserStateService } from '../services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public displayedColumns: string[] = ['first_name', 'last_name',"email","telephone"];
  public dataSource:User[] = [];

  constructor(
    private readonly snackService: SnackService,
    private http: HttpClient,
    private readonly tx: UserStateService
  ) { }

  ngOnInit(): void {
     
    this.tx.dataObservable.subscribe( data => this.dataSource = data)

  }

}
