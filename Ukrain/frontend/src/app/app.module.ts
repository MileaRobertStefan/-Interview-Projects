import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {LayoutModule} from '@angular/cdk/layout'
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {  MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthentInterceptor } from './services/auth.interceptor';
import {MatCardModule} from '@angular/material/card';
import { CreateOfferComponent } from './offer/create-offer/create-offer.component';
import { CRUDMSG, RefugeMSG, ViewSingleOfferComponent } from './offer/view-single-offer/view-single-offer.component';
import { ViewAllOffersComponent } from './offer/view-all-offers/view-all-offers.component';
import { ViewAllMyOffersComponent } from './offer/view-all-my-offers/view-all-my-offers.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    CreateOfferComponent,
    ViewSingleOfferComponent,
    ViewAllOffersComponent,
    ViewAllMyOffersComponent,
    RefugeMSG,
    CRUDMSG
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
    MatInputModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthentInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


