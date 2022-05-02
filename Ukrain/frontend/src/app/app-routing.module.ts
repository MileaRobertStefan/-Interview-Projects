import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OffersComponent } from './offers/offers.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "",
    component:  HomeComponent
  },
  {
    path: "login",
    component:  LoginComponent
  },
  {
    path: "registration",
    component:  RegisterComponent
  },
  {
    path:"view-offers",
    component:OffersComponent
  },
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