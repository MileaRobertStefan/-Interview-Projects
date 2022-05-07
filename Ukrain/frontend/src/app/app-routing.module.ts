import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ViewAllMyOffersComponent } from './offer/view-all-my-offers/view-all-my-offers.component';
import { ViewAllOffersComponent } from './offer/view-all-offers/view-all-offers.component';

import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registration",
    component: RegisterComponent
  },
  {
    path: "all_offers",
    component: ViewAllOffersComponent
  },
  {
    path: "myoffers",
    component: ViewAllMyOffersComponent
  }
  ,
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// const routes: Routes = [
//   {
//     path: '',
//     component: HomePageComponent
//   },
//   {
//     path: 'create-task',
//     component: CreateTaskComponent
//   },
//   {
//     path: 'view-task',
//     component: ViewSingleTaskComponent
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }