import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { DiscoverHomeComponent } from './discover/discover-home/discover-home.component';
import { DiscoverDetailsComponent } from './discover/discover-details/discover-details.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
// import { DisplayDiscoverDetailsComponent } from './discover/display-discover-details/display-discover-details.component';
import { EntertainmentListComponent } from './discover/entertainment-list/entertainment-list.component';
import { SocialListComponent } from './discover/social-list/social-list.component';
import { SportsListComponent } from './discover/sports-list/sports-list.component';
import { TechnologyListComponent } from './discover/technology-list/technology-list.component';



const routes: Routes = [
   { path:'', component: HomeComponent },
   { path:'discover', component: DiscoverComponent, children: [
     { path:'', component : DiscoverHomeComponent },
     { path:'entertainment', component : EntertainmentListComponent },
     { path:'social', component : SocialListComponent },
     { path:'sports', component : SportsListComponent },
     { path:'technology', component : TechnologyListComponent },
     { path:':id', component: DiscoverDetailsComponent }
   ] },
  //  { path:':id', component: DisplayDiscoverDetailsComponent },
   { path:'create', component: CreateComponent },
   { path:'login', component: LoginComponent },
   { path:'signup', component: SignupComponent },
   { path:'aboutus', component: AboutusComponent },
   { path:'contactus', component: ContactusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
