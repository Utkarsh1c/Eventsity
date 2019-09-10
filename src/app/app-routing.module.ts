import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { DiscoverHomeComponent } from './discover/discover-home/discover-home.component';
import { DiscoverDetailsComponent } from './discover/discover-details/discover-details.component';
import { CreateComponent } from './create/create.component';


const routes: Routes = [
   { path:'', component: HomeComponent },
   { path:'discover', component: DiscoverComponent, children: [
     { path:'', component : DiscoverHomeComponent },
     { path:':id', component: DiscoverDetailsComponent }
   ] },
   { path:'create', component: CreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
