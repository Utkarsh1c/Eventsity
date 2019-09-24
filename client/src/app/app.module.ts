import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { DiscoverDetailsComponent } from './discover-details/discover-details.component';
import { FooterComponent } from './footer/footer.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ServerService } from './services/server.service';
import { DiscoverService } from './discover/discover.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { ConfrimPasswordDirective } from './shared/confirm-password.directive';
import { VerificationComponent } from './verification/verification.component';
import { MyeventsComponent } from './myevents/myevents.component';
// import { HttpinterceptorService } from './interceptor/httpinterceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DiscoverComponent,
    DiscoverDetailsComponent,
    FooterComponent,
    CreateComponent,
    LoginComponent,
    SignupComponent,
    AboutusComponent,
    ContactusComponent,
    DropdownDirective,
    ConfrimPasswordDirective,
    VerificationComponent,
    MyeventsComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [ServerService, DiscoverService, AuthService, AuthGuard,
  // {
  //   provide : HTTP_INTERCEPTORS,
  //   useClass : HttpinterceptorService,
  //   multi : true
  // }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
