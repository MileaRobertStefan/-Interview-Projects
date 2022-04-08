import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OffersComponent } from './offers/offers.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: "",
    component:  HomeComponent
  },
  {
    path:"view-offers",
    component:OffersComponent
  },
  {
    path:"view-users",
    component:UsersComponent
  }
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