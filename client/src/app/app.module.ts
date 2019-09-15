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
import { EntertainmentService } from './services/entertainment.service';
import { SocialService } from './services/social.service';
import { TechnologyService } from './services/technology.service';
import { SportsService } from './services/sports.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { EntertainmentListComponent } from './discover/entertainment-list/entertainment-list.component';
import { EntertainmentEventsComponent } from './discover/entertainment-list/entertainment-events/entertainment-events.component';
import { SocialListComponent } from './discover/social-list/social-list.component';
import { SocialEventsComponent } from './discover/social-list/social-events/social-events.component';
import { SportsListComponent } from './discover/sports-list/sports-list.component';
import { SportsEventsComponent } from './discover/sports-list/sports-events/sports-events.component';
import { TechnologyListComponent } from './discover/technology-list/technology-list.component';
import { TechnologyEventsComponent } from './discover/technology-list/technology-events/technology-events.component';

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
    DropdownDirective,
    EntertainmentListComponent,
    EntertainmentEventsComponent,
    SocialListComponent,
    SocialEventsComponent,
    SportsListComponent,
    SportsEventsComponent,
    TechnologyListComponent,
    TechnologyEventsComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    EntertainmentService,
    SocialService,
    TechnologyService,
    SportsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
