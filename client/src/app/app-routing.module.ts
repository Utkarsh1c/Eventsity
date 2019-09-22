import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { DiscoverHomeComponent } from './discover/discover-home/discover-home.component';

import { CreateComponent } from './create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DiscoverDetailsComponent } from './discover-details/discover-details.component';
import { AuthGuard } from './guard/auth.guard';
import { VerificationComponent } from './verification/verification.component';
import { ResendotpComponent } from './resendotp/resendotp.component';





const routes: Routes = [
   { path:'', component: HomeComponent },
   { path:'discover', component: DiscoverComponent, children: [
    //  { path:'', component : DiscoverHomeComponent },
    //  { path:':id', component: DiscoverDetailsComponent }
   ] },
   { path:'discover/:id', component: DiscoverDetailsComponent },
   { path:'create', component: CreateComponent, 
  //  canActivate: [AuthGuard] 
  },
   { path:'login', component: LoginComponent },
   { path:'signup', component: SignupComponent },
   { path:'verify/:id', component:VerificationComponent },
   { path:'resendotp', component:ResendotpComponent },
   { path:'aboutus', component: AboutusComponent },
   { path:'contactus', component: ContactusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
