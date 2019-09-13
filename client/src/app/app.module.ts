import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DiscoverComponent } from './discover/discover.component';
import { DiscoverListComponent } from './discover/discover-list/discover-list.component';
import { DiscoverEventsComponent } from './discover/discover-list/discover-events/discover-events.component';
import { DiscoverDetailsComponent } from './discover/discover-details/discover-details.component';
import { DiscoverHomeComponent } from './discover/discover-home/discover-home.component';
import { FooterComponent } from './footer/footer.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DisplayDiscoverDetailsComponent } from './discover/display-discover-details/display-discover-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DiscoverComponent,
    DiscoverListComponent,
    DiscoverEventsComponent,
    DiscoverDetailsComponent,
    DiscoverHomeComponent,
    FooterComponent,
    CreateComponent,
    LoginComponent,
    SignupComponent,
    AboutusComponent,
    ContactusComponent,
    DisplayDiscoverDetailsComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
