import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OffersComponent } from './offers/offers.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from '@angular/cdk/layout'
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { OfferCreateComponent } from './offers/offer-create/offer-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {  MatInputModule } from '@angular/material/input';
import { UserCreateComponent } from './users/user-create/user-create.component';

@NgModule({
  declarations: [
    AppComponent,
    OffersComponent,
    UsersComponent,
    HomeComponent,
    TopBarComponent,
    OfferCreateComponent,
    UserCreateComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    FlexLayoutModule,
    MatTableModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
